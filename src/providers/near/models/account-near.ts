import { Near, utils, Account as NearApiJsAccount } from "near-api-js";
import { Account } from "@/interfaces";

interface AccountNearConfiguration {
  near: Near;
  fracDigitLimit: number;
}

export class AccountNear implements Account {
  public static build: (accountId: string) => AccountNear;
  private account: null | NearApiJsAccount = null;

  public static configure(
    config: AccountNearConfiguration,
  ): (accountId: string) => AccountNear {
    return (accountId: string) => new AccountNear(accountId, config);
  }

  constructor(
    public accountId: string,
    private config: AccountNearConfiguration,
  ) {}

  private async getAccount(): Promise<NearApiJsAccount> {
    if (!this.account) {
      this.account = await this.config.near.account(this.accountId);
    }
    return this.account;
  }

  async availableBalance(): Promise<string> {
    const account = await this.getAccount();
    const accountBalance = await account.getAccountBalance();
    return utils.format.formatNearAmount(
      accountBalance.available,
      this.config.fracDigitLimit,
    );
  }
}
