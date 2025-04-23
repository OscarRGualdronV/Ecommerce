import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteInverseSide1745423753028 implements MigrationInterface {
    name = 'DeleteInverseSide1745423753028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying(20)`);
    }

}
