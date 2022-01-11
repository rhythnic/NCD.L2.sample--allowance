<script setup lang="ts">
  import { inject, computed, reactive, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import AccountList from "@/views/fund/AccountList.vue";
  import FundCard from "./FundCard.vue";
  import { useAuthState } from "@/composables/auth";
  import { Fund, UserRole } from "@/models/blockchain";
  import { PromiseTracker } from "@/models/PromiseTracker";

  const route = useRoute();
  const fundFactory = inject("fundFactory") as (subaccount: string) => Fund;
  const fund = fundFactory(route.params.subaccount as string);
  const { accountId } = useAuthState();
  const loadStatus = new PromiseTracker();
  const createPayersStatus = new PromiseTracker();
  const createPayeesStatus = new PromiseTracker();
  const deletePayersStatus = new PromiseTracker();
  const deletePayeesStatus = new PromiseTracker();
  const setBalanceStatus = new PromiseTracker();

  const state = reactive({
    owner: "",
    unrestricted_balance: "",
    payerIndex: [],
    payeeIndex: [],
  });

  const userIsOwner = computed(() => state.owner === accountId.value);

  onMounted(async () => {
    const [core, payerIndex, payeeIndex] = await loadStatus.track(
      Promise.all([fund.getFund(), fund.getPayers(), fund.getPayees()]),
    );
    Object.assign(state, core);
    state.payerIndex = payerIndex;
    state.payeeIndex = payeeIndex;
  });

  function handleCreatePayers(accountIds: string[], balance: string): void {
    createPayersStatus.track(fund.createPayers(accountIds, balance));
  }

  function handleCreatePayees(accountIds: string[], balance: string): void {
    createPayeesStatus.track(fund.createPayees(accountIds, balance));
  }

  function handleDeletePayers(accountIds: string[]): void {
    deletePayersStatus.track(fund.deletePayers(accountIds));
  }

  function handleDeletePayees(accountIds: string[]): void {
    deletePayeesStatus.track(fund.deletePayees(accountIds));
  }
</script>

<template>
  <div
    class="md:mt-4 grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-2"
  >
    <FundCard
      class="lg:col-start-1 lg:col-span-2"
      v-bind="state"
      :fund="fund"
      :user-is-owner="userIsOwner"
    />
    <AccountList
      :role="UserRole.Payer"
      class="lg:col-start-1 lg:col-span-1"
      :title="'Payers'"
      :accountIds="state.payerIndex"
      :fund="fund"
      :user-is-owner="userIsOwner"
      :add-status="createPayersStatus"
      :remove-status="deletePayersStatus"
      @add-accounts="handleCreatePayers"
      @remove-accounts="handleDeletePayers"
    />
    <AccountList
      :role="UserRole.Payee"
      class="lg:col-start-2 lg:col-span-1"
      :title="'Payees'"
      :accountIds="state.payeeIndex"
      :fund="fund"
      :user-is-owner="userIsOwner"
      :add-status="createPayeesStatus"
      :remove-status="deletePayeesStatus"
      @add-accounts="handleCreatePayees"
      @remove-accounts="handleDeletePayees"
    />
  </div>
</template>
