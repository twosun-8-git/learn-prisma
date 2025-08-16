import { prisma } from "../lib/prisma";

/** 全ユーザー取得*/
export async function getAllUsers() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  return allUsers;
}
