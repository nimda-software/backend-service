import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryService } from './dictionary.service';
import { SetupModule } from '/common/setup/setup.module';
import { Dictionary } from './dictionary.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { CreateDictionaryRequest } from './request/create-dictionary.request';
import { Language } from '../translations/translation.enum';
import { STATUS } from '/common/enums/status.enum';
import { Translation } from '../translations/translation.entity';

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
      const payload: CreateDictionaryRequest & { status: STATUS } = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
        status: STATUS.ACTIVE, // Status should be active to appear in search results
      };
      const dictionary = await dictionaryRepository.save(payload);
      await service.markAsActive(dictionary.uuid);

      const result = await service.findOneBy(dictionary.uuid);
      expect(result).not.toEqual(dictionary);
      expect(result).toEqual(
        expect.objectContaining({
          uuid: dictionary.uuid,
          value: dictionary.value,
          description: dictionary.description,
          language: dictionary.language,
        }),
      );
    });

    it('should return empty/null value when not matching any records', async () => {
      const uuid = uuidV4();
      const result = await service.findOneBy(uuid);
      expect(result).toBeNull();
    });

    it('should return empty/null value when the status is not ACTIVE', async () => {
      const dictionaryRepository = connection.getRepository(Dictionary);
      const payload: CreateDictionaryRequest & { status: STATUS } = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
        status: STATUS.PENDING,
      };
      const dictionary = await dictionaryRepository.save(payload);
      const result = await service.findOneBy(dictionary.uuid);
      expect(result).toBeNull();
    });
  });

  describe('searchByKeyword', () => {
    it('should return a list of matching records (case-insensitive) with translations', async () => {
      const dictionaryRepository = connection.getRepository(Dictionary);
      const translationRepository = connection.getRepository(Translation);
      const payload01: CreateDictionaryRequest & { status: STATUS } = {
        value: 'Hello',
        description: 'An expression or gesture of greeting',
        language: Language.EN,
        source: 'Individual contributor',
        status: STATUS.ACTIVE,
      };
      const payload02: CreateDictionaryRequest & { status: STATUS } = {
        value: 'Goodbye',
        description: 'Used to express good wishes when parting or at the end of a conversation.',
        language: Language.EN,
        source: 'Individual contributor',
        status: STATUS.ACTIVE,
      };
      const dictionary01 = await dictionaryRepository.save(payload01);
      const dictionary02 = await dictionaryRepository.save(payload02);

      const translation01 = translationRepository.create({
        value: 'გამარჯობა',
        status: STATUS.ACTIVE,
        language: Language.KA,
      });
      translation01.dictionary = dictionary01;
      await translationRepository.save(translation01);

      const translation02 = await translationRepository.create({
        value: 'ნახვამდისა',
        status: STATUS.ACTIVE,
        language: Language.KA,
      });
      translation02.dictionary = dictionary02;
      await translationRepository.save(translation02);

      await service.markAsActive(dictionary01.uuid);
      await service.markAsActive(dictionary02.uuid);

      const search01 = await service.searchByKeyword('h', Language.EN, 50, 0);
      const search02 = await service.searchByKeyword('H', Language.EN, 50, 0);
      const search03 = await service.searchByKeyword('hel', Language.EN, 50, 0);
      const search04 = await service.searchByKeyword('Hell', Language.EN, 50, 0);
      const search05 = await service.searchByKeyword('GoodBye', Language.EN, 50, 0);

      expect(search01).toHaveLength(1);
      expect(search02).toHaveLength(1);
      expect(search03).toHaveLength(1);
      expect(search04).toHaveLength(1);
      expect(search05).toHaveLength(1);

      expect(search01).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            uuid: dictionary01.uuid,
            value: dictionary01.value,
            description: dictionary01.description,
            language: dictionary01.language,
            translations: expect.arrayContaining([expect.any(Translation)]),
          }),
        ]),
      );
      expect(search02).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            uuid: dictionary01.uuid,
            value: dictionary01.value,
            description: dictionary01.description,
            language: dictionary01.language,
            translations: expect.arrayContaining([expect.any(Translation)]),
          }),
        ]),
      );
      expect(search05).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            uuid: dictionary02.uuid,
            value: dictionary02.value,
            description: dictionary02.description,
            language: dictionary02.language,
            translations: expect.arrayContaining([expect.any(Translation)]),
          }),
        ]),
      );
    });
    it('should return an empty list when no matching any records', async () => {
      const search03 = await service.searchByKeyword('Goodbye, Morty', Language.EN, 5, 0);
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
