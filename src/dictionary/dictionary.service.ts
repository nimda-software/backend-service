import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './dictionary.entity';
import { Repository, ILike } from 'typeorm';
import { Language } from '../translations/translation.enum';
import { FetchDictionaryResponse } from './response/fetch-dictionary.response';
import { STATUS } from '../__common/enums/status.enum';

@Injectable()
export class DictionaryService {
  constructor(@InjectRepository(Dictionary) private readonly dictionary: Repository<Dictionary>) {}

  findOneBy(uuid: string): Promise<FetchDictionaryResponse> {
    return this.dictionary.findOne({
      where: { uuid, status: STATUS.ACTIVE },
      select: ['uuid', 'value', 'description', 'language'],
    });
  }

  searchByKeyword(keyword: string, language: Language): Promise<FetchDictionaryResponse[]> {
    return this.dictionary.find({
      select: ['uuid', 'value', 'description', 'language'],
      where: {
        // ILike does case-insensitive search
        value: ILike(`${keyword}%`),
        status: STATUS.ACTIVE,
        language,
      },
    });
  }

  create(payload: Partial<Dictionary>) {
    return this.dictionary.save(payload);
  }

  update(uuid: string, payload: Partial<Dictionary>) {
    return this.dictionary.update({ uuid }, payload);
  }

  markAsDeleted(uuid: string) {
    return this.dictionary.update({ uuid }, { status: STATUS.DELETED });
  }

  markAsActive(uuid: string) {
    return this.dictionary.update({ uuid }, { status: STATUS.ACTIVE });
  }
}
