import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory
{
  constructor(private readonly envService: ConfigService)
  {}

  createTypeOrmOptions(): TypeOrmModuleOptions
  {
    const host = this.envService.get('DB_HOST');
    const port = this.envService.get('DB_PORT');
    const username = this.envService.get('DB_USERNAME');
    const password = this.envService.get('DB_PASSWORD');
    const database = this.envService.get('DB_NAME');
    //const nodeEnv = this.envService.get('NODE_ENV');
    //const synchronize = nodeEnv === 'development';

    return {
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      autoLoadEntities: true,
      synchronize: true, // Solo en desarrollo
    };
  }
}
