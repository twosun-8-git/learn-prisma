// TODO: .updateMany()を使用してみる
// TODO: .upsert()を使用してみる

import { updateUser } from "./updateUser";

import { p } from "../lib/prisma";

async function main() {
  const args = process.argv.slice(2);
  const functionName = args[0];

  const arg1 = args[1];
  const arg2 = args[2];
  const arg3 = args[3];

  switch (functionName) {
    case "updateUser":
      if (!arg1) {
        console.log("❌ エラー: 引数を正しくを指定してください");
        console.log(
          "使用方法: npx ts-node src/select/basic.ts getUser [メールアドレス]"
        );
        console.log(
          "例: npx ts-node src/select/basic.ts getUser yamada@example.com"
        );
        return;
      }
      if (isNaN(Number(arg1))) {
        console.log("❌ エラー: 数値を指定してください");
        console.log("使用方法: npx ts-node src/update/index.ts updateUser");
        console.log("例: npx ts-node src/select/basic.ts getTakeUsers 3");
        return;
      }

      const payload: {
        id: number;
        name?: string;
        email?: string;
      } = {
        id: Number(arg1),
      };
      if (arg2 !== undefined) payload.name = arg2;
      if (arg3 !== undefined) payload.email = arg3;

      console.log(await updateUser(payload));
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
