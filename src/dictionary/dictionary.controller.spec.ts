import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';
import { SetupModule } from '../common/setup/setup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dictionary } from './dictionary.entity';
import { DataSource } from 'typeorm';
import { ActivityModule } from '../activity/activity.module';
import { Language } from '../translations/translation.enum';
import { STATUS } from '../common/enums/status.enum';
import { FetchDictionaryRequestParam } from './request/fetch-dictionary.request';
import { FetchDictionaryResponse } from './response/fetch-dictionary.response';
import { CreateDictionaryRequest } from './request/create-dictionary.request';
import { CreateDictionaryResponse } from './response/create-dictionary.response';
import { Activity } from '../activity/activity.entity';
import { UpdateDictionaryRequest, UpdateDictionaryRequestParam } from './request/update-dictionary.request';
import { ActivityAction, ActivityType } from '../activity/activity.enum';
import { DeleteDictionaryRequestParam } from './request/remove-dictionary.request';

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
    it('should return a dictionary record', async () => {
      const payload: Partial<Dictionary> = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
        status: STATUS.ACTIVE,
      };
      const saved = await connection.getRepository(Dictionary).save(payload);
      const param: FetchDictionaryRequestParam = {
        uuid: saved.uuid,
      };
      const result = await controller.findOneByUUID(param);
      expect(result).toBeInstanceOf(FetchDictionaryResponse);
      expect(result).toEqual(
        expect.objectContaining({
          uuid: saved.uuid,
          value: payload.value,
          description: payload.description,
          language: payload.language,
        }),
      );
    });

    it('should throw Not Found error', () => {
      const param: FetchDictionaryRequestParam = {
        uuid: 'invalid-uuid',
      };
      expect(controller.findOneByUUID(param)).rejects.toThrowError('No record found with the given uuid');
    });
  });

  describe('create', () => {
    it('should return a created record', async () => {
      const payload: CreateDictionaryRequest = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
      };
      const result = await controller.create(payload);
      expect(result).not.toBeNull();
      expect(result).toBeInstanceOf(CreateDictionaryResponse);

      const repository = await connection.getRepository(Dictionary);
      const record = await repository.find();
      expect(record).toHaveLength(1);
    });

    it('should verify Activity record(CREATED)', async () => {
      const payload: CreateDictionaryRequest = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
      };
      await controller.create(payload);
      const activityRepository = await connection.getRepository(Activity);
      const activities = await activityRepository.find();
      expect(activities).toHaveLength(1);
      expect(activities).toEqual([
        expect.objectContaining({
          action: ActivityAction.CREATED,
          type: ActivityType.DICTIONARY,
        }),
      ]);
    });
  });

  describe('update', () => {
    it('should verify updated record', async () => {
      const payload: Partial<Dictionary> = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
        status: STATUS.ACTIVE,
      };
      const repository = connection.getRepository(Dictionary);
      const saved = await repository.save(payload);
      const param: UpdateDictionaryRequestParam = {
        uuid: saved.uuid,
      };
      const requestBody: UpdateDictionaryRequest = { value: 'Hi' };
      await controller.update(param, requestBody);

      const result = await repository.findOne({ where: { uuid: saved.uuid } });
      expect(result).toEqual(expect.objectContaining({ value: requestBody.value }));
    });

    it('should throw Not Found error', () => {
      const param: UpdateDictionaryRequestParam = {
        uuid: 'invalid-uuid',
      };
      const requestBody: UpdateDictionaryRequest = { value: 'Hi' };
      expect(controller.update(param, requestBody)).rejects.toThrowError('No record found with the given uuid');
    });

    it('should verify Activity record(UPDATED)', async () => {
      const payload: Partial<Dictionary> = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
        status: STATUS.ACTIVE,
      };
      const repository = connection.getRepository(Dictionary);
      const saved = await repository.save(payload);
      const param: UpdateDictionaryRequestParam = {
        uuid: saved.uuid,
      };
      const requestBody: UpdateDictionaryRequest = { value: 'Hi' };
      await controller.update(param, requestBody);
      const activityRepository = connection.getRepository(Activity);

      const activities = await activityRepository.find();
      expect(activities).toHaveLength(1);
      expect(activities).toEqual([
        expect.objectContaining({
          action: ActivityAction.UPDATED,
          type: ActivityType.DICTIONARY,
        }),
      ]);
    });
  });

  describe('delete', () => {
    it('should verify deleted record', async () => {
      const payload: Partial<Dictionary> = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
        status: STATUS.ACTIVE,
      };
      const repository = connection.getRepository(Dictionary);
      const saved = await repository.save(payload);
      const param: DeleteDictionaryRequestParam = {
        uuid: saved.uuid,
      };
      await controller.delete(param);
      const result = await repository.findOne({ where: { uuid: saved.uuid } });
      expect(result).toEqual(expect.objectContaining({ status: STATUS.DELETED }));
    });

    it('should throw Not Found error', () => {
      const param: DeleteDictionaryRequestParam = {
        uuid: 'invalid-uuid',
      };
      expect(controller.delete(param)).rejects.toThrowError('No record found with the given uuid');
    });

    it('should verify Activity record(DELETED)', async () => {
      const payload: Partial<Dictionary> = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
        status: STATUS.ACTIVE,
      };
      const repository = connection.getRepository(Dictionary);
      const saved = await repository.save(payload);
      const param: DeleteDictionaryRequestParam = {
        uuid: saved.uuid,
      };
      await controller.delete(param);
      const activityRepository = connection.getRepository(Activity);

      const activities = await activityRepository.find();
      expect(activities).toHaveLength(1);
      expect(activities).toEqual([
        expect.objectContaining({
          action: ActivityAction.DELETED,
          type: ActivityType.DICTIONARY,
        }),
      ]);
    });
  });
});
