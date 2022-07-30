import { Translation } from '../../translations/entities/translation.entity';
import { Dictionary } from '../entities/dictionary.entity';
import { CreateDictionaryResponse } from './create-dictionary.response';

export class FetchDictionaryResponse extends CreateDictionaryResponse {
  constructor(partial: Partial<Dictionary>) {
    super(partial);
    Object.assign(this, partial);
  }
}
