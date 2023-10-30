import { Module } from '@nestjs/common';
import { SeederService } from './service/seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seed } from './entity/seeder.entity';
import { Dictionary } from '/src/dictionary/dictionary.entity';
import { Translation } from '/src/translations/translation.entity';
import { AddDefaultValuesForDevelopment } from './seeds/AddDefaultValuesForDevelopment';

@Module({
  imports: [TypeOrmModule.forFeature([Seed, Dictionary, Translation])],
  providers: [SeederService, AddDefaultValuesForDevelopment],
  exports: [SeederService],
})
export class SeederModule {}
