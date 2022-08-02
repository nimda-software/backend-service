import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTranslationRequest } from './create-translation.request';
import { STATUS } from '../../__common/enums/status.enum';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpdateTranslationRequest extends PartialType(CreateTranslationRequest) {
  @ApiProperty({ description: 'Record status', enum: STATUS, required: false })
  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;
}

export class UpdateTranslationRequestParam {
  @ApiProperty({ description: 'Dictionary UUID', required: true })
  @IsUUID('4')
  uuid: string;
}
