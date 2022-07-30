import { MigrationInterface, QueryRunner } from 'typeorm';

export class setup1659199933897 implements MigrationInterface {
  name = 'setup1659199933897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "dictionary"
      (
        "createdAt"   TIMESTAMP                           NOT NULL DEFAULT now(),
        "updatedAt"   TIMESTAMP                           NOT NULL DEFAULT now(),
        "id"          SERIAL                              NOT NULL,
        "uuid"        uuid                                NOT NULL DEFAULT uuid_generate_v4(),
        "value"       text                                NOT NULL,
        "description" text,
        "language"    "public"."dictionary_language_enum" NOT NULL,
        CONSTRAINT "PK_d17df343bd5d01ed62dd0e55e4a" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "translations"
      (
        "createdAt"    TIMESTAMP                             NOT NULL DEFAULT now(),
        "updatedAt"    TIMESTAMP                             NOT NULL DEFAULT now(),
        "id"           SERIAL                                NOT NULL,
        "uuid"         uuid                                  NOT NULL DEFAULT uuid_generate_v4(),
        "value"        text                                  NOT NULL,
        "description"  text,
        "language"     "public"."translations_language_enum" NOT NULL,
        "dictionaryId" integer,
        CONSTRAINT "PK_aca248c72ae1fb2390f1bf4cd87" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "seeds"
      (
        "id"        SERIAL                 NOT NULL,
        "name"      character varying(128) NOT NULL,
        "timestamp" TIMESTAMP              NOT NULL DEFAULT now(),
        CONSTRAINT "PK_3ac799e4ece18bc838823bb6a4b" PRIMARY KEY ("id")
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
      DROP TABLE "seeds"
    `);
    await queryRunner.query(`
      DROP TABLE "translations"
    `);
    await queryRunner.query(`
      DROP TABLE "dictionary"
    `);
  }
}
