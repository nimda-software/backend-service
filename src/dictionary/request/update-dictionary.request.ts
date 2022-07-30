import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDictionaryRequest } from './create-dictionary.request';
import { STATUS } from '../../common/enums/status.enum';
import { IsEnum } from 'class-validator';

export class UpdateDictionaryRequest extends PartialType(CreateDictionaryRequest) {
  @ApiProperty({ description: 'Translation status', enum: STATUS, required: false })
  @IsEnum(STATUS)
  status: STATUS;
}
