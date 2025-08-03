/**
  - INNER JOIN
    どちらか一方にしかないレコードは除外され、両方のテーブルに存在するレコードのみを結果に含める

  - LEFT JOIN, RIGHT JOIN
    一方のテーブルの全てのレコードを結果に含める。もう一方のテーブルに存在しないレコードはNULLで表示される

*/

/** INNER JOIN */
-- orders テーブルと users テーブルを結合
SELECT *
FROM orders o
INNER JOIN users u ON o.user_id = u.id;

-- orders テーブルと users テーブルを結合し必要なカラムのみ取得
SELECT o.id, o.total_amount, u.name, u.email
FROM orders o
INNER JOIN users u ON o.user_id = u.id;

-- 注文アイテムと商品情報を結合
SELECT oi.order_id, p.name , p.price, oi.quantity
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id;

-- 全ての注文について、注文ID、合計金額、ユーザー名を取得してください。
SELECT o.id, o.total_amount, u.name
FROM orders o
INNER JOIN users u ON o.user_id = u.id;

-- 注文ID 1の注文アイテムについて、商品名と数量を取得してください。
SELECT p.name, oi.quantity
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
WHERE oi.order_id = 1; -- 条件（注文ID 1）はWHERE文で指定

-- ユーザー名が「山田太郎」の注文について、注文ID、合計金額、注文ステータスを取得してください。
SELECT o.id, o.total_amount, o.status
FROM orders o
INNER JOIN users u ON o.user_id = u.id
WHERE u.name = '山田太郎';

-- 商品名が「エチオピア ブレンド」の全ての注文アイテムについて、注文ID、数量、価格を取得してください。
SELECT oi.order_id, oi.quantity, oi.price
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
WHERE p.name = 'エチオピア ブレンド';

-- 全ての注文について、注文ID、ユーザー名、商品名、数量を一覧で取得してください。
SELECT oi.order_id, u.name, p.name, oi.quantity
FROM order_items oi
INNER JOIN products p ON p.id = oi.product_id
INNER JOIN orders o ON o.id = oi.order_id -- user_id を取得するために orders テーブルを結合
INNER JOIN users u ON u.id = o.user_id; -- oユーザー名を取得するために users テーブルを結合し、ordersテーブルからuser_idを取得

/** LEFT JOIN */
-- 全ユーザーと、そのユーザーの注文情報を取得
-- 注文していないユーザーも表示される
SELECT
    u.name,
    u.email,
    o.total_amount,
    o.status
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
ORDER BY u.name;

/** 集約関数 & 非集約関数 */
SELECT
    u.id,
    u.name,
    u.email,
    AVG(o.total_amount) AS avg_amount -- 集約関数
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email -- 集約関数と非集約関数を同時使用する場合 GROUP BY でグループ化する必要がある
ORDER BY u.id;

-- 全ての商品と、その商品が注文された総数量を表示してください。一度も注文されていない商品も含めて表示してください。
SELECT
	p.id,
	p.name,
	p.price,
	SUM(oi.quantity) AS total_quantity
FROM products p
LEFT JOIN order_items oi ON p.id  = oi.product_id
GROUP BY p.id, p.name, p.price
ORDER BY p.id;

-- 全てのユーザーと、そのユーザーの注文総額を表示してください。注文をしていないユーザーの総額は0と表示してください。
SELECT
	u.id,
	u.name,
	u.email,
	IFNULL(SUM(o.total_amount), 0) AS total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name, u.email
ORDER BY u.id;

-- 全ての商品と、その商品の最高単価（注文時の価格）を表示してください。注文されていない商品も含めて表示してください。
SELECT
	p.id,
	p.name,
	IFNULL(MAX(oi.price), 0) AS max_price
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY p.id;

-- 全てのユーザーと、そのユーザーの「delivered」ステータスの注文件数を表示してください。該当する注文がないユーザーは0と表示してください。
SELECT
	u.id,
	u.name,
	COUNT(CASE WHEN o.status = 'delivered' THEN 1 END) AS delivered_count -- 注文ステータスが「delivered」の場合は1を返し、それ以外は0を返しカウントする
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY u.id;

/**
CASE WHEN 文について

CASE WHEN 文は、条件に応じて値を返すためのものです（if-else文）。
  - 構文
  CASE
    WHEN 条件1 THEN 値1
    WHEN 条件2 THEN 値2
    ELSE 値3
  END

  - Example
  SELECT
      name,
      price,
      CASE
          WHEN price >= 3000 THEN '高級'
          WHEN price >= 2000 THEN '中級'
          ELSE '標準'
      END AS price_category
  FROM products;
*/

/** CROSS JOIN: 2つのテーブルの全ての組み合わせを作成（直積）データ量が爆発的に増えるため、実用的でない場合が多い。テストデータ生成などで使用。*/
-- 例全ユーザーと全商品の組み合わせを作成（推奨商品リスト生成など）
SELECT
    u.name as user_name,
    p.name as product_name,
    p.price
FROM users u
CROSS JOIN products p
ORDER BY u.id, p.id;

/** SELF JOIN：同じテーブルを自分自身と結合。階層構造（上司・部下関係など）や同一テーブル内での比較などに使用 */
-- 同じ商品を注文した異なる注文を比較
SELECT
    oi1.order_id as order1,
    oi2.order_id as order2,
    p.name as product_name,
    oi1.quantity as quantity1,
    oi2.quantity as quantity2
FROM order_items oi1
INNER JOIN order_items oi2 ON oi1.product_id = oi2.product_id
INNER JOIN products p ON oi1.product_id = p.id
WHERE oi1.order_id < oi2.order_id  -- 重複を避ける
ORDER BY p.name, oi1.order_id;
