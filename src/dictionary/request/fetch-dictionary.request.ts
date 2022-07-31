import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator';
import { Language } from '../../translations/translation.enum';

export class FetchDictionaryRequestParam {
  @ApiProperty({ description: 'Dictionary id', required: true })
  @IsUUID('4')
  uuid: string;
}

export class SearchDictionaryRequestParam {
  @ApiProperty({ description: 'Search by keyword', required: true })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  keyword: string;

  @ApiProperty({ description: 'Search by language', required: true, enum: Language })
  @IsEnum(Language)
  language: Language;
}
