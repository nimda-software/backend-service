import { Entity, Generated, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Column, CreateDateColumn, UpdateDateColumn } from '../../common/decorators';
import { Language } from '../../translations/translation.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Translation } from '../../translations/entities/translation.entity';
import { TimestampsInterface } from '../../common/interfaces/timestamps.interface';
import { STATUS } from '../../common/enums/status.enum';
import { DictionaryProperties } from '../interfaces/dictionary-properties.interface';

@Entity({ name: 'dictionary' })
export class Dictionary implements TimestampsInterface {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'UUID string', example: '12345678-1234-1234-1234-123456789012' })
  @Generated('uuid')
  @Column({ type: 'uuid', nullable: false })
  uuid: string;

  @ApiProperty({ example: 'Hello there', description: 'Word or sentence' })
  @Column({ type: 'text', nullable: false })
  value: string;

  @ApiProperty({ example: 'Some explanation', description: 'Dictionary word/sentence description, with examples' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: Language.EN, description: 'Language code' })
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

  @ApiProperty({ example: '2020-01-01T00:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2022-04-25T08:34:33.315Z' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
