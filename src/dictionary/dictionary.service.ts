import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './dictionary.entity';
import { Repository, ILike } from 'typeorm';
import { Language } from '../translations/translation.enum';
import { STATUS } from '../__common/enums/status.enum';

@Injectable()
export class DictionaryService {
  constructor(@InjectRepository(Dictionary) private readonly dictionary: Repository<Dictionary>) {}

  findOneBy(uuid: string) {
    return this.dictionary.findOne({
      where: { uuid, status: STATUS.ACTIVE },
      select: ['id', 'uuid', 'value', 'description', 'language', 'updatedAt'],
      relations: { translations: true },
      order: { updatedAt: 'DESC' },
    });
  }

  searchByKeyword(keyword: string, keywordLanguage: Language) {
    return this.dictionary.find({
      relations: ['translations'],
      select: ['id', 'uuid', 'value', 'description', 'language'],
      where: {
        // ILike does case-insensitive search
        value: ILike(`${keyword}%`),
        status: STATUS.ACTIVE,
        language: keywordLanguage,
        translations: {
          status: STATUS.ACTIVE,
        },
      },
      take: 32, // limit to 32 results
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
