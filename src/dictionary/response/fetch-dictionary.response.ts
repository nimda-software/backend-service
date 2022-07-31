import { Dictionary } from '../dictionary.entity';
import { CreateDictionaryResponse } from './create-dictionary.response';

export class FetchDictionaryResponse extends CreateDictionaryResponse {
  constructor(partial: Partial<Dictionary>) {
    super(partial);
    Object.assign(this, partial);
  }

  static from(partial: Partial<Dictionary>): FetchDictionaryResponse;
  static from(partial: Partial<Dictionary>[]): FetchDictionaryResponse[];
  static from(payload: unknown): unknown {
    if (!Array.isArray(payload)) return new FetchDictionaryResponse(payload);

    return payload.map(FetchDictionaryResponse.from);
  }
}
