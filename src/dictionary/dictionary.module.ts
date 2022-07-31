import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './dictionary.entity';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [ActivityModule, TypeOrmModule.forFeature([Dictionary])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
})
export class DictionaryModule {}
