import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column, CreateDateColumn } from '../__common/decorators';
import { ActivityAction, ActivityType } from './activity.enum';
import { DictionaryActivityType } from './interfaces/dictionary-activity.interface';

@Entity({ name: 'activity' })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ActivityAction })
  action: ActivityAction;

  @Column({ type: 'enum', enum: ActivityType })
  type: ActivityType;

  @Column({ type: 'jsonb', default: {} })
  properties: DictionaryActivityType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
