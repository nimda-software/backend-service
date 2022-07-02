import { Module } from '@nestjs/common';
import { SetupModule } from './common/setup/setup.module';
import { HealthModule } from './health/health.module';
import { TranslateModule } from './translate/translate.module';

@Module({
  imports: [SetupModule, HealthModule, TranslateModule],
})
export class AppModule {}
