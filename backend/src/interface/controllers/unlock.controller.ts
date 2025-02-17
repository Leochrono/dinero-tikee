import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Ip,
  Headers,
} from '@nestjs/common';
import { UnlockService } from 'src/application/unlock/services/unlock.service';
import {
  RequestUnlockDto,
  ValidateUnlockCodeDto,
  GenerateUnlockCodeDto,
} from 'src/application/unlock/dto/unlock.dto';

@Controller('unlock')
export class UnlockController {
  constructor(private readonly unlockService: UnlockService) {}

  @Post('request')
  @HttpCode(HttpStatus.OK)
  async requestUnlock(
    @Body() requestDto: RequestUnlockDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.unlockService.generateAndSendUnlockCode(
      requestDto.email,
      'Lock temporal por seguridad',
      ipAddress,
      userAgent,
    );
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validateUnlockCode(
    @Body() validateDto: ValidateUnlockCodeDto,
    @Ip() ipAddress: string,
    @Headers('user-agent') userAgent: string,
  ) {
    return this.unlockService.validateUnlockCode(
      validateDto.email,
      validateDto.unlockCode,
      ipAddress,
      userAgent,
    );
  }

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  async generateUnlockCode(@Body() generateDto: GenerateUnlockCodeDto) {
    return this.unlockService.generateAndSendUnlockCode(
      generateDto.userId,
      generateDto.email,
      generateDto.reason,
      generateDto.ipAddress,
      generateDto.userAgent,
    );
  }
}
