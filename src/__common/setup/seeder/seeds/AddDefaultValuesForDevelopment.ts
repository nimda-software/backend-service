import { BaseSeed } from '../abstract/BaseSeed';
import { RunReturnType, SeedInterface } from '../interface/seed.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Seed } from '../entity/seeder.entity';
import { Repository } from 'typeorm';
import { Env } from '../../../env';
import { Dictionary } from '../../../../dictionary/dictionary.entity';
import { Translation } from '../../../../translations/translation.entity';
import { Language } from '../../../../translations/translation.enum';
import { STATUS } from '../../../enums/status.enum';

export class AddDefaultValuesForDevelopment extends BaseSeed implements SeedInterface {
  constructor(
    @InjectRepository(Seed) protected readonly seedRepository: Repository<Seed>,
    @InjectRepository(Dictionary) protected readonly dictionaryRepository: Repository<Dictionary>,
    @InjectRepository(Translation) protected readonly translationRepository: Repository<Translation>,
  ) {
    super(seedRepository);
  }

  override get name() {
    return 'AddDefaultValuesForDevelopment';
  }

  override async run(): Promise<RunReturnType> {
    // Only in Development environment
    if (!Env.isDev) return { hasRun: false, name: this.name };

    if (await super.hasRun()) return { hasRun: false, name: this.name };
    const message = { hasRun: true, name: this.name, error: `Seeder query failed [${this.name}]` };

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

    const queryResult = await this.translationRepository.save(payloadTranslation);
    // Mark as run when it is done
    await super.markAsRun();

    if (queryResult) delete message.error;

    return message;
  }
}
