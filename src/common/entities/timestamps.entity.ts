import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class TimestampsEntity {
  @ApiProperty({ example: '2020-01-01T00:00:00.000Z' })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({ example: '2022-04-25T08:34:33.315Z' })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
