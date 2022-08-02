import { Injectable } from '@nestjs/common';
import { CreateTranslationRequest } from './request/create-translation.request';
import { UpdateTranslationRequest } from './request/update-translation.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from './translation.entity';
import { Repository } from 'typeorm';
import { STATUS } from '../__common/enums/status.enum';

@Injectable()
export class TranslationService {
  constructor(@InjectRepository(Translation) private readonly translation: Repository<Translation>) {}

  findOneBy(uuid: string) {
    return this.translation.findOne({
      where: { uuid, status: STATUS.ACTIVE },
      select: ['uuid', 'value', 'description', 'language'],
      order: { createdAt: 'DESC' },
    });
  }

  create(payload: Partial<Translation>) {
    return this.translation.save(payload);
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
