<script setup lang="ts">
  import { provide } from "vue";
  import { CONTRACT_ID, wallet, gas } from "@/services/near";
  import { FundRegistryNear } from "@/models/fund-registry-near";
  import { FundNear } from "@/models/fund-near";

  function fundFactory(subdomain: string): FundNear {
    const fundContractId = `${subdomain}.${CONTRACT_ID}`;
    return new FundNear(fundContractId, wallet, gas);
  }

  provide("fundRegistry", new FundRegistryNear(CONTRACT_ID, wallet, gas));
  provide("fundFactory", fundFactory);
</script>

<template>
  <slot></slot>
</template>
