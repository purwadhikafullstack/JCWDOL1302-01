/*
  Warnings:

  - Made the column `address` on table `stores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subdistrict_id` on table `stores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subdistrict_name` on table `stores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city_id` on table `stores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city_name` on table `stores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `province_id` on table `stores` required. This step will fail if there are existing NULL values in that column.
  - Made the column `province_name` on table `stores` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `stores` MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `subdistrict_id` INTEGER NOT NULL,
    MODIFY `subdistrict_name` VARCHAR(191) NOT NULL,
    MODIFY `city_id` INTEGER NOT NULL,
    MODIFY `city_name` VARCHAR(191) NOT NULL,
    MODIFY `province_id` INTEGER NOT NULL,
    MODIFY `province_name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    UNIQUE INDEX `categories_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `sliced_price` DOUBLE NOT NULL DEFAULT 0,
    `selling_price` DOUBLE NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_by` VARCHAR(191) NULL,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(191) NULL,
    `updated_date` DATETIME(3) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `products_name_key`(`name`),
    UNIQUE INDEX `products_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
