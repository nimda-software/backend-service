import { Module } from '@nestjs/common';
import { SetupModule } from './common/setup/setup.module';
import { HealthModule } from './health/health.module';
import { TranslateModule } from './translations/translate.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [SetupModule, HealthModule, TranslateModule, DictionaryModule],
})
export class AppModule {}
