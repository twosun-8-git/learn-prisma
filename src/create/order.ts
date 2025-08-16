import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createOrder() {
  const result = await p.order.create({
    // 登録するデータ
    data: {
      userId: 19,
      totalAmount: 700,
      status: "pending",
      orderItems: {
        create: [
          {
            productId: 16,
            quantity: 1,
            price: 700,
          },
        ],
      },
    },
    // 返却するデータ
    include: {
      orderItems: {
        include: {
          product: true, // 商品情報も一緒に取得
        },
      },
      user: true, // ユーザー情報も一緒に取得
    },
  });
  return result;
}

async function main() {
  const args = process.argv.slice(2);
  const functionName = args[0];

  const arg1 = args[1];

  switch (functionName) {
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
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
