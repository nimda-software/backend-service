import { Module } from '@nestjs/common';
import { SetupModule } from './__common/setup/setup.module';
import { HealthModule } from './health/health.module';
import { TranslationModule } from './translations/translation.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [SetupModule, HealthModule, TranslationModule, DictionaryModule, ActivityModule],
})
export class AppModule {}
