import { p } from "../lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function basicTransaction() {
  const deleteUser = p.user.delete({
    where: {
      id: 23,
    },
  });

  const deleteProduct = p.product.delete({
    where: {
      id: 22,
    },
  });

  /**
   * deleteUserでデータが見つからない場合、deleteProductは実行されずロールバックされる。
   * deleteUser, deleteProductそれぞれに存在するIDと存在しないIDを指定して検証してみよう。
   */
  const transaction = async () => {
    try {
      await p.$transaction([deleteUser, deleteProduct]);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        console.log(
          `⚠️ データが見つかりませんでした。モデル："${e.meta?.modelName}"`
        );
        console.error(e);
        return null;
      } else {
        throw e;
      }
    }
  };

  const result = await transaction();
  return result;
}
