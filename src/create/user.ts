import argon2 from "argon2";

import { p } from "../lib/prisma";

// 単一ユーザー登録
export async function createUser() {
  const result = await p.user.create({
    data: {
      email: "arigataro@example.com",
      name: "有賀太郎",
      sex: "male",
      age: 25,
      password: await argon2.hash("password"),
    },
  });
  return result;
}

// 複数ユーザー登録
export async function createUsers() {
  const result = await p.user.createMany({
    data: [
      {
        name: "高橋美咲",
        email: "takahashi@example.com",
        sex: "female",
        age: 25,
        password: await argon2.hash("password"),
      },
      {
        name: "渡辺健一",
        email: "watanabe@example.com",
        sex: "male",
        age: 32,
        password: await argon2.hash("password"),
      },
      {
        name: "中村由美",
        email: "nakamura@example.com",
        sex: "female",
        age: 29,
        password: await argon2.hash("password"),
      },
    ],
  });
  return result;
}
