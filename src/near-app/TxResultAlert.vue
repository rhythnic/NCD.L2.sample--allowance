<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useI18n } from "vue-i18n";
  import { provider, wallet } from "@/services/near";
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

    await provider.txStatus(transactionHashes as string, wallet.getAccountId());

    showAlert.value = true;

    window.history.replaceState({}, document.title, "/#" + route.path);
  });
</script>

<template>
  <Alert v-model="showAlert" :ttl="3000" @closed="showAlert = false">
    {{ t("app.transactionSucceeded") }}
  </Alert>
</template>
