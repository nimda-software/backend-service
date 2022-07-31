import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { SetupModule } from '../__common/setup/setup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './dictionary.entity';
import { DataSource } from 'typeorm';
import { ActivityModule } from '../activity/activity.module';

describe('DictionaryController', () => {
  let controller: DictionaryController;
  let connection: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SetupModule, ActivityModule, TypeOrmModule.forFeature([Dictionary])],
      controllers: [DictionaryController],
      providers: [DictionaryService],
    }).compile();

    controller = module.get<DictionaryController>(DictionaryController);
    connection = module.get<DataSource>(DataSource);
  });

  afterEach(() => connection.destroy());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOneByUUID', () => {
    it.todo('should return a dictionary');
    it.todo('should throw Not Found error');
  });

  describe('searchByKeyword', () => {
    it.todo('should return a list of matching records');
    it.todo('should return an empty list when no matching any records');
  });

  describe('create', () => {
    it.todo('should return a created record');
    it.todo('should verify Activity record(CREATED)');
  });

  describe('update', () => {
    it.todo('should verify updated record');
    it.todo('should throw Not Found error');
    it.todo('should verify Activity record(UPDATED)');
  });

  describe('delete', () => {
    it.todo('should verify deleted record');
    it.todo('should throw Not Found error');
    it.todo('should verify Activity record(DELETED)');
  });
});
