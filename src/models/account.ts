import { Near, utils, Account as NearAccount } from "near-api-js";
import BN from "bn.js";

interface Account {
  accountId: string;
  availableBalance: (fracDigits: number) => Promise<string>;
  sendMoney: (recipient: string, amount: string) => Promise<void>;
}

export type buildAccountType = (accountId: string) => Account;

export class AccountNear implements Account {
  private account: null | NearAccount = null;

  constructor(public accountId: string, private near: Near) {}

  private async getAccount(): Promise<NearAccount> {
    if (!this.account) {
      this.account = await this.near.account(this.accountId);
    }
    return this.account;
  }

  async availableBalance(fracDigits: number): Promise<string> {
    const account = await this.getAccount();
    const accountBalance = await account.getAccountBalance();
    return utils.format.formatNearAmount(accountBalance.available, fracDigits);
  }

  async sendMoney(recipient: string, amount: string) {
    const account = await this.getAccount();
    const yoctoAmount = utils.format.parseNearAmount(amount) as BN;
    debugger;
    const result = await account.sendMoney(recipient, yoctoAmount);
    debugger;
  }
}
