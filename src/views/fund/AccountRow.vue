<script setup lang="ts">
  import { reactive, onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import BalanceDialog from "@/components/BalanceDialog.vue";
  import { PromiseTracker } from "@/models/PromiseTracker";
  import { Fund } from "@/models/blockchain";
  import TransferButton from "@/components/TransferButton.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    isPayer: boolean;
    fund: Fund;
    accountId: string;
    editMode: boolean;
    userIsOwner: boolean;
  }>();

  const emit = defineEmits<{
    (e: "show-transfer", accountId: string): void;
  }>();

  const state = reactive({ balance: "0" });
  const loadStatus = new PromiseTracker();
  const setBalanceStatus = new PromiseTracker();

  onMounted(async () => {
    const result = await loadStatus.track(
      props.isPayer
        ? props.fund.getPayer(props.accountId)
        : props.fund.getPayee(props.accountId),
    );
    Object.assign(state, result);
  });

  function handleSetBalance(balance: string) {
    const promise = props.isPayer
      ? props.fund.setPayerBalance(props.accountId, balance)
      : props.fund.setPayeeBalance(props.accountId, balance);
    setBalanceStatus.track(promise);
  }
</script>

<template>
  <div class="flex items-center justify-between flex-1 h-10">
    <div class="ml-3 text-sm">
      <span class="font-medium text-gray-700">
        {{ accountId }}
      </span>
    </div>
    <template v-if="!editMode">
      <div v-if="!isPayer" class="flex justify-center">
        <TransferButton @click="emit('show-transfer', accountId)" />
      </div>
      <div class="ml-6">
        <BalanceDialog
          :balance="state.balance"
          :show-actions="userIsOwner"
          :promise-tracker="setBalanceStatus"
          :title="t(isPayer ? 'payer.setBalance' : 'payer.setBalance')"
          @set-balance="handleSetBalance"
        />
      </div>
    </template>
  </div>
</template>
