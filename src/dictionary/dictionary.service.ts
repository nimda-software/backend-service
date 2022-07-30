import { Injectable } from '@nestjs/common';
import { CreateDictionaryRequest } from './request/create-dictionary.request';
import { UpdateDictionaryRequest } from './request/update-dictionary.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { Repository } from 'typeorm-v2';

@Injectable()
export class DictionaryService {
  constructor(@InjectRepository(Dictionary) private readonly dictionary: Repository<Dictionary>) {}

  create(createDictionaryDto: CreateDictionaryRequest) {
    return this.dictionary.save({ ...createDictionaryDto, createdBy: -1 });
  }

  findAll() {
    return this.dictionary.find();
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
