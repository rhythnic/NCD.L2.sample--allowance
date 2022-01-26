<!--
  PayerList
  Container to provide payer-context to AccountList in slot

  *views FundContract#getPayers
  *calls FundContract#createPayers
  *calls FundContract#deletePayers
-->

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { FundContract } from "@/interfaces";
  import { useState, useAction } from "@/composables/ui";
  import SelectableListHeader from "@/components/SelectableListHeader.vue";
  import Checkbox from '@/components/Checkbox.vue';
  import AccountAddWidget from "./AccountAddWidget.vue";
  import AccountRemoveWidget from "./AccountRemoveWidget.vue";
  import AccountRow from "./AccountRow.vue";
  import PayerRow from "./PayerRow.vue";
  import AmountWidget from "./AmountWidget.vue";


  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    fund: FundContract;
    userIsOwner: boolean;
  }>();

  const [payerIndex, setPayerIndex] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const accountsToRemove = ref<string[]>([]);
  const loadAction = useAction();
  const createAction = useAction();
  const deleteAction = useAction();

  onMounted(async () => {
    const result = await loadAction.track(props.fund.getPayerIndex());
    setPayerIndex(result);
  });

  function handleCreatePayers(accountIds: string[], balance: string): void {
    createAction.track(props.fund.createPayers(accountIds, balance));
  }

  function handleDeletePayers(): void {
    deleteAction.track(props.fund.deletePayers(accountsToRemove.value));
  }

  function handleSetEdit(editMode: boolean) {
    accountsToRemove.value = [];
    setEditMode(editMode);
  }
</script>

<template>
  <section>
    <!-- List header -->
    <SelectableListHeader
      :title="t('payer.payer', 2)"
      :model-value="editMode"
      @update:model-value="handleSetEdit"
    >
      <template v-slot:editModeContent>
        <AccountRemoveWidget
          :title="t('payer.remove')"
          :account-ids="accountsToRemove"
          @confirm="handleDeletePayers"
          :action-status="deleteAction.status"
          :action-error="deleteAction.error"
        />
        <AccountAddWidget
          :title="t('payer.add')"
          :edit-mode="editMode"
          :action-status="deleteAction.status"
          :action-error="deleteAction.error"
          @add-accounts="handleCreatePayers"
        />
      </template>
      <template slot:viewModeContent>
        <span>{{ t("account.balance") }}</span>
      </template>
    </SelectableListHeader>
    <div class="flow-root">
      <ul role="list" class="divide-y divide-gray-200">
        <PayerRow
          v-for="accountId in payerIndex"
          :fund="fund"
          :account-id="accountId"
        >
          <template v-slot:default="slotProps">
            <AccountRow :label="accountId" :edit-mode="editMode">
              <template v-slot:checkbox>
                <Checkbox v-if="editMode" class="mr-4" v-model="accountsToRemove" :value="accountId" />
              </template>
              <AmountWidget
                :amount="slotProps.amount"
                :show-actions="userIsOwner"
                :action-status="deleteAction.status.value"
                :action-error="deleteAction.error.value"
                :title="t('payer.setBalance')"
                :confirm-label="t('actions.set')"
                :input-label="t('account.amount')"
                @set-amount="slotProps.handleSetBalance"
              />
            </AccountRow>
          </template>
        </PayerRow>
      </ul>
    </div>
  </section>
</template>
