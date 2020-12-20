import {MigrationInterface, QueryRunner} from "typeorm";

export class userStructure1608475027759 implements MigrationInterface {
    name = 'userStructure1608475027759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `address_entity` (`id` int NOT NULL AUTO_INCREMENT, `street` varchar(255) NOT NULL, `suite` varchar(255) NOT NULL, `city` varchar(255) NOT NULL, `zipcode` varchar(255) NOT NULL, `lat` varchar(255) NOT NULL, `lng` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `contact_entity` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `phone` varchar(255) NOT NULL, `website` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_entity` (`id` int NOT NULL AUTO_INCREMENT, `apiId` int NOT NULL, `name` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `addressId` int NULL, `contactId` int NULL, UNIQUE INDEX `IDX_7a7387ba2da2a0f0ab312dadfa` (`apiId`), UNIQUE INDEX `REL_642be2eb65adc0d8bf6ee11e7e` (`addressId`), UNIQUE INDEX `REL_f8c0ccb356abd18fa63bef840e` (`contactId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user_entity` ADD CONSTRAINT `FK_642be2eb65adc0d8bf6ee11e7ec` FOREIGN KEY (`addressId`) REFERENCES `address_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_entity` ADD CONSTRAINT `FK_f8c0ccb356abd18fa63bef840ee` FOREIGN KEY (`contactId`) REFERENCES `contact_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_entity` DROP FOREIGN KEY `FK_f8c0ccb356abd18fa63bef840ee`");
        await queryRunner.query("ALTER TABLE `user_entity` DROP FOREIGN KEY `FK_642be2eb65adc0d8bf6ee11e7ec`");
        await queryRunner.query("DROP INDEX `REL_f8c0ccb356abd18fa63bef840e` ON `user_entity`");
        await queryRunner.query("DROP INDEX `REL_642be2eb65adc0d8bf6ee11e7e` ON `user_entity`");
        await queryRunner.query("DROP INDEX `IDX_7a7387ba2da2a0f0ab312dadfa` ON `user_entity`");
        await queryRunner.query("DROP TABLE `user_entity`");
        await queryRunner.query("DROP TABLE `contact_entity`");
        await queryRunner.query("DROP TABLE `address_entity`");
    }

}
