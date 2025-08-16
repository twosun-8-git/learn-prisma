import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 単一ユーザー登録
async function createUser() {
  const result = await prisma.user.create({
    data: {
      email: "tanteigoro@example.com",
      name: "探偵吾郎",
      sex: "female",
      password: await argon2.hash("password"),
    },
  });
  return result;
}

// 複数ユーザー登録
async function createUsers() {
  const result = await prisma.user.createMany({
    data: [
      {
        name: "高橋美咲",
        email: "takahashi@example.com",
        sex: "female",
        age: 25,
        password: await argon2.hash("password"),
      },
      {
        name: "渡辺健一",
        email: "watanabe@example.com",
        sex: "male",
        age: 32,
        password: await argon2.hash("password"),
      },
      {
        name: "中村由美",
        email: "nakamura@example.com",
        sex: "female",
        age: 29,
        password: await argon2.hash("password"),
      },
    ],
  });
  return result;
}

async function main() {
  const args = process.argv.slice(2);
  const functionName = args[0];

  const arg1 = args[1];

  switch (functionName) {
    case "createUser":
      console.log(await createUser());
      break;
    case "createUsers":
      console.log(await createUsers()); // 同時に複数登録した場合は件数が返ってくる。
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
