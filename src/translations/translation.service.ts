import { Injectable } from '@nestjs/common';
import { CreateTranslationRequest } from './request/create-translation.request';
import { UpdateTranslationRequest } from './request/update-translation.request';

@Injectable()
export class TranslationService {
  create(createTranslateDto: CreateTranslationRequest) {
    return 'This action adds a new translate';
  }

  findAll() {
    return `This action returns all translate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translate`;
  }

  update(id: number, updateTranslateDto: UpdateTranslationRequest) {
    return `This action updates a #${id} translate`;
  }

  remove(id: number) {
    return `This action removes a #${id} translate`;
  }
}
