import { p } from "../lib/prisma";

/** 検索*/
export async function getProductByName(name: string) {
  const result = await p.product.findMany({
    where: {
      name: {
        // contains: name, // 部分一致検索
        // startsWith: name, // 前方一致検索
        endsWith: name, // 後方一致検索
      },
    },
  });
  console.log(result);
  return result;
}
