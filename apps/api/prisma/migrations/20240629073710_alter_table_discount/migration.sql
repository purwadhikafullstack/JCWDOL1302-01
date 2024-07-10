-- DropForeignKey
ALTER TABLE `discounts` DROP FOREIGN KEY `discounts_product_id_fkey`;

-- AlterTable
ALTER TABLE `discounts` MODIFY `amount` DOUBLE NULL DEFAULT 0,
    MODIFY `unit` VARCHAR(191) NULL,
    MODIFY `minimum_price` DOUBLE NULL DEFAULT 0,
    MODIFY `maximum_discount` DOUBLE NULL DEFAULT 0,
    MODIFY `product_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `discounts` ADD CONSTRAINT `discounts_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
