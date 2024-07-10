/*
  Warnings:

  - Added the required column `store_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carts` ADD COLUMN `store_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `store_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
