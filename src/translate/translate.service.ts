import { Injectable } from '@nestjs/common';
import { CreateTranslateRequest } from './request/create-translate.request';
import { UpdateTranslateRequest } from './request/update-translate.request';

@Injectable()
export class TranslateService {
  create(createTranslateDto: CreateTranslateRequest) {
    return 'This action adds a new translate';
  }

  findAll() {
    return `This action returns all translate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} translate`;
  }

  update(id: number, updateTranslateDto: UpdateTranslateRequest) {
    return `This action updates a #${id} translate`;
  }

  remove(id: number) {
    return `This action removes a #${id} translate`;
  }
}
