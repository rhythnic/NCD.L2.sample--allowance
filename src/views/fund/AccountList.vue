<script setup lang="ts">
  import { ref, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import EditButton from "@/components/EditButton.vue";
  import { useEditMode, useDialog } from "@/composables/ui";
  import AccountAdder from "./AccountAdder.vue";
  import AccountRow from "./AccountRow.vue";
  import AccountRemover from "./AccountRemover.vue";
  import { PromiseTracker } from "@/models/PromiseTracker";
  import { Fund, UserRole } from "@/models/blockchain";
  import TransferDialog from "./TransferDialog.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    role: UserRole;
    accountIds: string[];
    fund: Fund;
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
  const recipient = ref('');

  watch(() => accountsToRemove.value, console.log);

  function handleShowTransfer(payeeAccountId: string) {
    recipient.value = payeeAccountId;
    transferDialog.show();
  }
</script>

<template>
  <section class="bg-white rounded-md">
    <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
      <div
        class="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap"
      >
        <div class="ml-4 mt-2">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ t(isPayer ? "payer.payer" : "payee.payee", 2) }}
          </h3>
        </div>
        <div class="ml-4 mt-2 flex-shrink-0">
          <AccountRemover
            :title="t(isPayer ? 'payer.remove' : 'payee.remove')"
            :account-ids="accountsToRemove"
            @confirm="emit('remove-accounts', accountsToRemove)"
            :remove-status="removeStatus"
          />
          <AccountAdder
            :title="t(isPayer ? 'payer.add' : 'payee.add')"
            :edit-mode="editMode"
            :add-status="addStatus"
            @add-accounts="
              (accountIds, balance) => emit('add-accounts', accountIds, balance)
            "
          />
          <EditButton class="ml-4" :active="editMode" @click="toggleEditMode" />
        </div>
      </div>
    </div>
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200">
        <li
          class="flex items-center p-2 space-x-4"
          v-for="accountId in accountIds"
          :key="accountId"
        >
          <div v-if="editMode" class="ml-4">
            <input
              v-model="accountsToRemove"
              :value="accountId"
              type="checkbox"
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mt-0"
            />
          </div>
          <AccountRow
            :is-payer="isPayer"
            :fund="fund"
            :account-id="accountId"
            :edit-mode="editMode"
            :user-is-owner="userIsOwner"
            @show-transfer="handleShowTransfer"
          />
        </li>
      </ul>
    </div>
    <TransferDialog :fund="fund" :is-open="transferDialog.isOpen.value" @close="transferDialog.hide" :recipient="recipient" />
  </section>
</template>
