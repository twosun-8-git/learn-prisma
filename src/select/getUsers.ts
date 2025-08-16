import { prisma } from ".";

/** 複数ユーザー取得*/
export async function getUsers(sex: string) {
  const users = await prisma.user.findMany({
    where: {
      sex: sex,
    },
  });
  console.log(users);
  return users;
}
