import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from '/common/decorators/column.decorator';
import { CreateDateColumn } from '/common/decorators/create-date-column.decorator';

@Entity({ name: 'Seeds' })
export class Seed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 128 })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;
}
