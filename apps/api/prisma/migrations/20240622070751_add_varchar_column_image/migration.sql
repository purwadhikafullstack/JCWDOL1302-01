-- AlterTable
ALTER TABLE `cart_items` MODIFY `image` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `categories` MODIFY `image` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `order_items` MODIFY `image` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `product_images` MODIFY `image` VARCHAR(1000) NOT NULL;

-- AlterTable
ALTER TABLE `products` MODIFY `image` VARCHAR(1000) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `image` VARCHAR(1000) NULL;
