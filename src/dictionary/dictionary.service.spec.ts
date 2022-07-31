import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryService } from './dictionary.service';
import { SetupModule } from '../__common/setup/setup.module';
import { Dictionary } from './dictionary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { CreateDictionaryRequest } from './request/create-dictionary.request';
import { Language } from '../translations/translation.enum';
import { STATUS } from '../__common/enums/status.enum';

describe('DictionaryService', () => {
  let service: DictionaryService;
  let connection: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SetupModule, TypeOrmModule.forFeature([Dictionary])],
      providers: [DictionaryService],
    }).compile();

    service = module.get<DictionaryService>(DictionaryService);
    connection = module.get<DataSource>(DataSource);
  });

  afterEach(() => connection.destroy());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneBy', () => {
    it('should return a record with the strict properties', async () => {
      const dictionaryRepository = connection.getRepository(Dictionary);
      const payload: CreateDictionaryRequest = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
      };
      const dictionary = await dictionaryRepository.save(payload);
      await service.markAsActive(dictionary.uuid);

      const result = await service.findOneBy(dictionary.uuid);
      expect(result).not.toEqual(dictionary);
      expect(result).toEqual({
        uuid: dictionary.uuid,
        value: dictionary.value,
        description: dictionary.description,
        language: dictionary.language,
      });
    });

    it('should return empty/null value when not matching any records', async () => {
      const uuid = uuidV4();
      const result = await service.findOneBy(uuid);
      expect(result).toBeNull();
    });

    it('should return empty/null value when the state is not ACTIVE', async () => {
      const dictionaryRepository = connection.getRepository(Dictionary);
      const payload: CreateDictionaryRequest = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
      };
      const dictionary = await dictionaryRepository.save(payload);
      const result = await service.findOneBy(dictionary.uuid);
      expect(result).toBeNull();
    });
  });

  describe('searchByKeyword', () => {
    it('should return a list of matching records (case-insensitive)', async () => {
      const dictionaryRepository = connection.getRepository(Dictionary);
      const payload01: CreateDictionaryRequest = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
      };
      const payload02: CreateDictionaryRequest = {
        value: 'Goodbye',
        description: 'Used to express good wishes when parting or at the end of a conversation.',
        language: Language.EN,
        source: 'Individual contributor',
      };
      const response01 = await dictionaryRepository.save(payload01);
      const response02 = await dictionaryRepository.save(payload02);

      await service.markAsActive(response01.uuid);
      await service.markAsActive(response02.uuid);

      const search01 = await service.searchByKeyword('h', Language.EN);
      const search02 = await service.searchByKeyword('H', Language.EN);
      const search03 = await service.searchByKeyword('hel', Language.EN);
      const search04 = await service.searchByKeyword('Hell', Language.EN);
      const search05 = await service.searchByKeyword('GoodBye', Language.EN);

      expect(search01).toHaveLength(1);
      expect(search02).toHaveLength(1);
      expect(search03).toHaveLength(1);
      expect(search04).toHaveLength(1);
      expect(search05).toHaveLength(1);

      expect(search01).toEqual([
        {
          uuid: response01.uuid,
          value: response01.value,
          description: response01.description,
          language: response01.language,
        },
      ]);
      expect(search02).toEqual([
        {
          uuid: response01.uuid,
          value: response01.value,
          description: response01.description,
          language: response01.language,
        },
      ]);
      expect(search05).toEqual([
        {
          uuid: response02.uuid,
          value: response02.value,
          description: response02.description,
          language: response02.language,
        },
      ]);
    });
    it('should return an empty list when no matching any records', async () => {
      const search03 = await service.searchByKeyword('Goodbye, Morty', Language.EN);
      expect(search03).toHaveLength(0);
      expect(search03).toEqual([]);
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
      const result = await service.create(payload);
      expect(result).toEqual(
        expect.objectContaining({
          uuid: result.uuid,
          value: result.value,
          description: result.description,
          language: result.language,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      );
    });
  });

  describe('update', () => {
    it('should verify an updated record', async () => {
      const create: CreateDictionaryRequest = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
      };
      const save = await service.create(create);
      await service.markAsActive(save.uuid);
      const update = await service.update(save.uuid, {
        value: 'Goodbye',
      });
      const result = await service.findOneBy(save.uuid);

      expect(update.affected).toBe(1);
      expect(result.value).toBe('Goodbye');
    });
  });

  describe('markAsDeleted', () => {
    it('should verify a deleted record', async () => {
      const create: CreateDictionaryRequest = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
      };
      const save = await service.create(create);
      await service.markAsActive(save.uuid);
      const search01 = await service.findOneBy(save.uuid);
      expect(search01).not.toBeNull();

      const deleteResult = await service.markAsDeleted(save.uuid);
      expect(deleteResult.affected).toBe(1);

      const search02 = await service.findOneBy(save.uuid);
      expect(search02).toBeNull();

      const dictionaryRepository = connection.getRepository(Dictionary);
      const search03 = await dictionaryRepository.findOne({ where: { uuid: save.uuid } });
      expect(search03).toEqual(
        expect.objectContaining({
          status: STATUS.DELETED,
        }),
      );
    });
  });
});
