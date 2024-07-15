/*
  Warnings:

  - You are about to drop the column `updated_by` on the `stock_histories` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `stock_histories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `stock_histories` DROP FOREIGN KEY `stock_histories_updated_by_fkey`;

-- AlterTable
ALTER TABLE `stock_histories` DROP COLUMN `updated_by`,
    DROP COLUMN `updated_date`;

-- AlterTable
ALTER TABLE `stores` ADD COLUMN `is_default` BOOLEAN NOT NULL DEFAULT false;
