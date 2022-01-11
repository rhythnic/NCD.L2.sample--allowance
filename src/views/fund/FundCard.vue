<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import BalanceDialog from "@/components/BalanceDialog.vue";
  import { PromiseTracker } from "@/models/PromiseTracker";
  import { Fund } from "@/models/blockchain";
  import TransferButton from "@/components/TransferButton.vue";
import { useDialog } from "@/composables/ui";
  import TransferDialog from "./TransferDialog.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    fund: Fund;
    owner: string;
    unrestricted_balance: string;
    userIsOwner: boolean;
  }>();

  const setBalanceStatus = new PromiseTracker();
  const transferDialog = useDialog();

  function handleSetBalance(balance: string) {
    setBalanceStatus.track(props.fund.setUnrestrictedBalance(balance));
  }
</script>

<template>
  <section class="bg-white">
    <div class="p-4">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ fund.contractId }}
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">Owner: {{ owner }}</p>
    </div>
    <div class="border-t border-gray-200">
      <div class="divide-y divide-gray-200">
        <div class="p-4 flex items-center justify-between">
          <div class="text-sm font-medium text-gray-500">
            Unrestricted balance
          </div>
          <div class="flex justify-center">
            <TransferButton @click="transferDialog.show" />
          </div>
          <div class="mt-1 flex text-lg text-gray-900 mt-4 sm:mt-0">
            <BalanceDialog
              :balance="unrestricted_balance"
              :show-actions="userIsOwner"
              :promise-tracker="setBalanceStatus"
              :title="t('fund.setUnrestrictedBalance')"
              @set-balance="handleSetBalance"
            />
          </div>
        </div>
      </div>
    </div>
    <TransferDialog :fund="fund" :is-open="transferDialog.isOpen.value" @close="transferDialog.hide"/>
  </section>
</template>
