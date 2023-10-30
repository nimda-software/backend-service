import { Entity, Generated, PrimaryGeneratedColumn, JoinColumn, OneToMany, Index } from 'typeorm';
import { Language } from '../translations/translation.enum';
import { Translation } from '../translations/translation.entity';
import { TimestampsInterface } from '/common/interfaces/timestamps.interface';
import { STATUS } from '/common/enums/status.enum';
import { Column } from '/common/decorators/column.decorator';
import { CreateDateColumn } from '/common/decorators/create-date-column.decorator';
import { UpdateDateColumn } from '/common/decorators/update-date-column.decorator';

@Entity({ name: 'Dictionary' })
@Index(['uuid'], { unique: true })
export class Dictionary implements TimestampsInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ type: 'uuid' })
  uuid: string;

  @Column({ type: 'varchar', length: 512 })
  value: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: Language })
  language: Language;

  @Column({ type: 'varchar', nullable: true, length: 32 })
  source: string;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.PENDING })
  status: STATUS;

  // Bidirectional relationship with TranslationEntity by specifying inverse side
  @OneToMany(() => Translation, (translation) => translation.dictionary, { nullable: true })
  @JoinColumn({ name: 'translationId', referencedColumnName: 'id' })
  translations: Translation[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
