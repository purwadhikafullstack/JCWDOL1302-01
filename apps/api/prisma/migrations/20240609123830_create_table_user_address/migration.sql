-- CreateTable
CREATE TABLE `user_address` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `subdistrict_id` INTEGER NOT NULL,
    `subdistrict_name` VARCHAR(191) NOT NULL,
    `city_id` INTEGER NOT NULL,
    `city_name` VARCHAR(191) NOT NULL,
    `province_id` INTEGER NOT NULL,
    `province_name` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_address` ADD CONSTRAINT `user_address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
