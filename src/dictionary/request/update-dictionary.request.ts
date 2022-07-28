import { PartialType } from '@nestjs/swagger';
import { CreateDictionaryRequest } from './create-dictionary.request';

export class UpdateDictionaryRequest extends PartialType(CreateDictionaryRequest) {}
