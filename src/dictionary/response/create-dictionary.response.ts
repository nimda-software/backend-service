import { Dictionary } from '../dictionary.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { STATUS } from '../../__common/enums/status.enum';
import { Language } from '../../translations/translation.enum';

export class CreateDictionaryResponse {
  @ApiProperty({ description: 'UUID string', example: '12345678-1234-1234-1234-123456789012' })
  uuid: string;

  @ApiProperty({ example: 'Hello there', description: 'Word or sentence' })
  value: string;

  @ApiProperty({ example: 'Some explanation', description: 'Dictionary word/sentence description, with examples' })
  description: string;

  @ApiProperty({ example: Language.EN, description: 'Language code' })
  language: Language;

  @Exclude() // Excludes from validation and drops it from payload if present
  id: number;

  @Exclude()
  source: string;

  @Exclude()
  status: STATUS;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<Dictionary>) {
    Object.assign(this, partial);
  }

  static from(partial: Partial<Dictionary>) {
    return new CreateDictionaryResponse(partial);
  }
}
