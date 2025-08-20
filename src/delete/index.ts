import { p } from "../lib/prisma";

import { deleteProduct } from "./delete";
import { deleteProductMany } from "./deleteMany";

async function main() {
  const args = process.argv.slice(2);

  const functionName = args[0];

  const arg1 = args[1];

  switch (functionName) {
    case "deleteProduct":
      if (!arg1) {
        console.log("❌ エラー: 引数を正しくを指定してください");
        console.log(
          "使用方法: npx ts-node src/delete/index.ts deleteProduct [商品ID]"
        );
        console.log("例: npx ts-node src/delete/index.ts deleteProduct 1");
        return;
      }
      console.log(await deleteProduct(Number(arg1)));
      break;
    case "deleteProductMany":
      console.log(await deleteProductMany());
      break;
    default:
      console.log(
        "使用方法: npx ts-node src/test.ts [function A | function B]"
      );
      console.log("例: npx ts-node src/select/basic.ts B");
  }
}

main()
  .then(async () => {
    console.log("✅ 処理が完了しました");
    await p.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await p.$disconnect();
    process.exit(1);
  });
