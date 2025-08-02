// sqls/insert.ts
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function main() {
  console.log("🌱 データベースにシードデータを投入中...");

  const sqlFiles = [
    // "users.sql",
    // "products.sql",
    // "orders.sql",
    "order_items.sql",
  ];

  try {
    for (const file of sqlFiles) {
      console.log(`📄 ${file} を実行中...`);
      // 文字セットを明示的に指定
      await execAsync(
        `docker exec -i coffee_shop_db mysql -u root -prootpassword --default-character-set=utf8mb4 coffee_shop < sqls/${file}`
      );
    }

    console.log("✅ シードデータの投入が完了しました");
  } catch (error) {
    console.error("❌ エラー:", error);
  }
}

main();
