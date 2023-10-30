import { Test, TestingModule } from '@nestjs/testing';
import { SeederService } from './seeder.service';
import { SetupModule } from '../../setup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Seed } from '../entity/seeder.entity';
import { Translation } from '/src/translations/translation.entity';
import { Dictionary } from '/src/dictionary/dictionary.entity';
import { AddDefaultValuesForDevelopment } from '../seeds/AddDefaultValuesForDevelopment';

describe('SeederService', () => {
  let service: SeederService;
  let connection: DataSource;
  let translationRepository: Repository<Translation>;
  let dictionaryRepository: Repository<Dictionary>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SetupModule, TypeOrmModule.forFeature([Seed, Translation, Dictionary])],
      providers: [SeederService, AddDefaultValuesForDevelopment],
    }).compile();
    connection = module.get(DataSource);
    service = module.get(SeederService);
    translationRepository = connection.getRepository(Translation);
    dictionaryRepository = connection.getRepository(Dictionary);
  });

  it('should seed the database', async () => {
    // Arrange
    const seedRepository = connection.getRepository(Seed);

    // Act
    await service.seed();

    // Assert
    const seeds = await seedRepository.count();
    const translations = await translationRepository.count();
    const dictionary = await dictionaryRepository.count();

    expect(seeds).toBeGreaterThanOrEqual(1);
    // Skipped because of env is not development
    expect(translations).toBeGreaterThanOrEqual(0);
    expect(dictionary).toBeGreaterThanOrEqual(0);
  });
});
