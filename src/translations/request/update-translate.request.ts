import { PartialType } from '@nestjs/swagger';
import { CreateTranslateRequest } from './create-translate.request';

export class UpdateTranslateRequest extends PartialType(CreateTranslateRequest) {}
