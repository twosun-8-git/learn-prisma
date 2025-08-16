import { prisma } from ".";

/** 指定された数のユーザー取得*/
export async function getTakeUsers(take: number) {
  const takeUsers = await prisma.user.findMany({
    take: take,
  });
  console.log(takeUsers);
  return takeUsers;
}
