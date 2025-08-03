/** 集計関数 */

-- 行数をカウント
SELECT COUNT(*)
FROM users;

-- 重複を除いて行数をカウント
SELECT COUNT(DISTINCT status)
FROM orders;
--> 5 ('pending','processing','shipped','delivered','cancelled')

-- 合計
SELECT SUM(total_amount)
FROM orders;

-- 平均
SELECT AVG(price)
FROM products;

-- 最大値
SELECT MAX(price)
FROM products;

-- 最小値
SELECT MIN(price)
FROM products;

-- 注文の総件数を取得してください
SELECT COUNT(*)
FROM orders;

-- 全注文の合計金額を取得してください
SELECT SUM(total_amount)
FROM orders;

-- 商品の平均価格を取得してください
SELECT AVG(price)
FROM products;

-- 最も高い商品の価格を取得してください
SELECT MAX(price)
FROM products;

-- 注文ステータスの種類数を取得してください
SELECT COUNT(DISTINCT status)
FROM orders;
