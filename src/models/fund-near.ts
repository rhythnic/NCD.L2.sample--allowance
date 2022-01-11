import { Contract, WalletConnection } from "near-api-js";
import BN from "bn.js";
import { FundCore, PayerPayeeCore } from "./blockchain";

export class FundNear {
  private client: any;
  public userIsOwner: boolean = false;

  constructor(
    public contractId: string,
    private wallet: WalletConnection,
    private gas: BN,
  ) {
    this.client = new Contract(wallet.account(), contractId, {
      viewMethods: [
        "get_fund",
        "get_payers",
        "get_payees",
        "get_payer",
        "get_payee",
      ],
      changeMethods: [
        "create_payers",
        "create_payees",
        "delete_payers",
        "delete_payees",
        "set_unrestricted_balance",
        "set_payer_balance",
        "set_payee_balance",
        "transfer",
      ],
    });
  }

  getFund(): Promise<FundCore> {
    return this.client.get_fund();
  }

  getPayers(): Promise<string[]> {
    return this.client.get_payers();
  }

  getPayees(): Promise<string[]> {
    return this.client.get_payees();
  }

  getPayer(accountId: string): Promise<PayerPayeeCore> {
    return this.client.get_payer({ accountId });
  }

  getPayee(accountId: string): Promise<PayerPayeeCore> {
    return this.client.get_payee({ accountId });
  }

  createPayers(accountIds: string[], balance: string): Promise<void> {
    return this.client.create_payers({ accountIds, balance }, this.gas);
  }

  createPayees(accountIds: string[], balance: string): Promise<void> {
    return this.client.create_payees({ accountIds, balance }, this.gas);
  }

  deletePayers(accountIds: string[]): Promise<void> {
    return this.client.delete_payers({ accountIds }, this.gas);
  }

  deletePayees(accountIds: string[]): Promise<void> {
    return this.client.delete_payees({ accountIds }, this.gas);
  }

  setUnrestrictedBalance(amount: string): Promise<void> {
    return this.client.set_unrestricted_balance({ amount }, this.gas);
  }

  setPayerBalance(accountId: string, amount: string): Promise<void> {
    return this.client.set_payer_balance({ accountId, amount }, this.gas);
  }

  setPayeeBalance(accountId: string, amount: string): Promise<void> {
    return this.client.set_payee_balance({ accountId, amount }, this.gas);
  }

  transfer(recipient: string, amount: string): Promise<void> {
    return this.client.transfer({ recipient, amount });
  }
}
