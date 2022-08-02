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
      select: ['uuid', 'value', 'description', 'language'],
      relations: { translations: true },
      order: { createdAt: 'DESC' },
    });
  }

  searchByKeyword(keyword: string, language: Language) {
    return this.dictionary.find({
      relations: { translations: true },
      select: ['uuid', 'value', 'description', 'language'],
      where: {
        // ILike does case-insensitive search
        value: ILike(`${keyword}%`),
        status: STATUS.ACTIVE,
        language,
      },
      take: 16,
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
