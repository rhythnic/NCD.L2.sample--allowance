import { utils, Contract, WalletConnection } from "near-api-js";
import { FundRegistryContract } from "@/interfaces";
import BN from "bn.js";

interface FundRegistryContractNearConfiguration {
  wallet: WalletConnection;
  gas: BN;
}

export class FundRegistryContractNear implements FundRegistryContract {
  private createFundAttachedDeposit = utils.format.parseNearAmount("3");

  public static configure(
    config: FundRegistryContractNearConfiguration,
  ): (contractId: string) => FundRegistryContractNear {
    return (contractId) => {
      const contract = new Contract(config.wallet.account(), contractId, {
        viewMethods: ["get_funds"],
        changeMethods: ["create_fund", "delete_fund"],
      });

      return new FundRegistryContractNear(contractId, contract, config);
    };
  }

  constructor(
    public contractId: string,
    private contract: any,
    private config: FundRegistryContractNearConfiguration,
  ) {}

  getFundIndex(owner: string): Promise<string[]> {
    return this.contract.get_funds({ owner });
  }

  createFund(subaccount: string): Promise<void> {
    return this.contract.create_fund(
      { subaccount },
      this.config.gas,
      this.createFundAttachedDeposit,
    );
  }

  deleteFund(subaccount: string): Promise<void> {
    return this.contract.delete_fund({ subaccount }, this.config.gas);
  }
}
