<!--
  Layout
  Layout is rendered by the main App component at src/near-app/App.vue
  Layout watches the route and redirects to /home if the user is not signed in
-->

<script setup lang="ts">
  import { inject } from "vue";
  import { useI18n } from "vue-i18n";
  import { RouteRecordName, useRoute, useRouter } from "vue-router";
  import { Wallet } from "@/interfaces";
  import Alert from "@/components/Alert.vue";
  import NearTransactionDetector from "@/providers/near/components/NearTransactionDetector.vue";
  import RouteStrategyLocaleLoader from "@/providers/i18n/components/RouteStrategyLocaleLoader.vue";
  import Header from "./Header.vue";

  const contractId = inject("contractId") as string;
  const wallet = inject("wallet") as Wallet;

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const router = useRouter();
  const route = useRoute();

  function handleSignOut(): void {
    wallet.signOut();
    router.push({ name: "home", params: { locale: route.params.locale } });
  }

  function handleSignIn() {
    wallet.requestSignIn({ contractId });
  }

  function handleSelectLocale(locale: string): void {
    router.push({ name: route.name as RouteRecordName, params: { ...route.params, locale } });
  }
</script>

<template>
  <Header
    :locale="(route.params.locale as string)"
    :account-id="wallet.isSignedIn() ? wallet.getAccountId() : ''"
    @sign-in="handleSignIn"
    @sign-out="handleSignOut"
    @select-locale="handleSelectLocale"
  />
  <main class="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <router-view></router-view>

      <NearTransactionDetector>
        <template v-slot:default="slotProps">
          <Alert :model-value="slotProps.transactionDetected" :ttl="3000" @update:model-value="slotProps.setTransactionDetected">
            {{ t("app.transactionSucceeded") }}
          </Alert>
        </template>
      </NearTransactionDetector>
  </main>

  <RouteStrategyLocaleLoader :locale="(route.params.locale as string)" />
</template>
