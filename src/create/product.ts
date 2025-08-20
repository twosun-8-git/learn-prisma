import argon2 from "argon2";

import { p } from "../lib/prisma";

export async function createProduct() {
  const result = await p.product.create({
    data: {
      name: "USA ブレンド",
      price: 1000,
      stock: 50,
    },
  });
  return result;
}
