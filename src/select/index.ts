import { PrismaClient, orders_status } from "@prisma/client";

import { getUser } from "./getUser";
import { getUserWithOrders } from "./getUserWithOrders";
import { getUserWithOrdersSelect } from "./getUserWithOrdersSelect";
import { getUsers } from "./getUsers";
import { getAllUsers } from "./getAllUsers";
import { getTakeUsers } from "./getTakeUsers";
import { getProductByName } from "./getProductByName";
import {
  getProductAnd,
  getProductOr,
  getProductIn,
} from "./getProductConditions";
import {
  usersHasOrders,
  usersEmptyOrders,
  usersEveryOrders,
  usersEveryOrdersFirst,
} from "./getUsersWithOrderStatus";

export const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const functionName = args[0];

  const arg1 = args[1];

  switch (functionName) {
    case "getUser":
      if (!arg1) {
        console.log("❌ エラー: メールアドレスを指定してください");
        console.log(
          "使用方法: npx ts-node src/select/basic.ts getUser [メールアドレス]"
        );
        console.log(
          "例: npx ts-node src/select/basic.ts getUser yamada@example.com"
        );
        return;
      }
      console.log(await getUser(arg1));
      break;
    case "getUserWithOrders":
      if (!arg1) {
        console.log("❌ エラー: メールアドレスを指定してください");
        console.log(
          "使用方法: npx ts-node src/select/basic.ts getUser [メールアドレス]"
        );
        console.log(
          "例: npx ts-node src/select/basic.ts getUser yamada@example.com"
        );
        return;
      }
      console.dir(await getUserWithOrders(arg1), { depth: null });
      break;
    case "getUserWithOrdersSelect":
      if (!arg1) {
        console.log("❌ エラー: メールアドレスを指定してください");
        console.log(
          "使用方法: npx ts-node src/select/basic.ts getUserWithOrdersSelect [メールアドレス]"
        );
        console.log(
          "例: npx ts-node src/select/basic.ts getUserWithOrdersSelect yamada@example.com"
        );
        return;
      }
      console.dir(await getUserWithOrdersSelect(arg1), { depth: null });
      break;
    case "getUsers":
      if (!arg1) {
        console.log("❌ エラー: male or female  を指定してください");
        console.log(
          "使用方法: npx ts-node src/select/basic.ts getUsers [male]"
        );
        console.log("例: npx ts-node src/select/basic.ts getUsers male");
        return;
      }
      console.log(await getUsers(arg1));
      break;
    case "getAllUsers":
      console.log(await getAllUsers());
      break;
    case "getTakeUsers":
      if (!arg1) {
        console.log("❌ エラー: male or female  を指定してください");
        console.log(
          "使用方法: npx ts-node src/select/basic.ts getUsers [male]"
        );
        console.log("例: npx ts-node src/select/basic.ts getUsers male");
        return;
      }

      if (isNaN(Number(arg1))) {
        console.log("❌ エラー: 数値を指定してください");
        console.log(
          "使用方法: npx ts-node src/select/basic.ts getTakeUsers [数値]"
        );
        console.log("例: npx ts-node src/select/basic.ts getTakeUsers 3");
        return;
      }
      console.log(await getTakeUsers(Number(arg1)));
      break;
    case "getProductByName":
      console.log(await getProductByName(arg1 || ""));
      break;
    case "getProductAnd":
      console.log(await getProductAnd());
      break;
    case "getProductOr":
      console.log(await getProductOr());
      break;
    case "getProductIn":
      console.log(await getProductIn());
      break;
    case "usersHasOrders":
      console.log(await usersHasOrders());
      break;
    case "usersEmptyOrders":
      console.log(await usersEmptyOrders());
      break;
    case "usersEveryOrders":
      if (!arg1) {
        console.log("❌ エラー: ステータスを指定してください");
        console.log(
          "使用方法: npx ts-node src/select/basic.ts usersEveryOrders [ステータス]"
        );
        console.log(
          "例: npx ts-node src/select/basic.ts usersEveryOrders delivered"
        );
        return;
      }
      console.log(await usersEveryOrders(arg1 as orders_status));
      break;
    case "usersEveryOrdersFirst":
      if (!arg1) {
        console.log("❌ エラー: ステータスを指定してください");
        console.log(
          "使用方法: npx ts-node src/select/basic.ts usersEveryOrders [ステータス]"
        );
        console.log(
          "例: npx ts-node src/select/basic.ts usersEveryOrders delivered"
        );
        return;
      }
      console.log(await usersEveryOrdersFirst(arg1 as orders_status));
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
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
