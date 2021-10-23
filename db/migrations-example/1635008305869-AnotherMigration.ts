import {MigrationInterface, QueryRunner} from "typeorm";

export class AnotherMigration1635008305869 implements MigrationInterface {
    name = 'AnotherMigration1635008305869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test_entity\` CHANGE \`name\` \`name\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`test_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test_entity\` CHANGE \`deletedAt\` \`deletedAt\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`test_entity\` CHANGE \`name\` \`name\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
