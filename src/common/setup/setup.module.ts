import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { RequestModule } from './request/request.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    RequestModule,
    DatabaseModule,
  ],
})
export class SetupModule {}
