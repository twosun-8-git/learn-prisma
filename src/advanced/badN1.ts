import { p } from "../lib/prisma";

// ❌ N+1問題が発生するコード
export async function getOrdersWithProductsBad() {
  console.log("=== N+1問題が発生するパターン ===");

  // 1. 最初に全ての注文を取得（1回のクエリ）
  const orders = await p.order.findMany();
  console.log(`取得した注文数: ${orders.length}`);

  // 2. 各注文に対して商品情報を個別に取得（N回のクエリ）
  for (const order of orders) {
    const orderItems = await p.orderItem.findMany({
      where: { orderId: order.id },
      include: {
        product: true, // 商品情報も含める
      },
    });

    console.log(`注文ID ${order.id}: 商品数 ${orderItems.length}`);
    orderItems.forEach((item) => {
      console.log(`  - ${item.product.name}: ${item.quantity}個`);
    });
  }
}
