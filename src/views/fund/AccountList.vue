<documentation>
  AccountList
  Used for Payer/Payee lists.  Shows AccountRows for each account ID, and a header with action buttons.
</documentation>

<script setup lang="ts">
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { PromiseTracker } from "@/models/promise-tracker";
  import { FundContract, UserRole } from "@/models/interfaces";
  import { useEditMode, useDialog } from "@/composables/ui";
  import EditButton from "@/components/EditButton.vue";
  import AccountAddWidget from "./AccountAddWidget.vue";
  import AccountRemoveWidget from "./AccountRemoveWidget.vue";
  import TransferDialog from "./TransferDialog.vue";
  import PayerRow from "./PayerRow.vue";
  import PayeeRow from "./PayeeRow.vue";
  import AccountRow from "./AccountRow.vue";
  import AmountWidget from "@/components/AmountWidget.vue";
  import TransferButton from "@/components/TransferButton.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    role: UserRole;
    accountIds: string[];
    fund: FundContract;
    userIsOwner: boolean;
    addStatus: PromiseTracker;
    removeStatus: PromiseTracker;
  }>();

  const emit = defineEmits<{
    (e: "add-accounts", accountIds: string[], balance: string): void;
    (e: "remove-accounts", accountIds: string[]): void;
  }>();

  const isPayer = props.role === UserRole.Payer;

  const { editMode, toggleEditMode } = useEditMode();
  const accountsToRemove = ref([]);
  const transferDialog = useDialog();
  const recipient = ref("");

  function handleShowTransfer(payeeAccountId: string) {
    recipient.value = payeeAccountId;
    transferDialog.show();
  }

  function handleToggleEdit() {
    accountsToRemove.value = [];
    toggleEditMode();
  }
</script>

<template>
  <section>
    <!-- List header -->
    <div class="px-4 py-4 pb-2 border-b border-gray-200 flex flex-wrap">
      <!-- Title -->
      <div class="mt-2 flex-1">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ t(isPayer ? "payer.payer" : "payee.payee", 2) }}
        </h3>
      </div>
      <!-- Actions -->
      <div class="ml-4 mt-2 flex-shrink-0 flex-1 flex justify-end">
        <AccountRemoveWidget
          :title="t(isPayer ? 'payer.remove' : 'payee.remove')"
          :account-ids="accountsToRemove"
          @confirm="emit('remove-accounts', accountsToRemove)"
          :remove-status="removeStatus"
        />
        <AccountAddWidget
          :title="t(isPayer ? 'payer.add' : 'payee.add')"
          :edit-mode="editMode"
          :add-status="addStatus"
          @add-accounts="
            (accountIds, balance) => emit('add-accounts', accountIds, balance)
          "
        />
        <EditButton class="ml-4" :active="editMode" @click="handleToggleEdit" />
      </div>
    </div>
    <!-- END List header -->

    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200">
        <template v-for="accountId in accountIds" :key="accountId">
          <!-- Payer Row shown for the PayerList -->
          <PayerRow v-if="isPayer" :fund="fund" :account-id="accountId">
            <template v-slot:default="slotProps">
              <AccountRow
                :accountId="accountId"
                :edit-mode="editMode"
                v-model="accountsToRemove"
              >
                <AmountWidget
                  :amount="slotProps.amount"
                  :show-actions="userIsOwner"
                  :promise-tracker="slotProps.setBalanceStatus"
                  :title="t('payer.setBalance')"
                  :confirm-label="t('actions.set')"
                  @set-amount="slotProps.handleSetBalance"
                />
              </AccountRow>
            </template>
          </PayerRow>
          <!-- Payee Row shown for the Payee List -->
          <PayeeRow v-else :fund="fund" :account-id="accountId">
            <template v-slot:default="slotProps">
              <AccountRow
                :accountId="accountId"
                :edit-mode="editMode"
                v-model="accountsToRemove"
              >
                <template v-slot:transfer-button>
                  <TransferButton @click="handleShowTransfer(accountId)" />
                </template>
                <AmountWidget
                  :amount="slotProps.amount"
                  :show-actions="userIsOwner"
                  :promise-tracker="slotProps.setBalanceStatus"
                  :title="t('payee.setBalance')"
                  :confirm-label="t('actions.set')"
                  @set-amount="slotProps.handleSetBalance"
                />
              </AccountRow>
            </template>
          </PayeeRow>
        </template>
      </ul>
    </div>
    <TransferDialog
      :fund="fund"
      :is-open="transferDialog.isOpen.value"
      @close="transferDialog.hide"
      :recipient="recipient"
    />
  </section>
</template>
