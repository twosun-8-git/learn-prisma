import { p } from "../lib/prisma";

/** 複数ユーザー取得*/
export async function getUsers(sex: string) {
  const users = await p.user.findMany({
    where: {
      sex: sex,
    },
  });
  console.log(users);
  return users;
}
