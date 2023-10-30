import { Entity, Generated, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Language } from './translation.enum';
import { Dictionary } from '../dictionary/dictionary.entity';
import { TimestampsInterface } from '/common/interfaces/timestamps.interface';
import { STATUS } from '/common/enums/status.enum';
import { Column } from '/common/decorators/column.decorator';
import { CreateDateColumn } from '/common/decorators/create-date-column.decorator';
import { UpdateDateColumn } from '/common/decorators/update-date-column.decorator';

@Entity({ name: 'Translations' })
@Index(['uuid'], { unique: true })
export class Translation implements TimestampsInterface {
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

  // Bidirectional relationship with DictionaryEntity by specifying inverse side
  @ManyToOne(() => Dictionary, (dictionary) => dictionary.translations, { nullable: false })
  @JoinColumn({ name: 'dictionaryId', referencedColumnName: 'id' })
  dictionary: Dictionary;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
