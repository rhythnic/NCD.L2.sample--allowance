<!--
  TransferDialog
  User inputs a recipient and an amount.  If recipient is passed as prop, the input is disabled.

  *calls FundContract#transfer
-->

<script setup lang="ts">
  import { reactive, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import { FundContract } from "@/interfaces";
  import { useAction, ActionStatus } from "@/composables/ui";
  import ActionDialog from "@/components/ActionDialog.vue";
  import NearInput from "@/providers/near/components/NearInput.vue";
  import TextField from "@/components/TextField.vue";

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
  const transferAction = useAction();

  async function handleConfirm() {
    debugger;
    await transferAction.track(
      props.fund.transfer(state.recipient, state.amount),
    );
    if (transferAction.status.value === ActionStatus.Succeeded) {
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
    :action-status="transferAction.status.value"
    :action-error="transferAction.error.value"
    :title="t('actions.transferMoney')"
    :confirm-label="t('actions.transfer')"
    :cancel-label="t('actions.cancel')"
    :disable-confirm="!state.recipient || !state.amount"
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
    <NearInput
      class="mt-4"
      :label="t('account.amount')"
      id="amount"
      v-model="state.amount"
      placeholder="0"
    />
  </ActionDialog>
</template>
