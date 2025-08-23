import { Prisma } from "@prisma/client";

export const orderItems: Prisma.OrderItemCreateInput[] = [
  // 注文ID: 101 (山田　太郎の注文 - 5400円)
  {
    order: { connect: { id: 101 } },
    product: { connect: { id: 23 } }, // エチオピア ブレンド
    quantity: 2,
    price: 1800,
  },
  {
    order: { connect: { id: 101 } },
    product: { connect: { id: 26 } }, // グアテマラ リッチ
    quantity: 1,
    price: 1900,
  },

  // 注文ID: 105 (鈴木　花子の注文 - 3200円)
  {
    order: { connect: { id: 105 } },
    product: { connect: { id: 24 } }, // コロンビア マイルド
    quantity: 2,
    price: 1600,
  },

  // 注文ID: 106 (岩井　次郎の注文 - 2800円)
  {
    order: { connect: { id: 106 } },
    product: { connect: { id: 29 } }, // ハワイ スムース
    quantity: 1,
    price: 2800,
  },

  // 注文ID: 107 (山田　太郎の2回目注文 - 7000円)
  {
    order: { connect: { id: 107 } },
    product: { connect: { id: 28 } }, // ジャマイカ プレミアム
    quantity: 2,
    price: 3500,
  },

  // 注文ID: 108 (小林　幸子の注文 - 4300円)
  {
    order: { connect: { id: 108 } },
    product: { connect: { id: 25 } }, // ブラジル サントス
    quantity: 1,
    price: 1400,
  },
  {
    order: { connect: { id: 108 } },
    product: { connect: { id: 27 } }, // ケニア フルーティー
    quantity: 1,
    price: 2000,
  },
  {
    order: { connect: { id: 108 } },
    product: { connect: { id: 30 } }, // ペルー オーガニック
    quantity: 1,
    price: 700,
  },

  // 注文ID: 102 (内田　大輔の注文 - キャンセル - 3500円)
  {
    order: { connect: { id: 102 } },
    product: { connect: { id: 28 } }, // ジャマイカ プレミアム
    quantity: 1,
    price: 3500,
  },

  // 注文ID: 104 (佐藤　綾香の注文 - 1400円)
  {
    order: { connect: { id: 104 } },
    product: { connect: { id: 25 } }, // ブラジル サントス
    quantity: 1,
    price: 1400,
  },

  // 注文ID: 103 (鈴木　花子の2回目注文 - 9300円)
  {
    order: { connect: { id: 103 } },
    product: { connect: { id: 23 } }, // エチオピア ブレンド
    quantity: 3,
    price: 1800,
  },
  {
    order: { connect: { id: 103 } },
    product: { connect: { id: 26 } }, // グアテマラ リッチ
    quantity: 1,
    price: 1900,
  },
  {
    order: { connect: { id: 103 } },
    product: { connect: { id: 30 } }, // ペルー オーガニック
    quantity: 2,
    price: 700,
  },
];
