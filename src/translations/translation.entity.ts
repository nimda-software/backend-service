import { Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Column, CreateDateColumn, UpdateDateColumn } from '../__common/decorators';
import { Language } from './translation.enum';
import { Dictionary } from '../dictionary/dictionary.entity';
import { TimestampsInterface } from '../__common/interfaces/timestamps.interface';
import { STATUS } from '../__common/enums/status.enum';

@Entity({ name: 'translations' })
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
  @JoinColumn({ name: 'dictionaryId' })
  dictionary: Dictionary;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
