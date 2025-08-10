import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 単一ユーザー取得
async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

// 単一ユーザー & 注文状を況取得
async function getUserWithOrders(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    // 注文情報を含める
    // order テーブルのレコードを取得(リレーション: userId)
    include: {
      orders: {
        // orderItems テーブルのレコードを取得(リレーション: orderId)
        include: {
          orderItems: {
            // orderItems テーブルのproductを取得(リレーション状態のレコードは明示的に指定が必要)
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
  return user;
}

// 複数ユーザー取得
async function getUsers(sex: string) {
  const users = await prisma.user.findMany({
    where: {
      sex: sex,
    },
  });
  console.log(users);
  return users;
}

// 全ユーザー取得
async function getAllUsers() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  return allUsers;
}

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
