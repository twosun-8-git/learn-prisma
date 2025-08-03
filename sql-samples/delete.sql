-- user_id 12のユーザーを削除してください。
DELETE FROM users
WHERE id = 12;

-- product_id 24（ペルー オーガニック）の商品を削除してください。
DELETE FROM products
WHERE id = 24;

-- 「cancelled」ステータスの注文を全て削除してください。
DELETE FROM orders
WHERE status = 'cancelled';

-- 在庫が0個の商品を全て削除してください。
DELETE FROM products
WHERE stock = 0;

-- order_id 7に関連する注文明細（order_items）を全て削除してください。
DELETE FROM order_items
WHERE order_id = 7;