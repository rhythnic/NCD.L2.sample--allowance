<!-- 
  App
  Top-level component for the application.
  The component tree is designed to make it easier to support multiple blockchains.
  This component provides NEAR protocol implementations of services that implement the interfaces defined in src/models.
  Child components can inject these services without being aware of which blockchain is being used.
-->

<script setup lang="ts">
  import { provide } from "vue";
  import {
    buildFundRegistryContract,
    buildFundContract,
    buildAccount,
    wallet,
    CONTRACT_ID,
  } from "@/services/near";
  import Layout from "../views/layout/Layout.vue";
  import TxResultAlert from "./TxResultAlert.vue";

  provide("contractId", CONTRACT_ID);
  provide("buildFundRegistryContract", buildFundRegistryContract);
  provide("buildFundContract", buildFundContract);
  provide("buildAccount", buildAccount);
  provide("wallet", wallet);
</script>

<template>
  <Layout />
  <TxResultAlert />
</template>
