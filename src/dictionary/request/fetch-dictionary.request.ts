import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FetchDictionaryRequestParam {
  @ApiProperty({ description: 'Dictionary id', required: true })
  @IsUUID('4')
  uuid: string;
}
