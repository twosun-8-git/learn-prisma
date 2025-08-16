import { p } from "../lib/prisma";
import { createUser, createUsers } from "./user";
import { createOrder } from "./order";

async function main() {
  const args = process.argv.slice(2);
  const functionName = args[0];
  switch (functionName) {
    case "createUser":
      console.log(await createUser());
      break;
    case "createUsers":
      console.log(await createUsers());
      break;
    case "createOrder":
      console.log(await createOrder());
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
