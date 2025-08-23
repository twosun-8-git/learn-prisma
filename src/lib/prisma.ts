import { PrismaClient } from "@prisma/client";

let queryCount = 0;
let queryLogs: string[] = [];
let queryTotalDuration = 0;

// PrismaClientのインスタンスを作成
export const p = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "stdout", level: "warn" },
    { emit: "stdout", level: "error" },
  ],
});

// クエリが実行されたときに呼び出される
p.$on("query", (e) => {
  queryCount++;

  queryLogs.push(
    `クエリ ${queryCount}: ${e.duration}ms - ${e.query.substring(0, 120)}...`
  );

  queryTotalDuration += e.duration;
});

// クエリ数を表示する関数
export function showQueryStats() {
  console.log("\n" + "━".repeat(80));
  console.log("🔍 クエリ実行ログ");
  console.log("━".repeat(80));
  console.log(queryLogs.join("\n"));
  console.log("━".repeat(80));
  console.log(`📈 クエリ実行数: ${queryCount}回`);
  console.log(`⏱️  総実行時間: ${queryTotalDuration}ms`);
  console.log(
    `📊 平均実行時間: ${
      queryCount > 0
        ? Math.round((queryTotalDuration / queryCount) * 100) / 100
        : 0
    }ms`
  );
  console.log("━".repeat(80));
  queryCount = 0;
  queryLogs = [];
  queryTotalDuration = 0;
  return;
}
