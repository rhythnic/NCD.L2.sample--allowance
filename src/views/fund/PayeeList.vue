<!--
  PayeeList
  Show a list of payees.  Support create and delete payees.
-->

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { FundContract } from "@/interfaces";
  import { useState, useAction } from "@/composables/ui";
  import TransferButton from "@/components/TransferButton.vue";
  import Checkbox from '@/components/Checkbox.vue';
  import AccountAddWidget from "./AccountAddWidget.vue";
  import AccountRemoveWidget from "./AccountRemoveWidget.vue";
  import AccountRow from "./AccountRow.vue";
  import PayeeRow from "./PayeeRow.vue";
  import AmountWidget from "./AmountWidget.vue";
  import TransferDialog from "./TransferDialog.vue";
  import EditableListHeader from '@/components/EditableListHeader.vue';

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    fund: FundContract;
    userIsOwner: boolean;
  }>();

  const [payeeIndex, setPayeeIndex] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const accountsToRemove = ref<string[]>([]);
  const loadAction = useAction();
  const createAction = useAction();
  const deleteAction = useAction();

  onMounted(async () => {
    const result = await loadAction.track(props.fund.getPayeeIndex());
    setPayeeIndex(result);
  });

  function handleCreatePayees(accountIds: string[], balance: string): void {
    createAction.track(props.fund.createPayees(accountIds, balance));
  }

  function handleDeletePayees(): void {
    deleteAction.track(props.fund.deletePayees(accountsToRemove.value));
  }

  function handleSetEdit(editMode: boolean) {
    accountsToRemove.value = [];
    setEditMode(editMode);
  }

  function handleShowTransfer(payeeAccountId: string) {
    setRecipient(payeeAccountId);
    setTransferDialogOpen(true);
  }
</script>

<template>
  <section>
    <!-- List header -->
    <EditableListHeader
      :title="t('payee.payee', 2)"
      :model-value="editMode"
      @update:model-value="handleSetEdit"
    >
      <template v-slot:editModeContent>
        <AccountRemoveWidget
          :title="t('payee.remove')"
          :account-ids="accountsToRemove"
          @confirm="handleDeletePayees"
          :action-status="deleteAction.status"
          :action-error="deleteAction.error"
        />
        <AccountAddWidget
          :title="t('payee.add')"
          :edit-mode="editMode"
          :action-status="deleteAction.status"
          :action-error="deleteAction.error"
          @add-accounts="handleCreatePayees"
        />
      </template>
      <template slot:viewModeContent>
        <span>{{ t("account.balance") }}</span>
      </template>
    </EditableListHeader>
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200">
        <PayeeRow
          v-for="accountId in payeeIndex"
          :fund="fund"
          :account-id="accountId"
        >
          <template v-slot:default="slotProps">
            <AccountRow
              :label="accountId"
              :edit-mode="editMode"
              v-model="accountsToRemove"
            >
              <template v-slot:checkbox>
                <Checkbox v-if="editMode" class="mr-4" v-model="accountsToRemove" :value="accountId" />
              </template>
              <template v-slot:transfer-button>
                <TransferButton @click="handleShowTransfer(accountId)" />
              </template>
              <AmountWidget
                :amount="slotProps.amount"
                :show-actions="userIsOwner"
                :action-status="slotProps.actionStatus"
                :action-error="slotProps.actionError"
                :title="t('payee.setBalance')"
                :confirm-label="t('actions.set')"
                :input-label="t('account.amount')"
                @set-amount="slotProps.handleSetBalance"
              />
            </AccountRow>
          </template>
        </PayeeRow>
      </ul>
    </div>
    <TransferDialog
      :fund="fund"
      :is-open="transferDialogOpen"
      @close="setTransferDialogOpen(false)"
      :recipient="recipient"
    />
  </section>
</template>
