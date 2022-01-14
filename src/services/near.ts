/**
 * NEAR Service
 * Also exports factory functions for creating Contracts for the fund registry and funds
 */

import {
  keyStores,
  Near,
  WalletConnection,
  providers,
  Contract,
} from "near-api-js";
import BN from "bn.js";
import {
  FundRegistryContractNear,
  FundContractNear,
  AccountNear,
} from "@/models/near";

export const NETWORK_ID = import.meta.env.VITE_NEAR_NETWORK_ID as string;
export const CONTRACT_ID = import.meta.env.VITE_NEAR_CONTRACT_ID as string;
const CONTRACT_NAME = import.meta.env.VITE_NEAR_CONTRACT_NAME as string;
const NODE_URL = import.meta.env.VITE_NEAR_NODE_URL as string;
const WALLET_URL = import.meta.env.VITE_NEAR_WALLET_URL as string;
export const gas = new BN(import.meta.env.VITE_NEAR_GAS as string);

export const near = new Near({
  headers: {},
  networkId: NETWORK_ID,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: NODE_URL,
  walletUrl: WALLET_URL,
});

export const provider = new providers.JsonRpcProvider(NODE_URL);

export const wallet = new WalletConnection(near, CONTRACT_NAME);

export function buildFundRegistryContract(): FundRegistryContractNear {
  const contract = new Contract(wallet.account(), CONTRACT_ID, {
    viewMethods: ["get_funds"],
    changeMethods: ["create_fund", "delete_fund"],
  });

  return new FundRegistryContractNear(CONTRACT_ID, contract, gas);
}

export function buildFundContract(subdomain: string): FundContractNear {
  const contractId = `${subdomain}.${CONTRACT_ID}`;
  const contract = new Contract(wallet.account(), contractId, {
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

  return new FundContractNear(contractId, contract, gas);
}

export function buildAccount(accountId: string) {
  return new AccountNear(accountId, near);
}
