export interface Wallet {
  getAccountId: () => string;
  isSignedIn: () => boolean;
}

export interface FundRegistry {
  getFundIndex: () => Promise<string[]>;
  createFund: (subaccount: string) => Promise<void>;
  deleteFund: (subaccount: string) => Promise<void>;
}

export interface FundCore {
  owner: string;
  unrestricted_balance: string;
}

export interface PayerPayeeCore {
  balance: string;
}

export enum UserRole {
  Payer,
  Payee,
}

export interface Fund {
  contractId: string;
  getFund: () => Promise<FundCore>;
  getPayers: () => Promise<string[]>;
  getPayees: () => Promise<string[]>;
  getPayer: (accountId: string) => Promise<PayerPayeeCore>;
  getPayee: (accountId: string) => Promise<PayerPayeeCore>;
  createPayers: (accountIds: string[], balance: string) => Promise<void>;
  createPayees: (accountIds: string[], balance: string) => Promise<void>;
  deletePayers: (accountIds: string[]) => Promise<void>;
  deletePayees: (accountIds: string[]) => Promise<void>;
  setUnrestrictedBalance: (amount: string) => Promise<void>;
  setPayerBalance: (accountId: string, amount: string) => Promise<void>;
  setPayeeBalance: (accountId: string, amount: string) => Promise<void>;
  transfer: (recipient: string, amount: string) => Promise<void>;
}
