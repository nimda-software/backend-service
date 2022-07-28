import { Injectable } from '@nestjs/common';
import { CreateDictionaryRequest } from './request/create-dictionary.request';
import { UpdateDictionaryRequest } from './request/update-dictionary.request';

@Injectable()
export class DictionaryService {
  create(createDictionaryDto: CreateDictionaryRequest) {
    return 'This action adds a new dictionary';
  }

  findAll() {
    return `This action returns all dictionary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dictionary`;
  }

  update(id: number, updateDictionaryDto: UpdateDictionaryRequest) {
    return `This action updates a #${id} dictionary`;
  }

  remove(id: number) {
    return `This action removes a #${id} dictionary`;
  }
}
