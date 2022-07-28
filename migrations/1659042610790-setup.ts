import { MigrationInterface, QueryRunner } from 'typeorm';

export class setup1659042610790 implements MigrationInterface {
  name = 'setup1659042610790';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "translations"
            ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
    await queryRunner.query(`
            ALTER TABLE "dictionary"
            ADD "uuid" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "dictionary" DROP COLUMN "uuid"
        `);
    await queryRunner.query(`
            ALTER TABLE "translations" DROP COLUMN "uuid"
        `);
  }
}
