import argon2 from "argon2";

import { p, showQueryStats } from "../../src/lib/prisma";
import { users } from "./users";
import { products } from "./products";
import { orders } from "./orders";
import { orderItems } from "./orderItems";

async function main() {
  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await argon2.hash(user.password),
    }))
  );

  const resultUsers = await p.user.createMany({
    data: hashedUsers,
    skipDuplicates: true, // 重複するデータはスキップ モデルに（ユニーク制約が必要）
  });

  const resultProducts = await p.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  // 注文データを作成（ユーザーと商品が必要なので後で実行）
  const resultOrders = await Promise.all(
    orders.map(async (order) => {
      return await p.order.create({
        data: order,
      });
    })
  );

  // 注文項目データを作成（注文が必要なので最後に実行）
  const resultOrderItems = await Promise.all(
    orderItems.map(async (orderItem) => {
      return await p.orderItem.create({
        data: orderItem,
      });
    })
  );

  console.log("✅ ユーザー:", resultUsers);
  console.log("✅ 商品:", resultProducts);
  console.log("✅ 注文:", resultOrders.length, "件作成");
  console.log("✅ 注文項目:", resultOrderItems.length, "件作成");
}
main()
  .then(async () => {
    console.log("✅ 処理が完了しました");
    showQueryStats();
    await p.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await p.$disconnect();
    process.exit(1);
  });
