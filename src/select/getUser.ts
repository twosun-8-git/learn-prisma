import { p } from "../lib/prisma";

/** 単一ユーザー取得*/
export async function getUser(email: string) {
  const user = await p.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}
