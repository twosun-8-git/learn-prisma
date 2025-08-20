import { p } from "../lib/prisma";

export async function deleteProduct(id: number) {
  const result = await p.product.delete({
    where: {
      id: id,
    },
  });
  return result;
}
