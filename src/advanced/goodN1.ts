import { p } from "../lib/prisma";

// ✅ N+1問題を解決したコード
export async function getOrdersWithProductsGood() {
  console.log("=== N+1問題を解決したパターン ===");

  // includeを使って関連データを一度に取得
  const ordersWithItems = await p.order.findMany({
    include: {
      orderItems: {
        include: {
          product: true, // 商品情報も含める
        },
      },
      user: true, // ユーザー情報も含める
    },
  });

  console.log(`取得した注文数: ${ordersWithItems.length}`);

  // 取得したデータを表示
  ordersWithItems.forEach((order) => {
    console.log(
      `注文ID ${order.id} (${order.user.name}): 商品数 ${order.orderItems.length}`
    );
    order.orderItems.forEach((item) => {
      console.log(
        `  - ${item.product.name}: ${item.quantity}個 (¥${item.price})`
      );
    });
  });
}
