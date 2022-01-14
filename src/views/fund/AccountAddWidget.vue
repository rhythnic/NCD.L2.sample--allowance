<!--
  AccountAddWidget
  Clicking on the "add" button shows a dialog.  The dialog collects a list of account ids and a money amount.
  The amount input will be the initial balance of these new accounts in the fund.
-->

<script setup lang="ts">
  import { reactive, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import AddButton from "@/components/AddButton.vue";
  import ActionDialog from "@/components/ActionDialog.vue";
  import { useDialog } from "@/composables/ui";
  import { UserAddIcon } from "@heroicons/vue/solid";
  import StringListBuilder from "@/components/StringListBuilder.vue";
  import { PromiseTracker } from "@/models/promise-tracker";
  import TextField from "@/components/TextField.vue";

  const props = defineProps<{
    title: string;
    editMode: boolean;
    addStatus: PromiseTracker;
  }>();

  const emit = defineEmits<{
    (e: "add-accounts", accountIds: string[], balance: string): void;
  }>();

  const dialog = useDialog();

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
    dialog.hide();
  }

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  watch(
    () => props.addStatus.succeeded,
    (succeeded) => {
      if (succeeded) handleCancel();
    },
  );
</script>

<template>
  <AddButton v-if="editMode" class="ml-4" @click="dialog.show" />
  <ActionDialog
    :open="dialog.isOpen.value"
    :status="addStatus"
    :title="title"
    :confirm-label="t('actions.add')"
    :disable-confirm="!state.accountsToAdd.length"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <StringListBuilder
      class="mt-4"
      :text-label="t('account.id')"
      :text-placeholder="t('account.id')"
      :list-title="t('account.idsToAdd')"
      v-model="state.accountsToAdd"
    >
      <template v-slot:addBtnIcon>
        <UserAddIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </template>
    </StringListBuilder>
    <TextField
      class="mt-4"
      :label="t('account.initialBalance')"
      :help-text="t('account.sameInitialBalance')"
      id="initial-balance"
      v-model="state.balance"
      placeholder="0"
    />
  </ActionDialog>
</template>
