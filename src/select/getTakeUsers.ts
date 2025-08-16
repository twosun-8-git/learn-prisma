import { p } from "../lib/prisma";

/** 指定された数のユーザー取得*/
export async function getTakeUsers(take: number) {
  const takeUsers = await p.user.findMany({
    take: take,
  });
  console.log(takeUsers);
  return takeUsers;
}
