-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `carts_store_id_fkey`;

-- AlterTable
ALTER TABLE `carts` MODIFY `store_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
