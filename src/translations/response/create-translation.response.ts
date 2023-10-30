import { Translation } from '../translation.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { STATUS } from '/common/enums/status.enum';
import { Language } from '../translation.enum';
import { Dictionary } from '/src/dictionary/dictionary.entity';

export class CreateTranslationResponse {
  @ApiProperty({ description: 'UUID string', example: '12345678-1234-1234-1234-123456789012' })
  uuid: string;

  @ApiProperty({ example: 'Hello there', description: 'Word or sentence' })
  value: string;

  @ApiProperty({ example: 'Some explanation', description: 'Dictionary word/sentence description, with examples' })
  description: string;

  @ApiProperty({ example: Language.EN, description: 'Language code' })
  language: Language;

  @Exclude()
  id: number;

  @Exclude()
  source: string;

  @Exclude()
  status: STATUS;

  @Exclude()
  dictionary: Dictionary;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Translation>) {
    Object.assign(this, partial);
  }

  static from(partial: Partial<Translation>) {
    return new CreateTranslationResponse(partial);
  }
}
