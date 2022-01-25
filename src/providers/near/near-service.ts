/**
 * NEAR Service
 * Also exports factory functions for creating Contracts for the fund registry and funds
 */

import { Near, WalletConnection, providers } from "near-api-js";
import { keyStores } from "near-api-js";
import BN from "bn.js";
import {
  NEAR_NETWORK_ID,
  NEAR_CONTRACT_NAME,
  NEAR_NODE_URL,
  NEAR_WALLET_URL,
  NEAR_GAS,
  FRAC_DIGIT_LIMIT,
} from "@/env/variables";

export const gas = new BN(NEAR_GAS);

export const fracDigitLimit = parseInt(FRAC_DIGIT_LIMIT);

export const near = new Near({
  headers: {},
  networkId: NEAR_NETWORK_ID,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: NEAR_NODE_URL,
  walletUrl: NEAR_WALLET_URL,
});

export const provider = new providers.JsonRpcProvider({
  url: NEAR_NODE_URL,
});

export const wallet = new WalletConnection(near, NEAR_CONTRACT_NAME);
