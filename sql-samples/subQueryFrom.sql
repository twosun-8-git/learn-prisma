/** FROM x Sub Query
  ・サブクエリは必ず () で囲む
  ・一時的なテーブル（派生テーブル）を作成し、それをメインクエリで使用する
  ・サブクエリ → メインクエリの順番で実行
*/

-- 各ユーザーの注文統計を派生テーブルとして作成し、高額ユーザーを特定
SELECT user_id, avg_amount, order_count
FROM (
    SELECT -- 派生テーブルの作成
        user_id,
        AVG(total_amount) AS avg_amount,
        COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
) AS user_stats; -- 派生テーブル名

-- 商品の価格帯別の売上分析（派生テーブルで商品を価格帯別に分類）
SELECT price_category, COUNT(*) AS product_count, AVG(stock) AS avg_stock
FROM (
    SELECT
        stock,
        CASE
            WHEN price < 1500 THEN '低価格帯'
            WHEN price < 2500 THEN '中価格帯'
            ELSE '高価格帯'
        END AS price_category
    FROM products
) AS categorized_products
GROUP BY price_category;

-- ユーザーの注文回数を計算し、3回以上注文しているユーザーの情報を取得してください。
SELECT user_id, order_count
FROM (
  SELECT user_id , COUNT(*) AS order_count
    FROM orders
    GROUP BY user_id
) AS order_counts
WHERE order_count >= 3;


-- 商品の在庫を「少ない(50未満)」「普通(50以上100未満)」「豊富(100以上)」に分類し、各分類の商品数を取得してください。
SELECT stock_category, COUNT(*) AS product_count
FROM (
  SELECT stock,
    CASE
      WHEN stock < 50 THEN '少ない'
      WHEN stock < 100 THEN '普通'
      ELSE '豊富'
    END AS stock_category
    FROM products
) AS stock_category
GROUP BY stock_category;

-- 各ユーザーの最高注文金額を計算し、5000円以上の最高注文をしたユーザーを取得してください。
SELECT user_id, max_total_amount
FROM (
	SELECT
		user_id,
		MAX(total_amount) AS max_total_amount
	FROM orders
	GROUP BY user_id
) AS order_max_total_amount
WHERE max_total_amount >= 5000;

-- 注文ステータス別の平均金額を計算し、平均金額が3000円以上のステータスを取得してください。
SELECT status, avg_total_amount
FROM (
	SELECT
		status,
		AVG(total_amount) AS avg_total_amount
	FROM orders
	GROUP BY status
) AS orders_avg_total_amount
WHERE avg_total_amount >= 3000;

-- 商品価格の統計情報（最小、最大、平均）を派生テーブルとして作成し、各商品がどの統計値に最も近いかを判定してください。
-- ABS(x) は x の絶対値を返す関数。絶対値とは、数値の符号（+/-）を無視した、ゼロからの距離を表す値です。
SELECT
    p.name,
    p.price,
    min_price,
    max_price,
    avg_price,
    CASE
        WHEN ABS(p.price - stats.min_price) <= ABS(p.price - stats.avg_price) -- （商品価格 - 最小値）が（商品価格 - 平均値）より小さい
         AND ABS(p.price - stats.min_price) <= ABS(p.price - stats.max_price) THEN '最小値' -- （商品価格 - 最小値）が（商品価格 - 最大値）より小さい
        WHEN ABS(p.price - stats.avg_price) <= ABS(p.price - stats.max_price) THEN '平均値' -- （商品価格 - 平均値）が（商品価格 - 最大値）より小さい
        ELSE '最大値'
    END AS closest_to
FROM products p
CROSS JOIN (
    SELECT
        MIN(price) AS min_price,
        MAX(price) AS max_price,
        AVG(price) AS avg_price
    FROM products
) AS stats;
