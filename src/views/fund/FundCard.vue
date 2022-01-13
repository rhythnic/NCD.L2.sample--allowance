<documentation>
  FundCard
  Shows fund info and state, the contract available balance and the fund's unrestricted balance

  *views Account#availableBalance
  *calls FundContract#depositMoney
  *calls FundContract#setUnrestrictedBalance
</documentation>

<script setup lang="ts">
  import { inject, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { PromiseTracker } from "@/models/promise-tracker";
  import { buildAccountType, FundContract } from "@/models/interfaces";
  import { useDialog } from "@/composables/ui";
  import AmountWidget from "@/components/AmountWidget.vue";
  import TransferButton from "@/components/TransferButton.vue";
  import TransferDialog from "./TransferDialog.vue";
  import AccountRow from "./AccountRow.vue";

  const fracDigitLimit = parseInt(
    import.meta.env.VITE_FRAC_DIGIT_LIMIT as string,
  );

  const buildAccount = inject("buildAccount") as buildAccountType;

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    fund: FundContract;
    owner: string;
    unrestrictedBalance: string;
    userIsOwner: boolean;
  }>();

  // state
  const accountAvailableBalance = ref("");
  const transferToFundStatus = new PromiseTracker();
  const setBalanceStatus = new PromiseTracker();
  const transferDialog = useDialog();

  const fundAccount = buildAccount(props.fund.contractId);

  const subaccount = props.fund.contractId.split(".")[0];

  onMounted(async () => {
    accountAvailableBalance.value = await fundAccount.availableBalance(
      fracDigitLimit,
    );
  });

  function handleTransferToFund(amount: string) {
    transferToFundStatus.track(props.fund.depositMoney(amount));
  }

  function handleSetBalance(amount: string) {
    setBalanceStatus.track(props.fund.setUnrestrictedBalance(amount));
  }
</script>

<template>
  <section class="bg-white rounded-lg">
    <!-- Header -->
    <div class="px-4 pt-4 pb-2 flex">
      <div class="flex-1 items-end">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          {{ subaccount }}
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          {{ t("fund.owner") }} {{ owner }}
        </p>
      </div>
      <div class="flex items-end font-medium text-gray-900">
        <span>{{ t("account.balance") }}</span>
      </div>
    </div>
    <!-- END Header -->

    <!-- Balances List -->
    <div class="border-t border-gray-200">
      <div class="divide-y divide-gray-200">
        <!-- Fund Contract Available Balance Row -->
        <AccountRow :accountId="fund.contractId" :edit-mode="false">
          <AmountWidget
            :amount="accountAvailableBalance"
            :show-actions="userIsOwner"
            :promise-tracker="transferToFundStatus"
            :title="t('fund.addMoney')"
            :confirm-label="t('actions.transfer')"
            @set-amount="handleTransferToFund"
          />
        </AccountRow>
         <!-- END Fund Contract Available Balance Row -->
         <!-- Fund Unrestricted Balance Row -->
        <AccountRow :label="t('fund.unrestrictedBalance')" :edit-mode="false">
          <template v-slot:transfer-button>
            <TransferButton @click="transferDialog.show" />
          </template>
          <AmountWidget
            :amount="unrestrictedBalance"
            :show-actions="userIsOwner"
            :promise-tracker="setBalanceStatus"
            :title="t('fund.setUnrestrictedBalance')"
            :confirm-label="t('actions.set')"
            @set-amount="handleSetBalance"
          />
        </AccountRow>
        <!-- END Fund Unrestricted Balance Row -->
      </div>
    </div>
    <!-- END Balances List -->

    <TransferDialog
      :fund="fund"
      :is-open="transferDialog.isOpen.value"
      @close="transferDialog.hide"
    />
  </section>
</template>
