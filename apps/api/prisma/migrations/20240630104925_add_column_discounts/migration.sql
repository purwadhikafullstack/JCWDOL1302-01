/*
  Warnings:

  - You are about to drop the column `discount_price` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `discounts` ADD COLUMN `minimum_orders` DOUBLE NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `order_items` ADD COLUMN `discount` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `discount_price`,
    ADD COLUMN `itemsDiscount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `referralDiscount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `shippingDiscount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `voucherDiscount` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `user_vouchers` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `discount_id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NULL,
    `is_used` BOOLEAN NOT NULL DEFAULT false,
    `created_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expired_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_vouchers` ADD CONSTRAINT `user_vouchers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_vouchers` ADD CONSTRAINT `user_vouchers_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `discounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_vouchers` ADD CONSTRAINT `user_vouchers_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
