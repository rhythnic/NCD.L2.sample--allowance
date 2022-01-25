/**
 * i18n service config
 */
export const INITIAL_LOCALE = import.meta.env.VITE_INITIAL_LOCALE as
  | string
  | undefined;

export const FALLBACK_LOCALE = import.meta.env.VITE_FALLBACK_LOCALE as
  | string
  | undefined;

/**
 * Near service config
 */
export const NEAR_NETWORK_ID = import.meta.env.VITE_NEAR_NETWORK_ID as string;

export const NEAR_CONTRACT_ID = import.meta.env.VITE_NEAR_CONTRACT_ID as string;

export const NEAR_CONTRACT_NAME = import.meta.env
  .VITE_NEAR_CONTRACT_NAME as string;

export const NEAR_NODE_URL = import.meta.env.VITE_NEAR_NODE_URL as string;

export const NEAR_WALLET_URL = import.meta.env.VITE_NEAR_WALLET_URL as string;

export const NEAR_GAS = import.meta.env.VITE_NEAR_GAS as string;

export const FRAC_DIGIT_LIMIT = import.meta.env.VITE_FRAC_DIGIT_LIMIT as string;
