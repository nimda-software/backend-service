import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';
import { ActivityModule } from '../activity/activity.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translation } from './translation.entity';
import { DictionaryModule } from '../dictionary/dictionary.module';

@Module({
  imports: [ActivityModule, DictionaryModule, TypeOrmModule.forFeature([Translation])],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class TranslationModule {}
