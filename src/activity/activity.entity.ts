import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ActivityAction, ActivityType } from './activity.enum';
import { DictionaryActivityType } from './interfaces/dictionary-activity.interface';
import { Column } from '/common/decorators/column.decorator';
import { CreateDateColumn } from '/common/decorators/create-date-column.decorator';

@Entity({ name: 'Activity' })
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ActivityAction })
  action: ActivityAction;

  @Column({ type: 'enum', enum: ActivityType })
  type: ActivityType;

  @Column({ type: 'simple-json', nullable: true })
  properties: DictionaryActivityType;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
