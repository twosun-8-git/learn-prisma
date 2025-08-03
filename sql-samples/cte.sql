/**
  CTE ( Common Table Expression )
  - 「共通テーブル式」と呼ばれる機能で、一時的な結果セットを定義して、同じクエリ内で再利用できる仕組み
*/

-- CTEなし。サブクエリ。各ユーザーと、そのユーザーの注文総数を表示するクエリを書いてください。
SELECT
	id,
	name,
	email,
	(SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id ) AS order_count
FROM users u;

-- CTEあり。
WITH user_orders AS (
    SELECT
        user_id,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
)
SELECT
    u.id,
    u.name,
    u.email,
    COALESCE(uo.order_count, 0) AS order_count -- COALESCE -> もし NULL なら 0 を返す
FROM users u
LEFT JOIN user_orders uo ON u.id = uo.user_id;

- CTEを使って、価格が1500円以上の商品の名前と価格を取得してください。
WITH products_price AS (
    SELECT *
    FROM products
    WHERE price >= 1500
)
SELECT
    id,
    name,
    price
FROM products_price

-- CTEを使って、各ユーザーの総注文金額を計算し、5000円以上のユーザーのみを表示してください。
WITH over_5000_order_user_ids AS(
	SELECT
		user_id,
		SUM(total_amount) AS sum_total_amount
	FROM orders
	GROUP BY user_id
	HAVING sum_total_amount >= 5000
)
SELECT
	ov.user_id,
	u.name,
	ov.sum_total_amount
FROM over_5000_order_user_ids ov
LEFT JOIN users u ON u.id = ov.user_id;

-- CTEを2つ使って、「高額商品（2000円以上）」と「配送済み注文」を定義し、高額商品が含まれる配送済み注文を表示してください。
WITH
high_price_products AS ( -- 高額商品（2000円以上
  SELECT id, name, price
  FROM products
  WHERE price >= 2000
),
delivered_orders AS ( -- 配送済み注文
  SELECT order_id, product_id
  FROM order_items oi
  JOIN orders o ON o.id = oi.order_id
  WHERE o.status = 'delivered'
)
SELECT
  hpp.name,
  hpp.price
FROM high_price_products hpp
JOIN delivered_orders do ON hpp.id = do.product_id;

-- 1から10までの数字を生成する再帰CTEを作成してください
WITH RECURSIVE numbers AS (
    -- 初期値：1から開始
    SELECT 1 AS n

    UNION ALL

    -- 再帰：前の数字に+1
    SELECT n + 1
    FROM numbers
    WHERE n < 10  -- 10まで繰り返す
)
SELECT n FROM numbers;

-- CTEを使って、「商品別の売上ランキング」を作成し、上位3位までを表示してください。
  WITH product_sales AS (
    SELECT
        oi.product_id,
        p.name,
        SUM(oi.quantity * oi.price) AS total_sales -- 商品別の売上
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    JOIN orders o ON o.id = oi.order_id
    WHERE o.status = 'delivered'
    GROUP BY oi.product_id, p.name
)
SELECT
    product_id,
    name,
    total_sales,
    RANK() OVER (ORDER BY total_sales DESC) AS ranking -- ランキング。RANK()は同順位がある場合、次の順位をスキップする
FROM product_sales
ORDER BY total_sales DESC
LIMIT 3;
