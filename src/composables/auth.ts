import { ref, onMounted, readonly } from "vue";
import { wallet } from "../services/near";

export { signIn } from "../services/near";

const accountId = ref<string>("");
const isSignedIn = ref<boolean>(false);

export function useAuth() {
  onMounted(syncWalletState);
  return useAuthState();
}

export function useAuthState() {
  return {
    accountId: readonly(accountId),
    isSignedIn: readonly(isSignedIn),
  };
}

function syncWalletState() {
  isSignedIn.value = wallet.isSignedIn();
  accountId.value = wallet.getAccountId() || "";
}

export function signOut() {
  wallet.signOut();
  localStorage.removeItem(`near-api-js:keystore:${accountId.value}:testnet`);
  syncWalletState();
}
