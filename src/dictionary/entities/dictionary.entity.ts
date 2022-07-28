import { Entity, Generated, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from '../../common/decorators';
import { TimestampsEntity } from '../../common/entities/timestamps.entity';
import { Language } from '../../translate/translate.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Translate } from '../../translate/entities/translate.entity';

@Entity({ name: 'dictionary' })
export class Dictionary extends TimestampsEntity {
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

  @OneToMany(() => Translate, (translate) => translate.dictionary)
  translations: Translate[];
}
