/*
  Warnings:

  - You are about to drop the column `bonus_quantity` on the `cart_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart_items` DROP COLUMN `bonus_quantity`,
    ADD COLUMN `is_buy1_get1` BOOLEAN NOT NULL DEFAULT false;
