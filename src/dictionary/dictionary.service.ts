import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DictionaryService {
  constructor(@InjectRepository(Dictionary) private readonly dictionary: Repository<Dictionary>) {}

  create(payload: Partial<Dictionary>) {
    return this.dictionary.save(payload);
  }

  findAll() {
    return this.dictionary.find({ select: ['uuid', 'value', 'description', 'language'] });
  }

  findOne(uuid: string) {
    return this.dictionary.findOne({ where: { uuid }, select: ['uuid', 'value', 'description', 'language'] });
  }

  update(uuid: string, payload: Partial<Dictionary>) {
    return this.dictionary.update({ uuid }, payload);
  }

  remove(uuid: string) {
    return this.dictionary.delete({ uuid });
  }
}
