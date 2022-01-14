/**
 * NEAR implementations of application interfaces
 */

import { Near, utils, Account as NearApiJsAccount } from "near-api-js";
import BN from "bn.js";
import {
  Account,
  FundRegistryContract,
  FundContract,
  FundCore,
  PayerPayeeCore,
} from "./interfaces";

const FRAC_DIGIT_LIMIT = parseInt(
  import.meta.env.VITE_FRAC_DIGIT_LIMIT as string,
);

export class AccountNear implements Account {
  private account: null | NearApiJsAccount = null;

  constructor(public accountId: string, private near: Near) {}

  private async getAccount(): Promise<NearApiJsAccount> {
    if (!this.account) {
      this.account = await this.near.account(this.accountId);
    }
    return this.account;
  }

  async availableBalance(): Promise<string> {
    const account = await this.getAccount();
    const accountBalance = await account.getAccountBalance();
    return utils.format.formatNearAmount(
      accountBalance.available,
      FRAC_DIGIT_LIMIT,
    );
  }
}

export class FundRegistryContractNear implements FundRegistryContract {
  private createFundAttachedDeposit = utils.format.parseNearAmount("3") as BN;

  constructor(
    public contractId: string,
    private contract: any,
    private gas: BN,
  ) {}

  getFundIndex(owner: string): Promise<string[]> {
    return this.contract.get_funds({ owner });
  }

  createFund(subaccount: string): Promise<void> {
    return this.contract.create_fund(
      { subaccount },
      this.gas,
      this.createFundAttachedDeposit,
    );
  }

  deleteFund(subaccount: string): Promise<void> {
    return this.contract.delete_fund({ subaccount }, this.gas);
  }
}

export class FundContractNear implements FundContract {
  constructor(
    public contractId: string,
    private contract: any,
    private gas: BN,
  ) {}

  async getFund(): Promise<FundCore> {
    const result = await this.contract.get_fund();
    return {
      ...result,
      unrestricted_balance: utils.format.formatNearAmount(
        result.unrestricted_balance,
        FRAC_DIGIT_LIMIT,
      ),
    };
  }

  getPayers(): Promise<string[]> {
    return this.contract.get_payers();
  }

  getPayees(): Promise<string[]> {
    return this.contract.get_payees();
  }

  async getPayer(accountId: string): Promise<PayerPayeeCore> {
    const result = await this.contract.get_payer({ accountId });
    return {
      ...result,
      balance: utils.format.formatNearAmount(result.balance, FRAC_DIGIT_LIMIT),
    };
  }

  async getPayee(accountId: string): Promise<PayerPayeeCore> {
    const result = await this.contract.get_payee({ accountId });
    return {
      ...result,
      balance: utils.format.formatNearAmount(result.balance, FRAC_DIGIT_LIMIT),
    };
  }

  createPayers(accountIds: string[], balance: string): Promise<void> {
    return this.contract.create_payers(
      {
        accountIds,
        balance: utils.format.parseNearAmount(balance) as BN,
      },
      this.gas,
    );
  }

  createPayees(accountIds: string[], balance: string): Promise<void> {
    return this.contract.create_payees(
      {
        accountIds,
        balance: utils.format.parseNearAmount(balance) as BN,
      },
      this.gas,
    );
  }

  deletePayers(accountIds: string[]): Promise<void> {
    return this.contract.delete_payers({ accountIds }, this.gas);
  }

  deletePayees(accountIds: string[]): Promise<void> {
    return this.contract.delete_payees({ accountIds }, this.gas);
  }

  setUnrestrictedBalance(amount: string): Promise<void> {
    return this.contract.set_unrestricted_balance(
      {
        amount: utils.format.parseNearAmount(amount) as BN,
      },
      this.gas,
    );
  }

  setPayerBalance(accountId: string, amount: string): Promise<void> {
    return this.contract.set_payer_balance(
      {
        accountId,
        amount: utils.format.parseNearAmount(amount) as BN,
      },
      this.gas,
    );
  }

  setPayeeBalance(accountId: string, amount: string): Promise<void> {
    return this.contract.set_payee_balance(
      {
        accountId,
        amount: utils.format.parseNearAmount(amount) as BN,
      },
      this.gas,
    );
  }

  transfer(recipient: string, amount: string): Promise<void> {
    return this.contract.transfer({
      recipient,
      amount: utils.format.parseNearAmount(amount) as BN,
    });
  }

  depositMoney(amount: string): Promise<void> {
    return this.contract.deposit_money(
      {},
      this.gas,
      utils.format.parseNearAmount(amount) as BN,
    );
  }
}
