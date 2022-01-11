import { Contract, WalletConnection, utils } from "near-api-js";
import BN from "bn.js";

export class FundRegistryNear {
  private client: any;
  private createFundAttachedDeposit = utils.format.parseNearAmount("3") as BN;

  constructor(
    contractId: string,
    private wallet: WalletConnection,
    private gas: BN,
  ) {
    this.client = new Contract(wallet.account(), contractId, {
      viewMethods: ["get_funds"],
      changeMethods: ["create_fund", "delete_fund"],
    });
  }

  getFundIndex(): Promise<string[]> {
    return this.client.get_funds({ owner: this.wallet.getAccountId() });
  }

  createFund(subaccount: string): Promise<void> {
    return this.client.create_fund(
      { subaccount },
      this.gas,
      this.createFundAttachedDeposit,
    );
  }

  deleteFund(subaccount: string): Promise<void> {
    return this.client.delete_fund({ subaccount }, this.gas);
  }
}
