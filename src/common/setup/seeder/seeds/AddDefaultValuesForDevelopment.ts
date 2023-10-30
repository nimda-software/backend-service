import { InjectRepository } from '@nestjs/typeorm';
import { Seed } from '../entity/seeder.entity';
import { Repository } from 'typeorm';
import { Env } from '/common/env';
import { Dictionary } from '/src/dictionary/dictionary.entity';
import { Translation } from '/src/translations/translation.entity';
import { Language } from '/src/translations/translation.enum';
import { STATUS } from '/common/enums/status.enum';
import { Injectable } from '@nestjs/common';
import { Seeds } from '/common/setup/seeder/abstract/BaseSeed';

@Injectable()
export class AddDefaultValuesForDevelopment extends Seeds {
  constructor(
    @InjectRepository(Seed) protected readonly seedRepository: Repository<Seed>,
    @InjectRepository(Dictionary) protected readonly dictionaryRepository: Repository<Dictionary>,
    @InjectRepository(Translation) protected readonly translationRepository: Repository<Translation>,
  ) {
    super(seedRepository);
  }

  get name() {
    return 'Add default values for development';
  }

  async run() {
    // Only in Development environment
    if (!Env.isDev) return void 0;

    await this.insertValues();
  }

  private async insertValues() {
    const payload: Partial<Dictionary> = {
      value: 'Hello',
      description: 'An expression or gesture of greeting',
      language: Language.EN,
      source: 'Individual contributor',
      status: STATUS.ACTIVE,
    };
    const savedDictionary = await this.dictionaryRepository.save(payload);
    const payloadTranslation: Partial<Translation> = {
      value: 'გომორძგუა',
      language: Language.ME,
      status: STATUS.ACTIVE,
    };
    payloadTranslation.dictionary = savedDictionary;

    await this.translationRepository.save(payloadTranslation);
  }
}
