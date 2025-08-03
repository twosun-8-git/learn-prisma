-- テーブルを指定して全データ取得
SELECT *
FROM users

-- テーブルを指定して特定の列のデータ取得
SELECT name, email
FROM users;

/** ¥WHERE  */
-- price が 2000 以上のデータを取得
SELECT *
FROM products
WHERE price > 2000;

-- 在庫数が50個未満の商品を取得してください
SELECT *
FROM products
WHERE stock < 50;

-- ステータスが'pending'の注文を取得してください
SELECT *
FROM orders
WHERE status = "pending";

-- 注文金額が3000円を超える注文を取得してください
SELECT *
FROM orders
WHERE total_amount > 3000;

/** AND OR LIKE */
-- 価格が1500円以上かつ在庫が40個以上の商品を取得してください
SELECT *
FROM products
WHERE price >= 1500 AND stock >= 40

SELECT *
FROM orders
WHERE status = "delivered" OR status = "shipped";

-- 商品名に"ブラジル"が含まれる商品を取得してください
SELECT *
FROM products
WHERE name LIKE "%ブラジル%"

-- 商品名が"ブ"で始まる商品を取得してください
SELECT *
FROM products
WHERE name LIKE "ブ%"

-- 商品名が"ド"で終わる商品を取得してください
SELECT *
FROM products
WHERE name LIKE "%ド"

-- 商品名が「何文字でも＋エ＋1文字＋ド」で終わる商品を取得してください
SELECT *
FROM products
WHERE name LIKE "%エ_ド"

/** ORDER BY */
-- 商品を価格の高い順に並び替えて取得してください
SELECT *
FROM products
ORDER BY price DESC

-- 注文を注文金額の低い順に並び替えて取得してください
SELECT *
FROM orders
ORDER BY total_amount ASC

-- 商品を在庫数の多い順、同じ在庫数の場合は価格の安い順で並び替えてください
-- stock DESCを実施後にprice ASCを実施する
SELECT *
FROM products
ORDER BY stock DESC, price ASC;

-- ユーザーを名前のアルファベット順（昇順）で並び替えて取得してください
SELECT *
FROM users
ORDER By name ASC

-- グループ化: COUNT(*) = nullも対象になる。COUNT(status) = nullは対象にならない。
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status;

-- HAVING: グループへの条件付け
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status
HAVING count > 5;

-- 各注文ステータスごとの件数を取得してください
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status;

-- 各ユーザーの注文総額を取得してください
SELECT user_id, SUM(total_amount) AS total_amount
FROM orders
GROUP BY user_id;

-- 各ユーザーの注文回数を取得してください
SELECT user_id, COUNT(*) AS count
FROM orders
GROUP BY user_id;

-- 注文回数が8回以上のユーザーの注文回数を取得してください
SELECT user_id, COUNT(*) AS count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 8;

--各商品が注文された回数を取得してください
SELECT product_id, COUNT(*) AS count
FROM order_items
GROUP BY product_id;

/** LIMIT / OFFSET */
-- LIMIT: 取得する行数を指定
SELECT *
FROM orders
LIMIT 3;

-- OFFSET
SELECT *
FROM orders
LIMIT 5 OFFSET 1;

-- 注文テーブルから最新の10件の注文を取得してください
SELECT *
FROM orders
ORDER BY created_at DESC
LIMIT 10;

--ユーザーテーブルから2番目の10人のユーザーを取得してください
SELECT *
FROM users
LIMIT 10 OFFSET 10;

-- 商品テーブルから価格が高い順に上位5件の商品を取得してください
SELECT *
FROM products
ORDER BY price DESC
LIMIT 5;

-- 注文テーブルから最も古い注文を5件取得してください
SELECT *
FROM orders
ORDER BY created_at ASC
LIMIT 5;

-- 各ページに15件表示する場合、3ページ目の注文を取得してください
SELECT *
FROM orders
LIMIT 15 OFFSET 30;

/** BETWEEN */
SELECT * FROM products
WHERE price BETWEEN 1500 AND 2000;
-- ↑ 下記と同じ結果 ↓
SELECT * FROM products
WHERE price >= 1500 AND price <= 2000;

/** IN */
SELECT * FROM products
WHERE id IN (17, 18, 19);
-- ↑ 下記と同じ結果 ↓
SELECT * FROM products
WHERE id = 17 OR id = 18 OR id = 19;

-- 価格が1000円〜1800円の商品名と価格を取得してください。
SELECT name, price
FROM products
WHERE price BETWEEN 1000 AND 1800;

-- 商品ID 20, 21, 22 の商品情報を取得してください。
SELECT *
FROM products
WHERE id IN (20, 21,22);

-- 注文ステータスが 'delivered', 'shipped', 'processing' のいずれかの注文を取得してください。
SELECT *
FROM orders
WHERE status IN ('delivered', 'shipped', 'processing');

-- 合計金額が3000円〜5000円の注文IDと合計金額を取得してください。
SELECT id, total_amount
FROM orders
WHERE total_amount BETWEEN 3000 AND 5000;

-- ユーザーID 11, 12, 13 の注文で、合計金額が2000円〜4000円の範囲にある注文を取得してください。
SELECT *
FROM orders
WHERE user_id IN(11,12,13)
AND total_amount BETWEEN 2000 AND 4000;


-- 型の変換
SELECT
  name,
  CONCAT('￥', CAST(price AS CHAR)) AS casted_price, -- price(INT)をCHARに変換してCONCATで文字列結合
  CONCAT('￥', CONVERT(price, CHAR)) AS converted_price
FROM products;
