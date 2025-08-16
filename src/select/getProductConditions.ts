import { p } from "../lib/prisma";

/** AND条件（全ての条件を満たす）*/
export async function getProductAnd() {
  const result = await p.product.findMany({
    where: {
      //「ケニア」と「ハワイ」の両方を含む商品を取得
      AND: [{ name: { contains: "ケニア" } }, { name: { contains: "ハワイ" } }],
    },
  });
  console.log(result);
  return result;
}

/** OR条件（片方を含む）*/
export async function getProductOr() {
  const result = await p.product.findMany({
    where: {
      //「ケニア」か「エチオピア」のどちらかを含む商品を取得
      OR: [
        { name: { contains: "ケニア" } },
        { name: { contains: "エチオピア" } },
      ],
    },
  });
  console.log(result);
  return result;
}

/** 完全一致のOR条件*/
export async function getProductIn() {
  const result = await p.product.findMany({
    where: {
      // 「ケニア フルーティー」、「ハワイ スムース」、「ペルー オーガニック」のどれかを含む商品を取得
      name: {
        in: ["ケニア フルーティー", "ハワイ スムース", "ペルー オーガニック"],
      },
    },
  });
  console.log(result);
  return result;
}
