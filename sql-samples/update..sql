-- user_id 11のユーザーのメールアドレスを「yamada_new@example.com」に変更してください。
UPDATE users SET email = 'yamada_new@example.com'
WHERE id = 11;

-- product_id 17（エチオピア ブレンド）の在庫を100個に更新してください。
UPDATE products SET stock = 100
WHERE id = 17;

-- order_id 1の注文金額を4000円に変更し、同時にstatusを「delivered」に変更してください。
UPDATE orders SET total_amount = 4000, status = 'delivered'
WHERE id = 1;

-- 全ての「pending」ステータスの注文を「processing」に一括変更してください。
UPDATE orders SET status = 'processing'
WHERE status = 'pending';

-- price（商品価格）が2000円以上の商品について、価格を10%値上げ（price * 1.1）してください。
UPDATE products SET price = (price *1.1)
WHERE price >= 2000
