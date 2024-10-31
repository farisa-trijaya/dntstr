-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(60) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(1000) NULL,
    `permissions` VARCHAR(4000) NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'GENERAL') NOT NULL DEFAULT 'GENERAL',
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `verified_purchase` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `last_login` DATETIME(0) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` DATETIME(0) NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `uuid`(`uuid`),
    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provider_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `provider` ENUM('GOOGLE') NOT NULL,
    `provider_user_id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `provider_user_id`(`provider_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `sid` VARCHAR(255) NOT NULL,
    `start_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_time` DATETIME(3) NULL,
    `access_token` VARCHAR(4000) NOT NULL,
    `csrf_token` VARCHAR(255) NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `ip_address` VARCHAR(191) NOT NULL,
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `sid`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token_id` VARCHAR(60) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `token_id`(`token_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `one_time_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token_id` VARCHAR(60) NOT NULL,
    `token_type` ENUM('RESET') NULL,
    `expires_at` DATETIME(0) NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `token_id`(`token_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `sku` VARCHAR(255) NOT NULL,
    `orderID` VARCHAR(100) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `postal_code` VARCHAR(50) NOT NULL,
    `address_1` TEXT NOT NULL,
    `address_2` TEXT NULL,
    `amount` DOUBLE NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `payerID` VARCHAR(255) NOT NULL,
    `paymentID` VARCHAR(255) NOT NULL,
    `paymentSource` VARCHAR(50) NOT NULL,
    `receipt_umber` VARCHAR(50) NULL,
    `order_status` ENUM('ORDER_PREPARED', 'ORDER_SHIPPED', 'ORDER_ON_THE_WAY', 'ORDER_COMPLETED') NOT NULL DEFAULT 'ORDER_PREPARED',
    `tracking_info` JSON NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `date_created` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `orderID`(`orderID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `provider_users` ADD CONSTRAINT `provider_users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
