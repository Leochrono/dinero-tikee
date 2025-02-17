import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InstitutionEntity } from '../../domain/entities/institution.entity';
import { InstitutionService } from './services/institution.service';
import { InstitutionController } from '../../interface/controllers/institution.controller';
import { CreditEntity } from '../../domain/entities/credit.entity';
import { institutionsData } from '../../infrastructure/data/institutions.data';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([InstitutionEntity, CreditEntity]),
  ],
  controllers: [InstitutionController],
  providers: [
    InstitutionService,
    {
      provide: 'INSTITUTIONS_DATA',
      useFactory: (configService: ConfigService) => {
        return {
          data: institutionsData,
          path: './src/infrastructure/data/institutions.data.ts',
          config: {
            enableSeeding: configService.get(
              'ENABLE_INSTITUTION_SEEDING',
              true,
            ),
            seedOnStartup: configService.get(
              'SEED_INSTITUTIONS_ON_STARTUP',
              true,
            ),
          },
        };
      },
      inject: [ConfigService],
    },
    {
      provide: 'INSTITUTION_REPOSITORY_CONFIG',
      useFactory: (configService: ConfigService) => ({
        enableCache: configService.get('ENABLE_INSTITUTION_CACHE', false),
        cacheTTL: configService.get('INSTITUTION_CACHE_TTL', 3600),
        maxCacheItems: configService.get('INSTITUTION_MAX_CACHE_ITEMS', 100),
      }),
      inject: [ConfigService],
    },
  ],
  exports: [InstitutionService, TypeOrmModule.forFeature([InstitutionEntity])],
})
export class InstitutionModule {
  constructor(private configService: ConfigService) {}
  async onModuleInit() {
    const enableSeeding = this.configService.get(
      'ENABLE_INSTITUTION_SEEDING',
      true,
    );
    const seedOnStartup = this.configService.get(
      'SEED_INSTITUTIONS_ON_STARTUP',
      true,
    );
  }
}
