import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, UpdateDateColumn } from '../../common/decorators';
import { Language } from '../translate.enum';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';
import { TimestampsInterface } from '../../common/interfaces/timestamps.interface';
import { TranslationProperties } from '../interfaces/translation-properties.interface';
import { STATUS } from '../../common/enums/status.enum';

@Entity({ name: 'translations' })
export class Translation implements TimestampsInterface {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Hello there', description: 'Translation text' })
  @Column({ type: 'text', nullable: false })
  value: string;

  @ApiProperty({ example: '', description: 'Translation description, with examples' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: Language.EN, description: 'Language code' })
  @Column({ type: 'enum', enum: Language, nullable: false })
  language: Language;

  @Column({ type: 'jsonb', nullable: true })
  properties: TranslationProperties;

  @Column({ type: 'int', nullable: false })
  createdBy: number;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.PENDING })
  status: STATUS;

  // Bidirectional relationship with DictionaryEntity by specifying inverse side
  @OneToOne(() => Dictionary, (dictionary) => dictionary.translation)
  dictionary: Dictionary;

  @ApiProperty({ example: '2020-01-01T00:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2022-04-25T08:34:33.315Z' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
