import { Language } from '../../translations/translation.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateDictionaryRequest {
  @ApiProperty({ example: 'Hello there', description: 'Word or sentence', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(128)
  value: string;

  @ApiProperty({
    example: 'Some explanation',
    description: 'Dictionary word/sentence description, with examples',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1024)
  description: string;

  @ApiProperty({ example: Language.EN, description: 'Language code', enum: Language, required: true })
  @IsEnum(Language)
  language: Language;

  @ApiProperty({
    description: "Source of the word/sentence, whether it's individually contributed by user, or from a dictionary",
    required: false,
    default: null,
  })
  @IsString()
  @IsOptional()
  source: string = null;
}
