import { Entity, Generated, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Column, CreateDateColumn, UpdateDateColumn } from '../__common/decorators';
import { Language } from '../translations/translation.enum';
import { Translation } from '../translations/entities/translation.entity';
import { TimestampsInterface } from '../__common/interfaces/timestamps.interface';
import { STATUS } from '../__common/enums/status.enum';

@Entity({ name: 'dictionary' })
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
  @OneToOne(() => Translation, (translation) => translation.dictionary, { onDelete: 'CASCADE', nullable: true })
  translation: Translation;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
