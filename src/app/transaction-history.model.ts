import { Person } from "./person.model";

export interface TransactionHistory {
    id: number;
    transactionDate: string;
    transactionType: string;
    transactionAmount: number;
    person: Person;
    subTotal: number;
    description: string;
    formattedSubTotal: string;
    formattedTransactionAmount: string;
  }