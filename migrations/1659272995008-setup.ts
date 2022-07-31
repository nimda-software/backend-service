import { MigrationInterface, QueryRunner } from 'typeorm';

export class setup1659272995008 implements MigrationInterface {
  name = 'setup1659272995008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."activity_action_enum" AS ENUM('created', 'updated', 'deleted')`);
    await queryRunner.query(`CREATE TYPE "public"."activity_type_enum" AS ENUM('dictionary', 'translation')`);
    await queryRunner.query(`CREATE TYPE "public"."translations_language_enum" AS ENUM('en', 'ru', 'ka', 'me', 'sv')`);
    await queryRunner.query(`CREATE TYPE "public"."dictionary_language_enum" AS ENUM('en', 'ru', 'ka', 'me', 'sv')`);
    await queryRunner.query(`
      CREATE TYPE "public"."translations_status_enum" AS ENUM(
        'ACTIVE',
        'INACTIVE',
        'DELETED',
        'PENDING',
        'REJECTED',
        'HIDDEN'
      )
    `);
    await queryRunner.query(`
      CREATE TYPE "public"."dictionary_status_enum" AS ENUM(
        'ACTIVE',
        'INACTIVE',
        'DELETED',
        'PENDING',
        'REJECTED',
        'HIDDEN'
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "activity"
      (
        "id"         SERIAL                          NOT NULL,
        "action"     "public"."activity_action_enum" NOT NULL,
        "type"       "public"."activity_type_enum"   NOT NULL,
        "properties" jsonb                           NOT NULL DEFAULT '{}',
        "createdAt"  TIMESTAMP                       NOT NULL DEFAULT now(),
        CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "translations"
      (
        "id"          SERIAL                                NOT NULL,
        "value"       text                                  NOT NULL,
        "description" text,
        "language"    "public"."translations_language_enum" NOT NULL,
        "properties"  jsonb,
        "createdBy"   integer                               NOT NULL,
        "status"      "public"."translations_status_enum"   NOT NULL DEFAULT 'PENDING',
        "createdAt"   TIMESTAMP                             NOT NULL DEFAULT now(),
        "updatedAt"   TIMESTAMP                             NOT NULL DEFAULT now(),
        CONSTRAINT "PK_aca248c72ae1fb2390f1bf4cd87" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "dictionary"
      (
        "id"          SERIAL                              NOT NULL,
        "uuid"        uuid                                NOT NULL DEFAULT uuid_generate_v4(),
        "value"       character varying(512)              NOT NULL,
        "description" text,
        "language"    "public"."dictionary_language_enum" NOT NULL,
        "source"      character varying(32),
        "status"      "public"."dictionary_status_enum"   NOT NULL DEFAULT 'PENDING',
        "createdAt"   TIMESTAMP                           NOT NULL DEFAULT now(),
        "updatedAt"   TIMESTAMP                           NOT NULL DEFAULT now(),
        CONSTRAINT "PK_d17df343bd5d01ed62dd0e55e4a" PRIMARY KEY ("id")
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "seeds"`);
    await queryRunner.query(`DROP TABLE "dictionary"`);
    await queryRunner.query(`DROP TYPE "public"."dictionary_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."dictionary_language_enum"`);
    await queryRunner.query(`DROP TABLE "translations"`);
    await queryRunner.query(`DROP TYPE "public"."translations_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."translations_language_enum"`);
    await queryRunner.query(`DROP TABLE "activity"`);
    await queryRunner.query(`DROP TYPE "public"."activity_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."activity_action_enum"`);
  }
}
