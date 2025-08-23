-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_ibfk_1`;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
