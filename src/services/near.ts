import { keyStores, Near, WalletConnection, providers } from "near-api-js";
import BN from "bn.js";

export const NETWORK_ID = import.meta.env.VITE_NETWORK_ID as string;
export const CONTRACT_ID = import.meta.env.VITE_CONTRACT_ID as string;
const CONTRACT_NAME = import.meta.env.VITE_CONTRACT_NAME as string;
const NODE_URL = import.meta.env.VITE_NODE_URL as string;
const WALLET_URL = import.meta.env.VITE_WALLET_URL as string;
export const gas = new BN(import.meta.env.VITE_GAS as string);

export const near = new Near({
  headers: {},
  networkId: NETWORK_ID,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: NODE_URL,
  walletUrl: WALLET_URL,
});

export const provider = new providers.JsonRpcProvider(NODE_URL);

export const wallet = new WalletConnection(near, CONTRACT_NAME);

export function signIn() {
  return wallet.requestSignIn({ contractId: CONTRACT_ID });
}
