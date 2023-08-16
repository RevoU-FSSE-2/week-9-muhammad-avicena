export interface TransactionInterface {
    transactionId: number;
    userId: number;
    productName: string;
    productQuantity: number;
    productPrice: number;
};

export const transactionData: TransactionInterface[] = [
    {
        transactionId: 1,
        userId: 2,
        productName: "Coklat",
        productQuantity: 2,
        productPrice: 10000,
    },
    {
        transactionId: 2,
        userId: 1,
        productName: "Jagung",
        productQuantity: 3,
        productPrice: 30000,
    },
    {
        transactionId: 3,
        userId: 1,
        productName: "Cabe",
        productQuantity: 5,
        productPrice: 75000,
    },
    {
        transactionId: 4,
        userId: 2,
        productName: "Ayam",
        productQuantity: 1,
        productPrice: 15000,
    },
];
