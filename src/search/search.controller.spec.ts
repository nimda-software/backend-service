import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SetupModule } from '../__common/setup/setup.module';
import { DictionaryModule } from '../dictionary/dictionary.module';
import { DataSource } from 'typeorm';
import { Dictionary } from '../dictionary/dictionary.entity';
import { CreateDictionaryRequest } from '../dictionary/request/create-dictionary.request';
import { Language } from '../translations/translation.enum';
import { SearchDictionaryRequestParam } from './request/search-dictionary.request';
import { CreateTranslationRequest } from '../translations/request/create-translation.request';
import { Translation } from '../translations/translation.entity';
import { STATUS } from '../__common/enums/status.enum';

describe('SearchController', () => {
  let controller: SearchController;
  let connection: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SetupModule, DictionaryModule],
      controllers: [SearchController],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    connection = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchByKeyword', () => {
    beforeEach(async () => {
      // Insert some data into the database
      const dictionaryRepository = connection.getRepository(Dictionary);
      const translationRepository = connection.getRepository(Translation);
      const createWordsPayload: (CreateDictionaryRequest & { status: STATUS })[] = [
        {
          value: 'Goodbye',
          description: 'Used to express good wishes when parting or at the end of a conversation.',
          language: Language.EN,
          source: 'Individual contribution',
          status: STATUS.ACTIVE,
        },
        {
          value: 'Hello',
          description: 'An expression or gesture of greeting',
          language: Language.EN,
          source: 'Individual contribution',
          status: STATUS.ACTIVE,
        },
        {
          value: 'Dude',
          language: Language.EN,
          status: STATUS.ACTIVE,
        },
      ];
      const [goodbye, hello, dude] = dictionaryRepository.create(createWordsPayload);
      await dictionaryRepository.save([goodbye, hello, dude]);
      // Insert translations for the above dictionaries
      const createTranslationsPayload: (CreateTranslationRequest & { status: STATUS })[] = [
        {
          value: 'ნახვამდის',
          language: Language.KA,
          status: STATUS.ACTIVE,
        },
        {
          value: 'გამარჯობა',
          language: Language.KA,
          status: STATUS.ACTIVE,
        },
      ];
      const [goodbyeTranslation, helloTranslation] = translationRepository.create(createTranslationsPayload);
      goodbyeTranslation.dictionary = goodbye;
      helloTranslation.dictionary = hello;
      // Intentionally not saving "Dude" translation
      // There are 3 records wor Dictionary but only 2 translations
      await translationRepository.save([goodbyeTranslation, helloTranslation]);
    });

    it('should return an array of dictionaries with translations', async () => {
      const param: SearchDictionaryRequestParam = {
        keyword: 'hel',
        language: Language.EN,
      };
      const result = await controller.searchByKeyword(param);
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
    });

    it('should return an empty list', async () => {
      const param: SearchDictionaryRequestParam = {
        keyword: 'No match',
        language: Language.EN,
      };
      const result = await controller.searchByKeyword(param);
      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });

    it('should return an empty list when there is a match but no translation', async () => {
      const param: SearchDictionaryRequestParam = {
        keyword: 'Dude',
        language: Language.EN,
      };
      const result = await controller.searchByKeyword(param);
      expect(result).toBeDefined();
      expect(result).toHaveLength(0);
    });
  });
});
