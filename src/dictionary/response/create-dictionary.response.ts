import { Translation } from '../../translations/entities/translation.entity';
import { Dictionary } from '../dictionary.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { STATUS } from '../../__common/enums/status.enum';
import { Language } from '../../translations/translation.enum';

export class CreateDictionaryResponse extends PartialType(Dictionary) {
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
  translation: Translation;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Dictionary>) {
    super();
    Object.assign(this, partial);
  }

  static from(partial: Partial<Dictionary>) {
    return new CreateDictionaryResponse(partial);
  }
}
