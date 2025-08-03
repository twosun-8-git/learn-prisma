/** Correlated x Sub Query
  ・相関サブクエリ
  ・メインクエリとサブクエリはそれぞれ独立して実行される
  ・外側のクエリの各行に対して、内側のサブクエリが実行される
*/

-- 各ユーザーの平均注文金額より高い注文を取得し
SELECT
    o.user_id,
    o.total_amount,
    u.name
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.total_amount > (
    SELECT AVG(total_amount)
    FROM orders sub_o
    WHERE sub_o.user_id = o.user_id  -- 相関部分：外側のuser_idを参照
);

-- 各商品について、その商品の平均注文数量より多く注文された注文項目を取得してください。
SELECT
    oi.order_id,
    oi.product_id,
    p.name,
    oi.quantity
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE oi.quantity > (
    SELECT AVG(quantity)
    FROM order_items sub_oi
    WHERE sub_oi.product_id = oi.product_id  -- 相関部分：同じ商品の平均を計算
);

-- 各ユーザーの最新の注文日より前の注文をすべて取得してください。
SELECT *
FROM orders o
LEFT JOIN user u ON o.user_id = u.id
WHERE o.created_at < (
    SELECT MAX(created_at)
    FROM orders sub_o
    WHERE sub_o.user_id = o.user_id
);

-- 各ユーザーについて、そのユーザーの総注文回数を表示してください
SELECT
    u.id,
    u.name,
    (SELECT COUNT(*)
     FROM orders sub_o
     WHERE sub_o.user_id = u.id) as total_orders
FROM users u;
