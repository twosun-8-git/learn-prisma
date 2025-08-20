import argon2 from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { p } from "../lib/prisma";

export async function interactiveTransaction() {
  // ユーザー作成または取得を行う関数
  const createtUser = async () => {
    try {
      const user = await p.user.create({
        data: {
          email: "andy@example.com",
          name: "アンディ・ボガード",
          sex: "male",
          age: 26,
          password: await argon2.hash("password"),
        },
      });
      console.log("✅ SUCCESS:", user.name);
      return { user, isExist: false };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        console.log("🔄 このユーザーはすでに登録されています。");

        const existingUser = await p.user.findUnique({
          where: {
            email: "terry@example.com",
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        });

        if (!existingUser) {
          throw new Error("FAIL: 既存ユーザーの取得に失敗しました");
        }

        return { user: existingUser, isExist: true };
      } else {
        throw e;
      }
    }
  };

  const createOrder = async (userId: number) => {
    const order = await p.order.create({
      data: {
        userId: userId,
        totalAmount: 2800,
        status: "delivered",
        orderItems: {
          create: [
            {
              productId: 15,
              quantity: 1,
              price: 2800,
            },
          ],
        },
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });
    return order;
  };

  // インタラクティブトランザクションでユーザーと注文を同時作成
  const result = await p.$transaction(async () => {
    // 1. ユーザーを作成または取得
    const { user, isExist } = await createtUser();

    // 既存ユーザーの場合は早期リターン
    if (isExist) {
      return {
        user,
        order: null,
        message: "既存ユーザーのため注文は作成されませんでした",
      };
    }

    // 2. 新規ユーザーの場合のみ注文を作成
    const order = await createOrder(user.id);

    return { user, order };
  });

  return result;
}
