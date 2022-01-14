<!--
  TransferDialog
  User inputs a recipient and an amount.  If recipient is passed as prop, the input is disabled.

  *calls FundContract#transfer
-->

<script setup lang="ts">
  import { reactive, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import ActionDialog from "@/components/ActionDialog.vue";
  import { PromiseTracker } from "@/models/promise-tracker";
  import TextField from "@/components/TextField.vue";
  import { FundContract } from "@/models/interfaces";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    fund: FundContract;
    isOpen: boolean;
    recipient?: string;
  }>();

  const emit = defineEmits<{
    (e: "close"): void;
  }>();

  const defaultState = () => ({
    recipient: props.recipient || "",
    amount: "",
  });

  const state = reactive(defaultState());
  const status = new PromiseTracker();

  async function handleConfirm() {
    debugger;
    await status.track(props.fund.transfer(state.recipient, state.amount));
    if (status.succeeded) {
      emit("close");
    }
  }

  watch(
    () => props.isOpen,
    () => {
      Object.assign(state, defaultState());
    },
  );
</script>

<template>
  <ActionDialog
    :open="isOpen"
    :status="status"
    :title="t('actions.transferMoney')"
    :confirm-label="t('actions.transfer')"
    @confirm="handleConfirm"
    @cancel="emit('close')"
  >
    <TextField
      class="mt-4"
      :label="t('account.recipient')"
      id="recipient"
      v-model="state.recipient"
      :placeholder="t('account.id')"
      :disabled="recipient"
    />
    <TextField
      class="mt-4"
      :label="t('account.amount')"
      id="amount"
      v-model="state.amount"
      placeholder="0"
    />
  </ActionDialog>
</template>
