<documentation>
  Fund Page
  Shows fund card, payer list, and payee list

  *views FundContract#getFund
</documentation>

<script setup lang="ts">
  import { inject, computed, onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { Wallet, buildFundContractType, UserRole } from "@/models/interfaces";
  import { PromiseTracker } from "@/models/promise-tracker";
  import AccountList from "./AccountList.vue";
  import FundCard from "./FundCard.vue";
  import PayerList from './PayerList.vue'
  import PayeeList from "./PayeeList.vue";

  const wallet = inject("wallet") as Wallet;
  const buildFundContract = inject(
    "buildFundContract",
  ) as buildFundContractType;

  const route = useRoute();
  const accountId = wallet.getAccountId();
  const loadStatus = new PromiseTracker();
  const owner = ref("");
  const unrestrictedBalance = ref("");

  const userIsOwner = computed(() => owner.value === accountId);

  const fund = buildFundContract(route.params.subaccount as string);

  onMounted(async () => {
    const result = await loadStatus.track(fund.getFund());
    owner.value = result.owner;
    unrestrictedBalance.value = result.unrestricted_balance;
  });
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
    <!-- Payers List -->
    <div class="lg:col-start-1 lg:col-span-1">
      <PayerList :fund="fund">
        <template v-slot:default="slotProps">
          <AccountList
            class="bg-white rounded-lg"
            :role="UserRole.Payer"
            :title="'Payers'"
            :accountIds="slotProps.accountIds"
            :fund="fund"
            :user-is-owner="userIsOwner"
            :add-status="slotProps.addStatus"
            :remove-status="slotProps.removeStatus"
            @add-accounts="slotProps.handleAddAccounts"
            @remove-accounts="slotProps.handleRemoveAccounts"
          />
        </template>
      </PayerList>
    </div>
    <!-- END Payers List -->
    <!-- Payees List -->
    <div class="lg:col-start-2 lg:col-span-1">
      <PayeeList :fund="fund">
        <template v-slot:default="slotProps">
          <AccountList
            class="bg-white rounded-lg"
            :role="UserRole.Payee"
            :title="'Payees'"
            :accountIds="slotProps.accountIds"
            :fund="fund"
            :user-is-owner="userIsOwner"
            :add-status="slotProps.addStatus"
            :remove-status="slotProps.removeStatus"
            @add-accounts="slotProps.handleAddAccounts"
            @remove-accounts="slotProps.handleRemoveAccounts"
          />
        </template>
      </PayeeList>
    </div>
    <!-- END Payees List -->
  </div>
</template>
