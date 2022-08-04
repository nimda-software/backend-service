import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { ActivityModule } from '../activity/activity.module';
import { DictionaryModule } from '../dictionary/dictionary.module';

@Module({
  imports: [ActivityModule, DictionaryModule],
  controllers: [SearchController],
})
export class SearchModule {}
