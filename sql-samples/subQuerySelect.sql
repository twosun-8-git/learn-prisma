/** SELECT x Sub Query
  ・サブクエリは必ず () で囲む
  ・サブクエリ → メインクエリの順番で実行
*/

-- 各注文とそのユーザー名を表示
SELECT
    o.id,
    o.total_amount,
    (SELECT u.name FROM users u WHERE u.id = o.user_id) AS user_name
FROM orders o
LIMIT 5;


-- 各注文と全体平均との差を表示
SELECT
    id,
    total_amount,
    (SELECT AVG(total_amount) FROM orders) AS avg_amount,
    total_amount - (SELECT AVG(total_amount) FROM orders) AS difference
FROM orders
LIMIT 5;

-- 各商品と、全商品の平均価格を表示するクエリを書いてください。
SELECT
	name,
	price,
	(SELECT AVG(price) FROM products) AS avg_price
FROM products;

-- 各ユーザーと、そのユーザーの注文総数を表示するクエリを書いてください。
SELECT
	id,
	name,
	email,
	(SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id ) AS order_count
FROM users u;

-- 各注文と、その注文のアイテム数を表示するクエリを書いてください。
SELECT
	id AS orders_id,
	(SELECT name FROM users u WHERE u.id = o.user_id) AS user_name,
	(SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) AS order_item_count
FROM orders o;

-- 各商品と、その商品が含まれる注文の平均金額を表示するクエリを書いてください。
SELECT
	id,
	name,
	(
		SELECT AVG(o.total_amount) -- 平均を算出
        FROM orders o
        WHERE o.id IN ( -- order.id が 下記のサブクエリに含まれる
            SELECT oi.order_id
            FROM order_items oi
            WHERE oi.product_id = p.id -- 各商品と、その商品が含まれる注文
    	)
    ) AS avg_order_amount
FROM products p;

-- 各ユーザーと、そのユーザーの最新注文日、および全体の最新注文日との日数差を表示する
SELECT
	id,
	name,
	(SELECT MAX(created_at) FROM orders o WHERE o.user_id = u.id ) AS user_latest_date, -- 全ユーザーの最新注文日
	(SELECT MAX(created_at) FROM orders) AS all_users_latest_date,
	DATEDIFF( -- 日数差を算出（DATEDIFF('2025-07-28', '2025-07-25') = 3）
        (SELECT MAX(created_at) FROM orders),
        (SELECT MAX(created_at) FROM orders o WHERE o.user_id = u.id)
    ) AS day_difference
FROM users u;
