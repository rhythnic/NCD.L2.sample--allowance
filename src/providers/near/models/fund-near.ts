import { utils, Contract, WalletConnection } from "near-api-js";
import { FundContract, FundCore, PayerPayeeCore } from "@/interfaces";
import BN from "bn.js";

interface FundContractNearConfiguration {
  wallet: WalletConnection;
  fracDigitLimit: number;
  gas: BN;
}

export class FundContractNear implements FundContract {
  public static configure(
    config: FundContractNearConfiguration,
  ): (contractId: string) => FundContractNear {
    return (contractId) => {
      const contract = new Contract(config.wallet.account(), contractId, {
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
          "deposit_money",
        ],
      });

      return new FundContractNear(contractId, contract, config);
    };
  }

  constructor(
    public contractId: string,
    private contract: any,
    private config: FundContractNearConfiguration,
  ) {}

  async getFund(): Promise<FundCore> {
    const result = await this.contract.get_fund();
    return {
      ...result,
      unrestricted_balance: utils.format.formatNearAmount(
        result.unrestricted_balance,
        this.config.fracDigitLimit,
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
      balance: utils.format.formatNearAmount(
        result.balance,
        this.config.fracDigitLimit,
      ),
    };
  }

  async getPayee(accountId: string): Promise<PayerPayeeCore> {
    const result = await this.contract.get_payee({ accountId });
    return {
      ...result,
      balance: utils.format.formatNearAmount(
        result.balance,
        this.config.fracDigitLimit,
      ),
    };
  }

  createPayers(accountIds: string[], balance: string): Promise<void> {
    return this.contract.create_payers(
      {
        accountIds,
        balance: utils.format.parseNearAmount(balance),
      },
      this.config.gas,
    );
  }

  createPayees(accountIds: string[], balance: string): Promise<void> {
    return this.contract.create_payees(
      {
        accountIds,
        balance: utils.format.parseNearAmount(balance),
      },
      this.config.gas,
    );
  }

  deletePayers(accountIds: string[]): Promise<void> {
    return this.contract.delete_payers({ accountIds }, this.config.gas);
  }

  deletePayees(accountIds: string[]): Promise<void> {
    return this.contract.delete_payees({ accountIds }, this.config.gas);
  }

  setUnrestrictedBalance(amount: string): Promise<void> {
    return this.contract.set_unrestricted_balance(
      {
        amount: utils.format.parseNearAmount(amount),
      },
      this.config.gas,
    );
  }

  setPayerBalance(accountId: string, amount: string): Promise<void> {
    return this.contract.set_payer_balance(
      {
        accountId,
        amount: utils.format.parseNearAmount(amount),
      },
      this.config.gas,
    );
  }

  setPayeeBalance(accountId: string, amount: string): Promise<void> {
    return this.contract.set_payee_balance(
      {
        accountId,
        amount: utils.format.parseNearAmount(amount),
      },
      this.config.gas,
    );
  }

  transfer(recipient: string, amount: string): Promise<void> {
    return this.contract.transfer({
      recipient,
      amount: utils.format.parseNearAmount(amount),
    });
  }

  depositMoney(amount: string): Promise<void> {
    return this.contract.deposit_money(
      {},
      this.config.gas,
      utils.format.parseNearAmount(amount),
    );
  }
}
