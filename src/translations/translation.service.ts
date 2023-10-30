import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from './translation.entity';
import { Repository } from 'typeorm';
import { STATUS } from '/common/enums/status.enum';
import { Dictionary } from '../dictionary/dictionary.entity';

@Injectable()
export class TranslationService {
  constructor(@InjectRepository(Translation) private readonly translation: Repository<Translation>) {}

  findOneBy(uuid: string) {
    return this.translation.findOne({
      where: { uuid, status: STATUS.ACTIVE },
      select: ['id', 'uuid', 'value', 'description', 'language'],
      order: { createdAt: 'DESC' },
    });
  }

  create(payload: Partial<Translation>, dictionary: Dictionary) {
    const translationInstance = this.translation.create({ ...payload, dictionary });

    return this.translation.save(translationInstance);
  }

  update(uuid: string, payload: Partial<Translation>) {
    return this.translation.update({ uuid }, payload);
  }

  markAsDeleted(uuid: string) {
    return this.translation.update({ uuid }, { status: STATUS.DELETED });
  }

  markAsActive(uuid: string) {
    return this.translation.update({ uuid }, { status: STATUS.ACTIVE });
  }
}
