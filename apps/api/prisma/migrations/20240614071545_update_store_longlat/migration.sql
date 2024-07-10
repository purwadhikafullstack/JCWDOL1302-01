/*
  Warnings:

  - You are about to alter the column `longitude` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `latitude` on the `stores` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `stores` MODIFY `longitude` DOUBLE NULL,
    MODIFY `latitude` DOUBLE NULL;
