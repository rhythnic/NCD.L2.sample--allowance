<!--
  PayerList
  Container to provide payer-context to AccountList in slot

  *views FundContract#getPayers
  *calls FundContract#createPayers
  *calls FundContract#deletePayers
-->

<script setup lang="ts">
  import { FundContract } from "@/models/interfaces";
  import { PromiseTracker } from "@/models/promise-tracker";
  import { onMounted, ref } from "vue";

  const props = defineProps<{
    fund: FundContract;
  }>();

  const payerIndex = ref([]);
  const loadStatus = new PromiseTracker();
  const createPayersStatus = new PromiseTracker();
  const deletePayersStatus = new PromiseTracker();

  onMounted(async () => {
    const result = await loadStatus.track(props.fund.getPayers());
    payerIndex.value = result;
  });

  function handleCreatePayers(accountIds: string[], balance: string): void {
    createPayersStatus.track(props.fund.createPayers(accountIds, balance));
  }

  function handleDeletePayers(accountIds: string[]): void {
    deletePayersStatus.track(props.fund.deletePayers(accountIds));
  }
</script>

<template>
  <slot
    :accountIds="payerIndex"
    :add-status="createPayersStatus"
    :remove-status="deletePayersStatus"
    :handle-add-accounts="handleCreatePayers"
    :handle-remove-accounts="handleDeletePayers"
  ></slot>
</template>
