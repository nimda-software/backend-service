import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDictionaryRequest } from './create-dictionary.request';
import { STATUS } from '../../__common/enums/status.enum';
import { IsEnum, IsUUID } from 'class-validator';

export class UpdateDictionaryRequest extends PartialType(CreateDictionaryRequest) {
  @ApiProperty({ description: 'Translation status', enum: STATUS, required: false })
  @IsEnum(STATUS)
  status: STATUS;
}

export class UpdateDictionaryRequestParam {
  @ApiProperty({ description: 'Dictionary id', required: true })
  @IsUUID('4')
  uuid: string;
}
