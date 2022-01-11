<script setup lang="ts">
  import Header from "./Header.vue";
  import TxResultAlert from "./TxResultAlert.vue";
  import BlockchainProvider from "./NearProvider.vue";
</script>

<template>
  <BlockchainProvider>
    <Header />
    <main class="grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <router-view></router-view>
    </main>
    <TxResultAlert />
  </BlockchainProvider>
</template>
