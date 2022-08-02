import { Translation } from '../translation.entity';
import { Dictionary } from '../../dictionary/dictionary.entity';
import { CreateTranslationResponse } from './create-translation.response';

export class FetchTranslationResponse extends CreateTranslationResponse {
  constructor(partial: Partial<Translation>) {
    super(partial);
    Object.assign(this, partial);
  }

  static from(partial: Partial<Dictionary>): FetchTranslationResponse;
  static from(partial: Partial<Dictionary>[]): FetchTranslationResponse[];
  static from(payload: unknown): unknown {
    if (!Array.isArray(payload)) return new FetchTranslationResponse(payload);

    return payload.map(FetchTranslationResponse.from);
  }
}
