import {
  Injectable,
  NotFoundException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../domain/entities/user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    try {
      const { password, ...userData } = createUserDto;

      const existingUser = await this.userRepository.findOne({
        where: [{ email: userData.email }, { cedula: userData.cedula }],
      });

      if (existingUser) {
        throw new Error('Usuario ya existe con ese email o cédula');
      }

      const newUser: Partial<UserEntity> = {
        ...userData,
        password,
        status: 'active',
      };

      const user = this.userRepository.create(newUser);
      const savedUser = await this.userRepository.save(user);

      return this.mapToResponseDto(savedUser);
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }

  async findOne(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['credits', 'credits.institution'],
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      return this.mapToResponseDto(user);
    } catch (error) {
      this.logger.error(`Error finding user: ${error.message}`);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    try {
      return await this.userRepository.findOne({
        where: { email },
        select: [
          'id',
          'email',
          'password',
          'nombres',
          'apellidos',
          'status',
          'lastSuccessfulLogin',
          'failedLoginAttempts',
          'isLocked',
          'lockExpirationDate',
        ],
      });
    } catch (error) {
      this.logger.error(`Error finding user by email: ${error.message}`);
      throw error;
    }
  }

  async findByCedula(cedula: string): Promise<UserEntity | undefined> {
    try {
      return await this.userRepository.findOne({
        where: { cedula },
        select: ['id', 'email', 'nombres', 'apellidos', 'status'],
      });
    } catch (error) {
      this.logger.error(`Error finding user by cedula: ${error.message}`);
      throw error;
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { id },
        relations: ['credits', 'credits.institution'],
      });

      if (!existingUser) {
        throw new NotFoundException('Usuario no encontrado');
      }

      const updateData: Partial<UserEntity> = {
        ...existingUser,
        ...(updateUserDto.nombres && { nombres: updateUserDto.nombres }),
        ...(updateUserDto.apellidos && { apellidos: updateUserDto.apellidos }),
        ...(updateUserDto.telefono && { telefono: updateUserDto.telefono }),
        ...(updateUserDto.direccion && { direccion: updateUserDto.direccion }),
      };

      const updatedUser = await this.userRepository.save(updateData);
      return this.mapToResponseDto(updatedUser);
    } catch (error) {
      this.logger.error(`Error updating user: ${error.message}`);
      throw error;
    }
  }

  async updateLoginStats(userId: string, successful: boolean): Promise<void> {
    if (successful) {
      await this.userRepository.update(userId, {
        lastSuccessfulLogin: new Date(),
        failedLoginAttempts: 0,
      });
    } else {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (user) {
        await this.userRepository.update(userId, {
          failedLoginAttempts: (user.failedLoginAttempts || 0) + 1,
        });
      }
    }
  }

  async getSearchHistory(userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        select: ['searchHistory'],
      });

      return user?.searchHistory || [];
    } catch (error) {
      this.logger.error(`Error getting search history: ${error.message}`);
      throw error;
    }
  }

  async updateLockStatus(
    userId: string,
    isLocked: boolean,
    expirationDate?: Date,
  ): Promise<void> {
    await this.userRepository.update(userId, {
      isLocked,
      lockExpirationDate: expirationDate || null,
    });
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      await this.userRepository.remove(user);
    } catch (error) {
      this.logger.error(`Error removing user: ${error.message}`);
      throw error;
    }
  }

  async validateUserStatus(
    userId: string,
  ): Promise<{ isValid: boolean; error?: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return { isValid: false, error: 'Usuario no encontrado' };
    }

    if (user.status !== 'active') {
      return { isValid: false, error: 'Usuario inactivo' };
    }

    if (user.isLocked) {
      if (user.lockExpirationDate && user.lockExpirationDate > new Date()) {
        return { isValid: false, error: 'Usuario bloqueado temporalmente' };
      }
      // Si la fecha de expiración pasó, desbloqueamos automáticamente
      await this.updateLockStatus(user.id, false);
    }

    return { isValid: true };
  }

  async verifyUserCredentials(
    email: string,
  ): Promise<{ user: UserEntity; error?: string }> {
    const user = await this.findByEmail(email);

    if (!user) {
      return { user: null, error: 'Usuario no registrado' };
    }

    const statusValidation = await this.validateUserStatus(user.id);
    if (!statusValidation.isValid) {
      return { user: null, error: statusValidation.error };
    }

    return { user };
  }

  private mapToResponseDto(user: UserEntity): UserResponseDto {
    const { password, ...userWithoutPassword } = user;

    const calculatePayments = (amount: number, rate: number, term: number) => {
      try {
        const monthlyRate = rate / 12 / 100;
        const monthlyPayment =
          (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
          (Math.pow(1 + monthlyRate, term) - 1);
        const totalPayment = monthlyPayment * term;
        return {
          monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
          totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
        };
      } catch (error) {
        this.logger.error('Error calculando pagos:', error);
        return { monthlyPayment: 0, totalPayment: 0 };
      }
    };

    const responseDto: UserResponseDto = {
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      cedula: user.cedula,
      email: user.email,
      telefono: user.telefono,
      direccion: user.direccion,
      createdAt: user.createdAt,
      lastSuccessfulLogin: user.lastSuccessfulLogin,
      status: user.status,
      credits: user.credits?.map((credit) => {
        const { monthlyPayment, totalPayment } = calculatePayments(
          credit.amount,
          credit.institution?.minRate || 0,
          credit.term,
        );

        return {
          id: credit.id,
          amount: credit.amount,
          term: credit.term,
          income: credit.income,
          status: credit.status,
          createdAt: credit.createdAt,
          monthlyPayment,
          totalPayment,
          institution: credit.institution
            ? {
                id: credit.institution.id,
                name: credit.institution.name,
                type: credit.institution.type,
                logo: credit.institution.logo,
                minRate: credit.institution.minRate,
              }
            : null,
        };
      }),
    };

    return responseDto;
  }
}
