import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dictionary } from './dictionary.entity';
import { ILike, Repository } from 'typeorm';
import { STATUS } from '/common/enums/status.enum';
import { Language } from '/src/translations/translation.enum';

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

  searchByKeyword(keyword: string, language: Language, take: number, skip: number) {
    return this.dictionary.find({
      relations: ['translations'],
      select: ['id', 'uuid', 'value', 'description', 'language'],
      where: {
        // ILike does case-insensitive search
        value: ILike(`${keyword}%`),
        status: STATUS.ACTIVE,
        language,
        translations: {
          status: STATUS.ACTIVE,
        },
      },
      take,
      skip,
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
