<!--
  PayeeRow
  Container that provides payee-context to the AccountRow in the slot
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
    const result = await loadAction.track(props.fund.getPayee(props.accountId));
    setBalance(result.balance);
  });

  function handleSetBalance(balance: string) {
    setBalanceAction.track(
      props.fund.setPayeeBalance(props.accountId, balance),
    );
  }
</script>

<template>
  <slot
    :amount="balance"
    :action-status="setBalanceAction.status.value"
    :action-error="setBalanceAction.error.value"
    :handle-set-balance="handleSetBalance"
  ></slot>
</template>
