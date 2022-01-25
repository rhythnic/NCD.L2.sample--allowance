<!--
  AccountAddWidget
  Clicking on the "add" button shows a dialog.  The dialog collects a list of account ids and a money amount.
  The amount input will be the initial balance of these new accounts in the fund.
-->

<script setup lang="ts">
  import { reactive } from "vue";
  import { useI18n } from "vue-i18n";
  import { UserAddIcon } from "@heroicons/vue/solid";
  import { useState } from "@/composables/ui";
  import AddButton from "@/components/AddButton.vue";
  import ActionDialog from "@/components/ActionDialog.vue";
  import TestListInput from "@/components/TestListInput.vue";
  import NearInput from "@/providers/near/components/NearInput.vue";

  defineProps<{
    editMode: boolean;
  }>();

  const emit = defineEmits<{
    (e: "add-accounts", accountIds: string[], balance: string): void;
  }>();

  const [dialogOpen, setDialogOpen] = useState(false);

  const initialState = {
    accountsToAdd: [],
    balance: "0",
  };

  const state = reactive({ ...initialState });

  function handleConfirm() {
    emit("add-accounts", state.accountsToAdd, state.balance);
  }

  function handleCancel() {
    Object.assign(state, initialState);
    setDialogOpen(false);
  }

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });
</script>

<template>
  <AddButton v-if="editMode" class="ml-4" @click="setDialogOpen(true)" />
  <ActionDialog
    v-bind="$attrs"
    :title="($attrs.title as string)"
    :open="dialogOpen"
    :confirm-label="t('actions.add')"
    :cancel-label="t('actions.cancel')"
    :disable-confirm="!state.accountsToAdd.length"
    @cancel="handleCancel"
    @confirm="handleConfirm"
    @done="handleCancel"
  >
    <TestListInput
      class="mt-4"
      :label="t('account.id')"
      :placeholder="t('account.id')"
      :list-title="t('account.idsToAdd')"
      v-model="state.accountsToAdd"
    >
      <template v-slot:addBtnIcon>
        <UserAddIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </template>
    </TestListInput>
    <NearInput
      class="mt-4"
      :label="t('account.initialBalance')"
      :help-text="t('account.sameInitialBalance')"
      id="initial-balance"
      v-model="state.balance"
      placeholder="0"
    />
  </ActionDialog>
</template>
