<!-- 
  App
  Top-level component for the application.
  Uses NearProvider to provide NEAR services
-->

<script setup lang="ts">
  import NearProvider from "@/providers/near/components/NearProvider.vue";
</script>

<template>
  <NearProvider>
    <router-view />
  </NearProvider>
</template>
