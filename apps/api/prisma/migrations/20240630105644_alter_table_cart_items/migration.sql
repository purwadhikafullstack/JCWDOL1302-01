/*
  Warnings:

  - You are about to drop the column `bonus_quantity` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `cart_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart_items` DROP COLUMN `bonus_quantity`,
    DROP COLUMN `discount`;
