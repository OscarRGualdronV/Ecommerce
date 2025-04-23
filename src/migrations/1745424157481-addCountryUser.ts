import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCountryUser1745424157481 implements MigrationInterface {
    name = 'AddCountryUser1745424157481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
    }

}
