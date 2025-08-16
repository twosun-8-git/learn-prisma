import argon2 from "argon2";

import { p } from "../lib/prisma";

// 存在していれば更新なければ create する
export async function upsertUser(email: string, name: string) {
  const result = await p.user.upsert({
    where: { email }, // メールアドレスで検索
    update: { name }, // 更新するデータ
    create: {
      // メールアドレスで検索後に存在しなければ新規作成
      email,
      name,
      password: await argon2.hash("password"),
    },
  });

  console.log(result);
  return result;
}
