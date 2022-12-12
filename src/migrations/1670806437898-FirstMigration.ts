import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1670806437898 implements MigrationInterface {
    name = 'FirstMigration1670806437898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "category_id" character varying, "name" character varying NOT NULL, "sku" character varying, "description" character varying, "price" character varying NOT NULL, "offer_price" character varying, "stock" character varying NOT NULL, "variants" json NOT NULL DEFAULT '[]', "images" json NOT NULL DEFAULT '[]', CONSTRAINT "PK_2b42017b5d7c8bc0a2320a7295c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_product_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "name" character varying NOT NULL, "img_url" character varying NOT NULL, CONSTRAINT "PK_f26606a38bb5f75aca2e97408d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store_socials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "facebook" character varying, "instagram" character varying, "pinterest" character varying, "twitter" character varying, "tiktok" character varying, "youtube" character varying, CONSTRAINT "UQ_7d3c0aee9be95eddde6a839d877" UNIQUE ("store_id"), CONSTRAINT "PK_117d7c193123b2e5692768b5f26" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenant_stores" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" character varying NOT NULL, "name" character varying NOT NULL, "domain" character varying NOT NULL, "whatsapp" character varying NOT NULL, "telephone" character varying NOT NULL, "category" character varying NOT NULL, "country" character varying NOT NULL, "currency" character varying NOT NULL, "logo_img" character varying, "banner_img" character varying, "description" character varying, "team_img" character varying, "team_description" character varying, CONSTRAINT "UQ_60ef3e2de8fbc135316e5c6f8e9" UNIQUE ("tenant_id"), CONSTRAINT "UQ_25fe03ce1017034bb19cfc832a4" UNIQUE ("domain"), CONSTRAINT "PK_ab1bab0e98ffeb8d68fe2dfd74a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenant_forgot_password_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tenant_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fed0d3a71172cf17f21624ed5ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying, "status" integer NOT NULL DEFAULT '1', "expiration_date" date, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "name" character varying, "surname" character varying, "country" character varying NOT NULL, "profile_img" character varying, CONSTRAINT "UQ_155c343439adc83ada6ee3f48be" UNIQUE ("email"), CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tenant_tiers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" integer NOT NULL, "duration_in_days" integer NOT NULL, "duration_in_months" integer NOT NULL, CONSTRAINT "PK_3b4e4f2508be11fdedd1a594d16" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tenant_tiers"`);
        await queryRunner.query(`DROP TABLE "tenants"`);
        await queryRunner.query(`DROP TABLE "tenant_forgot_password_requests"`);
        await queryRunner.query(`DROP TABLE "tenant_stores"`);
        await queryRunner.query(`DROP TABLE "store_socials"`);
        await queryRunner.query(`DROP TABLE "store_product_categories"`);
        await queryRunner.query(`DROP TABLE "store_products"`);
    }

}
