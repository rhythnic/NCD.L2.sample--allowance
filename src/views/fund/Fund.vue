<!--
  Fund Page
  Shows fund card, payer list, and payee list

  *views FundContract#getFund
-->

<script setup lang="ts">
  import { inject, computed, onMounted } from "vue";
  import { Wallet, buildFundContractType } from "@/interfaces";
  import { useAction, useState } from "@/composables/ui";
  import FundCard from "./FundCard.vue";
  import PayerList from "./PayerList.vue";
  import PayeeList from "./PayeeList.vue";

  const parentContractId = inject("contractId") as string;
  const wallet = inject("wallet") as Wallet;
  const buildFundContract = inject(
    "buildFundContract",
  ) as buildFundContractType;

  const props = defineProps<{
    subaccount: string;
  }>();

  const accountId = wallet.getAccountId();
  const loadAction = useAction();
  const [owner, setOwner] = useState("");
  const [unrestrictedBalance, setUnrestrictedBalance] = useState("");

  const userIsOwner = computed(() => owner.value === accountId);

  const contractId = `${props.subaccount}.${parentContractId}`;
  const fund = buildFundContract(contractId);

  onMounted(async () => {
    const result = await loadAction.track(fund.getFund());
    setOwner(result.owner);
    setUnrestrictedBalance(result.unrestricted_balance);
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
    <div class="lg:col-start-1 lg:col-span-1">
      <PayerList
        class="bg-white rounded-lg"
        :fund="fund"
        :user-is-owner="userIsOwner"
      />
    </div>
    <div class="lg:col-start-2 lg:col-span-1">
      <PayeeList
        class="bg-white rounded-lg"
        :fund="fund"
        :user-is-owner="userIsOwner"
      />
    </div>
  </div>
</template>
