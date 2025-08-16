import { Prisma } from "@prisma/client";
import { p } from "../lib/prisma";

type UpdateUserPayload = {
  id: number;
} & Prisma.UserUpdateInput;

export async function updateUser(payload: UpdateUserPayload) {
  const { id, ...data } = payload;

  const result = await p.user.update({
    where: { id },
    data,
  });
  console.log(result);
  return result;
}
