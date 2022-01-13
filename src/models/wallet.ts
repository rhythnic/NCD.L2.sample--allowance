export interface Wallet {
  requestSignIn: (params: { contractId: string }) => void;
  signOut: () => void;
  getAccountId: () => string;
  isSignedIn: () => boolean;
}
