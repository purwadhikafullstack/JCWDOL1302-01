-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `bonus_quantity` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `discount` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `carts` ADD COLUMN `itemsDiscount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `total_price` DOUBLE NOT NULL DEFAULT 0;
