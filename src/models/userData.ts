export interface UserInterface {
  userId: number;
  username: string;
  email: string;
  password: string;
  balance: number;
};

export const userData: UserInterface[] = [
  {
    userId: 1,
    username: "admin",
    email: "admin@dev.com",
    password: "admin",
    balance: 10000000
  },
  {
    userId: 2,
    username: "user",
    email: "user@dev.com",
    password: "user",
    balance: 500000
  },
];
