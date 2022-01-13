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
