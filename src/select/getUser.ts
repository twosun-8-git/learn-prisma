import { prisma } from "../lib/prisma";

/** 単一ユーザー取得*/
export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}
