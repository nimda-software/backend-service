import { Dictionary } from '../dictionary.entity';
import { CreateDictionaryResponse } from './create-dictionary.response';
import { ApiProperty } from '@nestjs/swagger';
import { TranslationProperty } from '../../translations/response/properties/translation.property';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class FetchDictionaryResponse extends CreateDictionaryResponse {
  @ApiProperty({ type: [TranslationProperty] })
  @ValidateNested({ each: true })
  @Type(() => TranslationProperty)
  translations: TranslationProperty[];

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
