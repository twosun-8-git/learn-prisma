import { p } from "../lib/prisma";

export async function createOrder() {
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
