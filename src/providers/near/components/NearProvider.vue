<!-- 
  App
  Top-level component for the application.
  The component tree is designed to make it easier to support multiple blockchains.
  This component provides NEAR protocol implementations of services that implement the interfaces defined in src/models.
  Child components can inject these services without being aware of which blockchain is being used.
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
