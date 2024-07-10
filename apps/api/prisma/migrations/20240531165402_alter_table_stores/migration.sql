/*
  Warnings:

  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Store`;

-- CreateTable
CREATE TABLE `stores` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `subdistrict_id` INTEGER NULL,
    `subdistrict_name` VARCHAR(191) NULL,
    `city_id` INTEGER NULL,
    `city_name` VARCHAR(191) NULL,
    `province_id` INTEGER NULL,
    `province_name` VARCHAR(191) NULL,
    `postal_code` VARCHAR(191) NULL,
    `longitude` VARCHAR(191) NULL,
    `latitude` VARCHAR(191) NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
