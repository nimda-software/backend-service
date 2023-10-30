import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { AddDefaultValuesForDevelopment } from '../seeds/AddDefaultValuesForDevelopment';
import { Seeds } from '/common/setup/seeder/abstract/BaseSeed';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger('SeederService');

  constructor(private readonly addDevelopmentValues: AddDefaultValuesForDevelopment) {}

  async onApplicationBootstrap() {
    return this.seed();
  }

  async seed() {
    // When there is a new seed, add it here
    const seeds: Seeds[] = [this.addDevelopmentValues];

    for (const seed of seeds) {
      if (await seed.hasRun()) continue;

      try {
        await seed.run();
      } catch (error: unknown) {
        const errMessage = error instanceof Error ? error.message : JSON.stringify(error);
        this.logger.error(`[Seed][${seed.name}] Operation has been failed with error: ${errMessage}!`);
        continue;
      }

      await seed.markAsRun();
      this.logger.log(`[Seed][${seed.name}] Operation has been run!`);
    }
  }
}
