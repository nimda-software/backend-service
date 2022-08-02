import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDictionaryRequest } from './create-dictionary.request';
import { STATUS } from '../../__common/enums/status.enum';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpdateDictionaryRequest extends PartialType(CreateDictionaryRequest) {
  @ApiProperty({ description: 'Record status', enum: STATUS, required: false })
  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;
}

export class UpdateDictionaryRequestParam {
  @ApiProperty({ description: 'Dictionary UUID', required: true })
  @IsUUID('4')
  uuid: string;
}
