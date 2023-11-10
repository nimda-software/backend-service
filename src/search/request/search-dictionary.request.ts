import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Language } from '/src/translations/translation.enum';
import { Type } from 'class-transformer';

export class SearchDictionaryRequestParam {
  @ApiProperty({ description: 'What keyword to use', required: true })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(32)
  keyword: string;

  @ApiProperty({ description: 'What language to use', required: true, enum: Language })
  @IsEnum(Language)
  language: Language;

  @ApiProperty({ required: false, default: 32, description: 'How many MAX records to retrieve' })
  @Type(() => Number)
  @Max(128)
  @IsPositive()
  @IsOptional()
  take: number = 32;

  @ApiProperty({ required: false, default: 0, description: 'Records to skip' })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(256)
  @IsOptional()
  skip: number = 0;
}
