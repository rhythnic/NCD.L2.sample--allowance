<!--
  PayerRow
  Container that provides payer-context to the AccountRow in the slot

  *views fund.getPayer
  *calls fund.setPayerBalance
-->

<script setup lang="ts">
  import { onMounted } from "vue";
  import { FundContract } from "@/interfaces";
  import { useAction, useState } from "@/composables/ui";

  const props = defineProps<{
    fund: FundContract;
    accountId: string;
  }>();

  const [balance, setBalance] = useState("0");
  const loadAction = useAction();
  const setBalanceAction = useAction();

  onMounted(async () => {
    const result = await loadAction.track(props.fund.getPayer(props.accountId));
    setBalance(result.balance);
  });

  function handleSetBalance(balance: string) {
    setBalanceAction.track(
      props.fund.setPayerBalance(props.accountId, balance),
    );
  }
</script>

<template>
  <slot
    :amount="balance"
    :action-status="setBalanceAction.status"
    :action-error="setBalanceAction.error"
    :handle-set-balance="handleSetBalance"
  ></slot>
</template>
