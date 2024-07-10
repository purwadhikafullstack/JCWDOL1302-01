/*
  Warnings:

  - You are about to drop the column `payment_status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_status` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `bonus_quantity` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `order_items` ADD COLUMN `bonus_quantity` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `payment_status`,
    DROP COLUMN `shipping_status`,
    ADD COLUMN `order_status` VARCHAR(191) NOT NULL DEFAULT 'Menunggu Pembayaran';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `referral_code` VARCHAR(191) NULL;
