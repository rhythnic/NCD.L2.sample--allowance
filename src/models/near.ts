/**
 * NEAR implementations of application interfaces
 */

import { Near, utils, Account as NearApiJsAccount } from "near-api-js";
import BN from "bn.js";
import { Account, FundRegistryContract, FundContract, FundCore, PayerPayeeCore } from './interfaces';


export class AccountNear implements Account {
  private account: null | NearApiJsAccount = null;

  constructor(public accountId: string, private near: Near) {}

  private async getAccount(): Promise<NearApiJsAccount> {
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

  async sendMoney(recipient: string, amount: string): Promise<void> {
    const account = await this.getAccount();
    const yoctoAmount = utils.format.parseNearAmount(amount) as BN;
    await account.sendMoney(recipient, yoctoAmount);
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