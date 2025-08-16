import { prisma } from ".";

/** 単一ユーザー & 注文状を含む取得（ select ）*/
export async function getUserWithOrdersSelect(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      // 関連データを select で指定。カラムを明示的に指定する
      orders: {
        select: {
          id: true,
          totalAmount: true,
          status: true,
          orderItems: {
            select: {
              id: true,
              quantity: true,
              price: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return user;
}
