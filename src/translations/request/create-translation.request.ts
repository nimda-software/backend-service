import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { Language } from '../translation.enum';

export class CreateTranslationRequest {
  @ApiProperty({ example: 'Explanation', description: 'Word or sentence', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(512)
  value: string;

  @ApiProperty({
    example: 'Some explanation',
    description: 'Translation word/sentence description, with examples',
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
  source: string;
}

export class CreateTranslationRequestParam {
  @ApiProperty({
    example: '12345678-1234-1234-1234-123456789012',
    description: 'UUID string of the target word/sentence to translate',
    required: true,
  })
  @IsUUID('4')
  dictionaryUUID: string;
}
