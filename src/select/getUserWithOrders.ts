import { prisma } from ".";

/** 単一ユーザー & 注文状を含む取得（ include ）*/
export async function getUserWithOrders(email: string) {
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
