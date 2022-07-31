import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryService } from './dictionary.service';
import { SetupModule } from '../__common/setup/setup.module';
import { Dictionary } from './dictionary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('DictionaryService', () => {
  let service: DictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SetupModule, TypeOrmModule.forFeature([Dictionary])],
      providers: [DictionaryService],
    }).compile();

    service = module.get<DictionaryService>(DictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneBy', () => {
    it.todo('should return a record with the strict properties');
    it.todo('should return empty/null value when not matching any records');
  });

  describe('searchByKeyword', () => {
    it.todo('should return a list of matching records (case-insensitive)');
    it.todo('should return an empty list when no matching any records');
  });

  describe('create', () => {
    it.todo('should return a created record');
  });

  describe('update', () => {
    it.todo('should verify an updated record');
  });

  describe('delete', () => {
    it.todo('should verify a deleted record');
  });
});
