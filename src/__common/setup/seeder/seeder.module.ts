import { Module } from '@nestjs/common';
import { SeederService } from './service/seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seed } from './entity/seeder.entity';
import { TestSeedAlterSomeData } from './seeds/TestSeedAlterSomeData';
import { Dictionary } from '../../../dictionary/dictionary.entity';
import { Translation } from '../../../translations/translation.entity';
import { AddDefaultValuesForDevelopment } from './seeds/AddDefaultValuesForDevelopment';

@Module({
  imports: [TypeOrmModule.forFeature([Seed, Dictionary, Translation])],
  providers: [SeederService, TestSeedAlterSomeData, AddDefaultValuesForDevelopment],
  exports: [SeederService],
})
export class SeederModule {}
