/*
  Warnings:

  - You are about to drop the column `selling_price` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `sliced_price` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `selling_price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `sliced_price` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart_items` DROP COLUMN `selling_price`,
    DROP COLUMN `sliced_price`,
    ADD COLUMN `discount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `price` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `selling_price`,
    DROP COLUMN `sliced_price`,
    ADD COLUMN `price` DOUBLE NOT NULL DEFAULT 0;
