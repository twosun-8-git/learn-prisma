import { Prisma } from "@prisma/client";

export const orders: Prisma.OrderCreateInput[] = [
  {
    user: { connect: { id: 50 } },
    totalAmount: 5400,
    status: "delivered",
  },
  {
    user: { connect: { id: 51 } },
    totalAmount: 3200,
    status: "shipped",
  },
  {
    user: { connect: { id: 52 } },
    totalAmount: 2800,
    status: "processing",
  },
  {
    user: { connect: { id: 50 } },
    totalAmount: 7000,
    status: "pending",
  },
  {
    user: { connect: { id: 53 } },
    totalAmount: 4300,
    status: "delivered",
  },
  {
    user: { connect: { id: 54 } },
    totalAmount: 3500,
    status: "cancelled",
  },
  {
    user: { connect: { id: 55 } },
    totalAmount: 1400,
    status: "delivered",
  },
  {
    user: { connect: { id: 51 } },
    totalAmount: 9300,
    status: "processing",
  },
];
