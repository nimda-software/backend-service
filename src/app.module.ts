import { Module } from '@nestjs/common';
import { SetupModule } from './common/setup/setup.module';
import { HealthModule } from './health/health.module';
import { TranslationModule } from './translations/translation.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [SetupModule, HealthModule, TranslationModule, DictionaryModule],
})
export class AppModule {}
