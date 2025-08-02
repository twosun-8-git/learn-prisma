import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 単一ユーザー取得
async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(user);
}

// 複数ユーザー取得
async function getUsers(sex: string) {
  const users = await prisma.user.findMany({
    where: {
      sex: sex,
    },
  });
  console.log(users);
}

// 全ユーザー取得
async function getAllUsers() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
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
      await getUser(arg1);
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
      await getUsers(arg1);
      break;
    case "getAllUsers":
      await getAllUsers();
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
