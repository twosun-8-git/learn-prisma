import { orders_status } from "@prisma/client";

import { prisma } from ".";

/** 注文があるユーザーを取得*/
export async function usersHasOrders() {
  const result = await prisma.user.findMany({
    where: {
      orders: {
        some: {}, // 何らかの注文がある
      },
    },
  });
  console.log(result);
  return result;
}

/** 注文がないユーザーを取得*/
export async function usersEmptyOrders() {
  const result = await prisma.user.findMany({
    where: {
      orders: {
        none: {}, // 注文がない
      },
    },
  });
  console.log(result);
  return result;
}

/** statusが"delivered"のユーザーを取得*/
export async function usersEveryOrders(status: orders_status) {
  const result = await prisma.user.findMany({
    where: {
      orders: {
        every: { status: status },
      },
    },
    include: {
      orders: {},
    },
  });
  console.log(result);
  return result;
}

/** statusが"delivered"の最初のユーザーを取得*/
export async function usersEveryOrdersFirst(status: orders_status) {
  const result = await prisma.user.findFirst({
    where: {
      orders: {
        every: { status: status },
      },
    },
  });
  console.log(result);
  return result;
}
