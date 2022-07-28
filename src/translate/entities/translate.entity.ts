import { Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampsEntity } from '../../common/entities/timestamps.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from '../../common/decorators';
import { Language } from '../translate.enum';
import { Dictionary } from '../../dictionary/entities/dictionary.entity';

@Entity({ name: 'translations' })
export class Translate extends TimestampsEntity {
  @ApiProperty({ example: 1, description: 'Primary key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'UUID string', example: '12345678-1234-1234-1234-123456789012' })
  @Generated('uuid')
  @Column({ type: 'uuid', nullable: false })
  uuid: string;

  @ApiProperty({ example: 'Hello there', description: 'Translation text' })
  @Column({ type: 'text', nullable: false })
  value: string;

  @ApiProperty({ example: '', description: 'Translation description, with examples' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: Language.EN, description: 'Language code' })
  @Column({ type: 'enum', enum: Language, nullable: false })
  language: Language;

  @ManyToOne(() => Dictionary, (dictionary) => dictionary.translations)
  dictionary: Dictionary;
}
