import { Test, TestingModule } from '@nestjs/testing';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';
import { SetupModule } from '../__common/setup/setup.module';
import { Translation } from './translation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from '../dictionary/dictionary.entity';
import { ActivityModule } from '../activity/activity.module';
import { DictionaryModule } from '../dictionary/dictionary.module';

describe('TranslateController', () => {
  let controller: TranslationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SetupModule, ActivityModule, DictionaryModule, TypeOrmModule.forFeature([Translation, Dictionary])],
      controllers: [TranslationController],
      providers: [TranslationService],
    }).compile();

    controller = module.get<TranslationController>(TranslationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
