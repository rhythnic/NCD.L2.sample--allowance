import { utils } from "near-api-js";
import BN from "bn.js";

export interface FundRegistryContract {
  contractId: string;
  getFundIndex: (owner: string) => Promise<string[]>;
  createFund: (subaccount: string) => Promise<void>;
  deleteFund: (subaccount: string) => Promise<void>;
}

export type buildFundRegistryContractType = () => FundRegistryContract;

export class FundRegistryContractNear {
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
