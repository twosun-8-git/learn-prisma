/** WHERE x Sub Query
  ・サブクエリは必ず () で囲む
  ・WHERE句のサブクエリは1つの値だけを返す必要がある
  ・サブクエリ → メインクエリの順番で実行
*/
-- 平均価格より高い商品を取得
SELECT name, price
FROM products
-- WHERE price > 2003 と同じ。
WHERE price > (
    SELECT AVG(price) -- 2,003
    FROM products
);

-- 最も高額な注文と同じ金額の注文を取得
SELECT id, user_id, total_amount, status
FROM orders
WHERE total_amount = (
    SELECT MAX(total_amount) -- 7,000
    FROM orders
);

-- 最安値の商品と同じ価格の商品をすべて取得してください。
SELECT name, price
FROM products
WHERE price = (
    SELECT MIN(price) -- 1,000
    FROM products
);

-- ユーザーID 11の平均注文金額より高い注文をすべて取得してください。
SELECT id, user_id, total_amount, status
FROM orders
WHERE total_amount > (
  SELECT AVG(total_amount)
  FROM orders
  WHERE user_id = 11
);

-- 在庫が最も多い商品と同じ在庫数の商品を取得してください。
SELECT name, stock
FROM products
WHERE stock = (
  SELECT MAX(stock) -- 100
  FROM products
);

-- 'delivered'ステータスの注文の平均金額より高い金額の注文を取得してください。
SELECT *
FROM orders
WHERE total_amount > (
  SELECT AVG(total_amount)
  FROM orders
  WHERE status = 'delivered'
);

-- 商品テーブルの価格の中央値より高い商品を取得してください。
SELECT name, price
FROM products
WHERE price > (
    SELECT price
    FROM products
    ORDER BY price
    LIMIT 1 OFFSET 3  -- 8商品の中央値は4番目と5番目の平均、まず4番目を取得
);

-- ユーザー登録しているが一度も注文したことないユーザーを取得
SELECT * FROM users u -- ② が true の場合のみ実行
WHERE NOT EXISTS ( -- ② ①のクエリの存在チェック（存在しない場合 true）
	SELECT 1 FROM orders o WHERE u.id = o.user_id -- ① 該当するユーザーの注文がある場合は1を返す
)

-- ユーザー登録していて一度でも注文したことあるユーザーを取得
SELECT * FROM users u
WHERE EXISTS (
	SELECT 1 FROM orders o WHERE u.id = o.user_id
)

-- 少なくとも1つの「delivered」ステータスの注文があるユーザーのみを取得してください。
SELECT
    u.id,
    u.name
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id  -- ★ 相関部分：外側のユーザーIDを参照
    AND o.status = 'delivered'
);
