<!-- 
  TxResultAlert
  After the user approves a transaction in NEAR Wallet and is redirected back to the app,
  there is a transaction hash in the url search.  This component detects the hash in the url,
  and emits an event.

  NEAR Wallet doesn't redirect back to the application if there was a failure, so this
  component doesn't handle transaction failures.
-->

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useRoute } from 'vue-router';
  // import { provider, wallet } from "../near-service";

  const route = useRoute();

  const transactionDetected = ref(false);

  onMounted(async () => {
    // when using WebHashHistory, route.query is empty even when transactionHashes is present
    const parsedUrl = new URL(window.location.href);
    const transactionHashes = parsedUrl.searchParams.get("transactionHashes");
    if (!transactionHashes) return;

    // fetch transaction
    // await provider.txStatus(transactionHashes as string, wallet.getAccountId());

    handleTransactionComplete();
  });

  function handleTransactionComplete() {
    transactionDetected.value = true;
    // vue router already sees query as empty, so it doesn't respond to setting it to empty object
    // using window.history as a workaround
    window.history.replaceState({}, document.title, "/#" + route.path);
  }

  function handleSetTransactionDetected(detected: boolean) {
    transactionDetected.value = detected;
  }
</script>

<template>
  <slot :transaction-detected="transactionDetected" :set-transactionDetected="handleSetTransactionDetected"></slot>
</template>
