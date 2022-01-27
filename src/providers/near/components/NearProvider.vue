<!-- 
  Near Provider
  Injects NEAR services and configuration
-->

<script setup lang="ts">
  import { provide } from "vue";
  import { NEAR_CONTRACT_ID } from "@/env/variables";
  import { wallet, near, fracDigitLimit, gas } from "../near-service";
  import { AccountNear } from "../models/account-near";
  import { FundRegistryContractNear } from "../models/fund-registry-near";
  import { FundContractNear } from "../models/fund-near";

  provide("contractId", NEAR_CONTRACT_ID);
  provide(
    "buildFundRegistryContract",
    FundRegistryContractNear.configure({ wallet, gas }),
  );
  provide(
    "buildFundContract",
    FundContractNear.configure({ wallet, fracDigitLimit, gas }),
  );
  provide("buildAccount", AccountNear.configure({ near, fracDigitLimit }));
  provide("wallet", wallet);
</script>

<template>
  <slot></slot>
</template>
