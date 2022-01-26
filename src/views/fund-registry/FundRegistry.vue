<!--
  FundRegistry Page
  Display navigation to the user's funds, and show button to create fund.

  *views FundRegistryContract#getFundIndex
-->

<script setup lang="ts">
  import { inject, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { Wallet, buildFundRegistryContractType } from "@/interfaces";
  import { useState, useAction, ActionStatus } from "@/composables/ui";
  import Loading from "@/components/Loading.vue";
  import ErrorMessage from "@/components/ErrorMessage.vue";
  import SelectableListHeader from '@/components/SelectableListHeader.vue';
  import ActionDialog from "../../components/ActionDialog.vue";
  import DeleteButton from "../../components/DeleteButton.vue";
  import SelectableListRow from '@/components/SelectableListRow.vue';
  import CreateFundWidget from "./CreateFundWidget.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const contractId = inject("contractId") as string;
  const wallet = inject("wallet") as Wallet;

  defineProps<{
    locale: string;
  }>();

  const buildFundRegistryContract = inject(
    "buildFundRegistryContract",
  ) as buildFundRegistryContractType;

  const [editMode, setEditMode] = useState(false);
  const [fundToDelete, setFundToDelete] = useState('');
  const loadAction = useAction();
  const deleteFundAction = useAction();
  const fundIndex = ref<string[]>([]);

  const fundRegistry = buildFundRegistryContract(contractId); 

  onMounted(async () => {
    fundIndex.value = await loadAction.track(
      fundRegistry.getFundIndex(wallet.getAccountId())
    );
    if (!fundIndex.value.length) setEditMode(true);
  });

  function handleConfirmDeleteFund() {
    deleteFundAction.track(fundRegistry.deleteFund(fundToDelete.value));
  }

  function handleCancelDeleteFund() {
    setFundToDelete('');
  }
</script>

<template>
  <div class="flex justify-center items-center">
    <!-- Centered White Panel -->
    <div class="bg-white rounded-lg w-full sm:w-10/12 lg:w-6/12">
      <!-- Header -->
      <SelectableListHeader :title="t('fund.fund', 2)" v-model="editMode">
        <template v-slot:editModeContent>
          <CreateFundWidget :fund-registry="fundRegistry" />
        </template>
      </SelectableListHeader>
      <!-- END Header -->
      <!-- Loading -->
      <div v-if="loadAction.status.value === ActionStatus.LongRunning">
        <Loading>
          <span class="mt-2">{{ t("fund.loading") }}</span>
        </Loading>
      </div>
      <!-- END Loading -->
      <!-- Loading Error -->
      <div v-else-if="loadAction.error.value">
        <ErrorMessage :error="loadAction.error.value" />
      </div>
      <!-- END Loading Error -->
      <!-- Fund List -->
      <div v-else-if="fundIndex.length" class="flow-root">
        <ul role="list" class="divide-y divide-gray-200">
          <li
            v-for="subaccount in fundIndex"
            :key="subaccount"
            class="flex items-center pl-4 py-2 pr-4 h-10"
          >
            <DeleteButton v-if="editMode" @click="setFundToDelete(subaccount)" class="mr-4" />
            <router-link
              class="block w-full h-full text-sm text-gray-500"
              :to="{ name: 'fund', params: { locale, subaccount } }"
            >
              {{ `${subaccount}.${fundRegistry.contractId}` }}
            </router-link>
          </li>
        </ul>
      </div>
      <!-- END Fund List -->
      <!-- No Funds Prompt -->
      <div v-else>
        <p class="text-lg text-gray-500 text-center my-4">
          {{ t("fund.createFundPrompt") }}
        </p>
      </div>
      <!-- END No Funds Prompt -->
    </div>
    <!-- END Centered White Panel -->
  <ActionDialog
    :open="!!fundToDelete"
    :title="t('fund.confirmDelete')"
    :confirm-label="t('actions.delete')"
    :cancel-label="t('actions.cancel')"
    :action-status="deleteFundAction.status"
    :action-error="deleteFundAction.error"
    @cancel="handleCancelDeleteFund"
    @confirm="handleConfirmDeleteFund"
    @done="handleCancelDeleteFund"
  >
    <p class="mt-4">{{ fundToDelete }}</p>
    </ActionDialog>
  </div>
</template>
