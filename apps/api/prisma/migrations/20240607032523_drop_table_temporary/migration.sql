/*
  Warnings:

  - You are about to drop the column `birth_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `created_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `is_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `birth_date`,
    DROP COLUMN `created_date`,
    DROP COLUMN `gender`,
    DROP COLUMN `image`,
    DROP COLUMN `is_verified`,
    DROP COLUMN `name`,
    DROP COLUMN `phone`,
    DROP COLUMN `updated_date`;
