import { Prisma } from "@prisma/client";

export const users: Prisma.UserCreateInput[] = [
  {
    name: "山田　太郎",
    email: "yamada@ex.com",
    sex: "male",
    age: 18,
    password: "1234",
  },
  {
    name: "鈴木　花子",
    email: "suzuki@ex.com",
    sex: "female",
    age: 20,
    password: "abcd",
  },
  {
    name: "岩井　次郎",
    email: "iwai@ex.com",
    sex: "male",
    age: 24,
    password: "5678",
  },
  {
    name: "小林　幸子",
    email: "kobayashi@ex.com",
    sex: "female",
    age: 28,
    password: "efgh",
  },
  {
    name: "内田　大輔",
    email: "uchida@ex.com",
    sex: "male",
    age: 31,
    password: "9098a",
  },
  {
    name: "佐藤　綾香",
    email: "satou@ex.com",
    sex: "female",
    age: 44,
    password: "ijkl",
  },
];
