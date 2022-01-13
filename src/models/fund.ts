import BN from "bn.js";
import { utils } from "near-api-js";

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

export interface FundContract {
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
  depositMoney: (amount: string) => Promise<void>;
}

export type buildFundContractType = (subaccount: string) => FundContract;

export class FundContractNear implements FundContract {
  constructor(
    public contractId: string,
    private contract: any,
    private gas: BN,
  ) {}

  getFund(): Promise<FundCore> {
    return this.contract.get_fund();
  }

  getPayers(): Promise<string[]> {
    return this.contract.get_payers();
  }

  getPayees(): Promise<string[]> {
    return this.contract.get_payees();
  }

  getPayer(accountId: string): Promise<PayerPayeeCore> {
    return this.contract.get_payer({ accountId });
  }

  getPayee(accountId: string): Promise<PayerPayeeCore> {
    return this.contract.get_payee({ accountId });
  }

  createPayers(accountIds: string[], balance: string): Promise<void> {
    return this.contract.create_payers({ accountIds, balance }, this.gas);
  }

  createPayees(accountIds: string[], balance: string): Promise<void> {
    return this.contract.create_payees({ accountIds, balance }, this.gas);
  }

  deletePayers(accountIds: string[]): Promise<void> {
    return this.contract.delete_payers({ accountIds }, this.gas);
  }

  deletePayees(accountIds: string[]): Promise<void> {
    return this.contract.delete_payees({ accountIds }, this.gas);
  }

  setUnrestrictedBalance(amount: string): Promise<void> {
    return this.contract.set_unrestricted_balance({ amount }, this.gas);
  }

  setPayerBalance(accountId: string, amount: string): Promise<void> {
    return this.contract.set_payer_balance({ accountId, amount }, this.gas);
  }

  setPayeeBalance(accountId: string, amount: string): Promise<void> {
    return this.contract.set_payee_balance({ accountId, amount }, this.gas);
  }

  transfer(recipient: string, amount: string): Promise<void> {
    return this.contract.transfer({ recipient, amount });
  }

  depositMoney(amount: string): Promise<void> {
    return this.contract.deposit_money(
      {},
      this.gas,
      utils.format.parseNearAmount(amount) as BN,
    );
  }
}
