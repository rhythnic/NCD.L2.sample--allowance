<documentation>
  PayeeList
  Container to provide payee-context to AccountList in slot

  *views FundContract#getPayees
  *calls FundContract#createPayees
  *calls FundContract#deletePayees
</documentation>

<script setup lang="ts">
import { FundContract } from '@/models/interfaces';
import { PromiseTracker } from '@/models/promise-tracker';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  fund: FundContract
}>();

const payeeIndex = ref([]);
const loadStatus = new PromiseTracker();
const createPayeesStatus = new PromiseTracker();
const deletePayeesStatus = new PromiseTracker();

  onMounted(async () => {
    const result = await loadStatus.track(props.fund.getPayees());
    payeeIndex.value = result;
  });

  function handleCreatePayees(accountIds: string[], balance: string): void {
    createPayeesStatus.track(props.fund.createPayees(accountIds, balance));
  }

  function handleDeletePayees(accountIds: string[]): void {
    deletePayeesStatus.track(props.fund.deletePayees(accountIds));
  }
</script>

<template>
  <slot
    :accountIds="payeeIndex"
    :add-status="createPayeesStatus"
    :remove-status="deletePayeesStatus"
    :handle-add-accounts="handleCreatePayees"
    :handle-remove-accounts="handleDeletePayees"
  ></slot>
</template>