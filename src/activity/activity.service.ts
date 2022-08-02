import { Injectable } from '@nestjs/common';
import { ActivityAction, ActivityType } from './activity.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { Repository } from 'typeorm';
import {
  DictionaryActivityType,
  DictionaryCreated,
  DictionaryDeleted,
  DictionaryUpdated,
} from './interfaces/dictionary-activity.interface';

@Injectable()
export class ActivityService {
  constructor(@InjectRepository(Activity) private readonly activityRepository: Repository<Activity>) {}

  private create(activity: DictionaryActivityType, type: ActivityType, action: ActivityAction): Promise<Activity> {
    return this.activityRepository.save({
      type,
      action,
      properties: activity,
    });
  }

  public addDictionaryCreated(activity: DictionaryCreated): Promise<Activity> {
    return this.create(activity, ActivityType.DICTIONARY, ActivityAction.CREATED);
  }

  public addDictionaryUpdated(activity: DictionaryUpdated): Promise<Activity> {
    return this.create(activity, ActivityType.DICTIONARY, ActivityAction.UPDATED);
  }

  public addDictionaryDeleted(activity: DictionaryDeleted): Promise<Activity> {
    return this.create(activity, ActivityType.DICTIONARY, ActivityAction.DELETED);
  }

  public addTranslationCreated(activity: DictionaryCreated): Promise<Activity> {
    return this.create(activity, ActivityType.TRANSLATION, ActivityAction.CREATED);
  }

  public addTranslationUpdated(activity: DictionaryUpdated): Promise<Activity> {
    return this.create(activity, ActivityType.TRANSLATION, ActivityAction.UPDATED);
  }

  public addTranslationDeleted(activity: DictionaryDeleted): Promise<Activity> {
    return this.create(activity, ActivityType.TRANSLATION, ActivityAction.DELETED);
  }
}
