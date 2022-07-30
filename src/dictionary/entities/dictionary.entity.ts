import { Entity, Generated, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Column, CreateDateColumn, UpdateDateColumn } from '../../common/decorators';
import { Language } from '../../translations/translation.enum';
import { Translation } from '../../translations/entities/translation.entity';
import { TimestampsInterface } from '../../common/interfaces/timestamps.interface';
import { STATUS } from '../../common/enums/status.enum';
import { DictionaryProperties } from '../interfaces/dictionary-properties.interface';

@Entity({ name: 'dictionary' })
export class Dictionary implements TimestampsInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ type: 'uuid', nullable: false })
  uuid: string;

  @Column({ type: 'text', nullable: false })
  value: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: Language, nullable: false })
  language: Language;

  @Column({ type: 'jsonb', nullable: true })
  properties: DictionaryProperties;

  @Column({ type: 'int', nullable: false })
  createdBy: number;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.PENDING })
  status: STATUS;

  // Bidirectional relationship with TranslationEntity by specifying inverse side
  @OneToOne(() => Translation, (translation) => translation.dictionary, { onDelete: 'CASCADE', nullable: true })
  translation: Translation;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
