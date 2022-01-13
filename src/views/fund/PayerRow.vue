<documentation>
PayerRow
Container that provides payer-context to the AccountRow in the slot

*views FundContract#getPayer
*calls FundContract#setPayerBalance
</documentation>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { PromiseTracker } from "@/models/promise-tracker";
  import { FundContract } from "@/models/interfaces";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    fund: FundContract;
    accountId: string;
  }>();

  const balance = ref("0");
  const loadStatus = new PromiseTracker();
  const setBalanceStatus = new PromiseTracker();

  onMounted(async () => {
    const result = await loadStatus.track(props.fund.getPayer(props.accountId));
    balance.value = result.balance;
  });

  function handleSetBalance(balance: string) {
    setBalanceStatus.track(
      props.fund.setPayerBalance(props.accountId, balance),
    );
  }
</script>

<template>
  <slot
    :amount="balance"
    :set-balance-status="setBalanceStatus"
    :handle-set-balance="handleSetBalance"
  ></slot>
</template>
