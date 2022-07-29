import { MigrationInterface, QueryRunner } from 'typeorm';

export class setup1659042369773 implements MigrationInterface {
  name = 'setup1659042369773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."translations_language_enum" AS ENUM('en', 'ru', 'ka', 'me', 'sv')
        `);
    await queryRunner.query(`
      CREATE TABLE "translations"
      (
        "id"           SERIAL                                NOT NULL,
        "value"        text                                  NOT NULL,
        "description"  text,
        "language"     "public"."translations_language_enum" NOT NULL,
        "dictionaryId" integer,
        "createdAt"    TIMESTAMP                             NOT NULL DEFAULT now(),
        "updatedAt"    TIMESTAMP                             NOT NULL DEFAULT now(),
        CONSTRAINT "PK_aca248c72ae1fb2390f1bf4cd87" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
            CREATE TYPE "public"."dictionary_language_enum" AS ENUM('en', 'ru', 'ka', 'me', 'sv')
        `);
    await queryRunner.query(`
      CREATE TABLE "dictionary"
      (
        "id"          SERIAL                              NOT NULL,
        "value"       text                                NOT NULL,
        "description" text,
        "language"    "public"."dictionary_language_enum" NOT NULL,
        "createdAt"   TIMESTAMP                           NOT NULL DEFAULT now(),
        "updatedAt"   TIMESTAMP                           NOT NULL DEFAULT now(),
        CONSTRAINT "PK_d17df343bd5d01ed62dd0e55e4a" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "translations"
        ADD CONSTRAINT "FK_d5d4d581eafd9d115bbabc123fe" FOREIGN KEY ("dictionaryId") REFERENCES "dictionary" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "translations"
        DROP CONSTRAINT "FK_d5d4d581eafd9d115bbabc123fe"
    `);
    await queryRunner.query(`
      DROP TABLE "dictionary"
    `);
    await queryRunner.query(`
            DROP TYPE "public"."dictionary_language_enum"
        `);
    await queryRunner.query(`
      DROP TABLE "translations"
    `);
    await queryRunner.query(`
            DROP TYPE "public"."translations_language_enum"
        `);
  }
}
