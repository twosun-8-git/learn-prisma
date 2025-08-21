import { p } from "../lib/prisma";

/** 全ユーザー取得*/
export async function getAllUsers() {
  const allUsers = await p.user.findMany();
  return allUsers;
}
