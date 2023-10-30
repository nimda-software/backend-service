import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSetup1698695624935 implements MigrationInterface {
  name = 'InitialSetup1698695624935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`Activity\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`action\` enum ('created', 'updated', 'deleted') NOT NULL,
                \`type\` enum ('Dictionary', 'translation') NOT NULL,
                \`properties\` text NULL,
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`Dictionary\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`uuid\` varchar(36) NOT NULL,
                \`value\` varchar(512) NOT NULL,
                \`description\` text NULL,
                \`language\` enum ('en', 'ru', 'ka', 'me', 'sv') NOT NULL,
                \`source\` varchar(32) NULL,
                \`status\` enum (
                    'ACTIVE',
                    'INACTIVE',
                    'DELETED',
                    'PENDING',
                    'REJECTED',
                    'HIDDEN'
                ) NOT NULL DEFAULT 'PENDING',
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_36bf31af45f7b1cc2a0eb1fb00\` (\`uuid\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`Translations\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`uuid\` varchar(36) NOT NULL,
                \`value\` varchar(512) NOT NULL,
                \`description\` text NULL,
                \`language\` enum ('en', 'ru', 'ka', 'me', 'sv') NOT NULL,
                \`source\` varchar(32) NULL,
                \`status\` enum (
                    'ACTIVE',
                    'INACTIVE',
                    'DELETED',
                    'PENDING',
                    'REJECTED',
                    'HIDDEN'
                ) NOT NULL DEFAULT 'PENDING',
                \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`dictionaryId\` int NOT NULL,
                UNIQUE INDEX \`IDX_f24fc2869d7b53ef295f93ad13\` (\`uuid\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS \`Seeds\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(128) NOT NULL,
                \`timestamp\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`Translations\`
            ADD CONSTRAINT \`FK_d5d4d581eafd9d115bbabc123fe\` FOREIGN KEY (\`dictionaryId\`) REFERENCES \`Dictionary\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`Translations\` DROP FOREIGN KEY \`FK_d5d4d581eafd9d115bbabc123fe\``);
    await queryRunner.query(`DROP TABLE \`Seeds\``);
    await queryRunner.query(`DROP INDEX \`IDX_f24fc2869d7b53ef295f93ad13\` ON \`Translations\``);
    await queryRunner.query(`DROP TABLE \`Translations\``);
    await queryRunner.query(`DROP INDEX \`IDX_36bf31af45f7b1cc2a0eb1fb00\` ON \`Dictionary\``);
    await queryRunner.query(`DROP TABLE \`Dictionary\``);
    await queryRunner.query(`DROP TABLE \`Activity\``);
  }
}
