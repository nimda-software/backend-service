import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { SetupModule } from '../__common/setup/setup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './dictionary.entity';

describe('DictionaryController', () => {
  let controller: DictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SetupModule, TypeOrmModule.forFeature([Dictionary])],
      controllers: [DictionaryController],
      providers: [DictionaryService],
    }).compile();

    controller = module.get<DictionaryController>(DictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
