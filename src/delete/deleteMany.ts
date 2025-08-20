import { p } from "../lib/prisma";

export async function deleteProductMany() {
  const result = await p.product.deleteMany({
    where: {
      stock: {
        lt: 5, // 在庫が 5 未満
      },
    },
  });
  return result;
}
