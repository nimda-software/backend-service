import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Language } from '../../translations/translation.enum';

export class SearchDictionaryRequestParam {
  @ApiProperty({ description: 'What keyword to use', required: true })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  keyword: string;

  @ApiProperty({ description: 'What language to use', required: true, enum: Language })
  @IsEnum(Language)
  language: Language;
}
