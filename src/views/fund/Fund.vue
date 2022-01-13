<script setup lang="ts">
  import { inject, computed, onMounted, ref, watch } from "vue";
  import { useRoute } from "vue-router";
  import { buildFundContractType, UserRole } from "@/models/fund";
  import { PromiseTracker } from "@/models/promise-tracker";
  import { Wallet } from "@/models/wallet";
  import AccountList from "./AccountList.vue";
  import FundCard from "./FundCard.vue";

  const wallet = inject("wallet") as Wallet;
  const buildFundContract = inject(
    "buildFundContract",
  ) as buildFundContractType;

  const route = useRoute();
  const accountId = wallet.getAccountId();
  const loadStatus = new PromiseTracker();
  const createPayersStatus = new PromiseTracker();
  const createPayeesStatus = new PromiseTracker();
  const deletePayersStatus = new PromiseTracker();
  const deletePayeesStatus = new PromiseTracker();
  const setBalanceStatus = new PromiseTracker();
  const owner = ref("");
  const unrestrictedBalance = ref("");
  const payerIndex = ref([]);
  const payeeIndex = ref([]);

  const userIsOwner = computed(() => owner.value === accountId);

  const fund = buildFundContract(route.params.subaccount as string);

  onMounted(async () => {
    const [core, _payerIndex, _payeeIndex] = await loadStatus.track(
      Promise.all([fund.getFund(), fund.getPayers(), fund.getPayees()]),
    );
    owner.value = core.owner;
    unrestrictedBalance.value = core.unrestricted_balance;
    payerIndex.value = _payerIndex;
    payeeIndex.value = _payeeIndex;
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

  watch(() => payerIndex.value, console.log);
</script>

<template>
  <div
    class="md:mt-4 grid grid-cols-1 gap-6 lg:grid-flow-col-dense lg:grid-cols-2"
  >
    <FundCard
      class="lg:col-start-1 lg:col-span-2"
      :fund="fund"
      :owner="owner"
      :unrestricted-balance="unrestrictedBalance"
      :user-is-owner="userIsOwner"
    />
    <div class="lg:col-start-1 lg:col-span-1">
      <AccountList
        class="bg-white rounded-lg"
        :role="UserRole.Payer"
        :title="'Payers'"
        :accountIds="payerIndex"
        :fund="fund"
        :user-is-owner="userIsOwner"
        :add-status="createPayersStatus"
        :remove-status="deletePayersStatus"
        @add-accounts="handleCreatePayers"
        @remove-accounts="handleDeletePayers"
      />
    </div>
    <div class="lg:col-start-2 lg:col-span-1">
      <AccountList
        class="bg-white rounded-lg"
        :role="UserRole.Payee"
        :title="'Payees'"
        :accountIds="payeeIndex"
        :fund="fund"
        :user-is-owner="userIsOwner"
        :add-status="createPayeesStatus"
        :remove-status="deletePayeesStatus"
        @add-accounts="handleCreatePayees"
        @remove-accounts="handleDeletePayees"
      />
    </div>
  </div>
</template>
