-- DBを選択
USE coffee_shop;

-- ユーザーテーブル作成
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 商品テーブル作成
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 注文テーブル
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL, -- 10桁の数字で、小数点以下2桁まで格納可能なデータ型。10.11 のような数値を格納できる
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 注文明細テーブル
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    quantity INT NOT NULL,
    price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5), -- CHECK制約（1〜5の範囲でのみ入力可能）
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- 外部キー制約
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- ON DELETE CASCADE: 親テーブルのレコードが削除されたら、子テーブルの該当レコードも自動的に削除される
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,

    -- 複合UNIQUE制約（ user_id と product_id の組み合わせが一意 ）
    UNIQUE KEY unique_user_product (user_id, product_id)
);


-- テーブル確認
SHOW TABLES;

-- 各テーブルの構造確認
DESCRIBE users;
DESCRIBE products;
DESCRIBE orders;
DESCRIBE order_items;

-- 既存のカラム定義を変更する (ALTER TABLE テーブル名 MODIFY カラム名 新しいデータ型 制約;)
ALTER TABLE products MODIFY price INT CHECK (price > 0);

/**
ALTER TABLE products MODIFY price INT CHECK (price > 0); 後にDDLで確認した結果

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` int DEFAULT NULL,
  `stock` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `products_chk_1` CHECK ((`price` > 0)) → `products_chk_1` は自動生成される
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

*/
