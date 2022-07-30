import { PartialType } from '@nestjs/swagger';
import { CreateTranslationRequest } from './create-translation.request';

export class UpdateTranslationRequest extends PartialType(CreateTranslationRequest) {}
