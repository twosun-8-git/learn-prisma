import { Prisma } from "@prisma/client";
import { p } from "../lib/prisma";

// 特定の性別のユーザーの年齢を一括更新
export async function updateUsersBySex(sex: string, ageIncrement: number) {
  const result = await p.user.updateMany({
    where: {
      sex: sex,
    },
    data: {
      age: {
        increment: ageIncrement, // 年齢を指定値分増加
      },
    },
  });
  console.log(`${result.count}件のユーザーの年齢を更新しました`);
  return result;
}
