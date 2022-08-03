import { ApiProperty } from '@nestjs/swagger';
import { Language } from '../../translation.enum';
import { Exclude } from 'class-transformer';
import { STATUS } from '../../../__common/enums/status.enum';
import { Translation } from '../../translation.entity';

export class TranslationProperty {
  @ApiProperty({ description: 'UUID string', example: '12345678-1234-1234-1234-123456789012' })
  uuid: string;

  @ApiProperty({ example: 'Hello there', description: 'Word or sentence' })
  value: string;

  @ApiProperty({ example: 'Some explanation', description: 'Translation word/sentence description, with examples' })
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
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Translation>) {
    Object.assign(this, partial);
  }

  static from(partial: Partial<Translation>) {
    return new TranslationProperty(partial);
  }
}
