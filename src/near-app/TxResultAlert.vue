<documentation>
  TxResultAlert
  After the user approves a transaction in NEAR Wallet and is redirected back to the app,
  there is a transaction hash in the url search.  This component detects the hash in the url,
  removes the hash, and displays an alert at the bottom of
  the page.

  NEAR Wallet doesn't redirect back to the application if there was a failure, so this
  component doesn't handle transaction failures.
</documentation>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useI18n } from "vue-i18n";
  // import { provider, wallet } from "@/services/near";
  import Alert from "@/components/Alert.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const route = useRoute();
  const showAlert = ref(false);

  onMounted(async () => {
    // route.query from useRoute did not contain the search params, so using window.location
    const parsedUrl = new URL(window.location.href);

    const transactionHashes = parsedUrl.searchParams.get("transactionHashes");
    if (!transactionHashes) return;

    // uncomment to fetch and view transaction
    // await provider.txStatus(transactionHashes as string, wallet.getAccountId());

    showAlert.value = true;

    window.history.replaceState({}, document.title, "/#" + route.path);
  });
</script>

<template>
  <Alert v-model="showAlert" :ttl="3000" @closed="showAlert = false">
    {{ t("app.transactionSucceeded") }}
  </Alert>
</template>
