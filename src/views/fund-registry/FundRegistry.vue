<!--
  FundRegistry Page
  Display navigation to the user's funds, and show button to create fund.

  *views FundRegistryContract#getFundIndex
-->

<script setup lang="ts">
  import { inject, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { Wallet, buildFundRegistryContractType } from "@/interfaces";
  import { useAction, ActionStatus } from "@/composables/ui";
  import Loading from "@/components/Loading.vue";
  import ErrorMessage from "@/components/ErrorMessage.vue";
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

  const loadAction = useAction();
  const fundIndex = ref([]);

  const fundRegistry = buildFundRegistryContract(contractId);

  onMounted(async () => {
    fundIndex.value = await loadAction.track(
      fundRegistry.getFundIndex(wallet.getAccountId()),
    );
  });
</script>

<template>
  <div class="flex justify-center items-center">
    <!-- Centered White Panel -->
    <div class="bg-white rounded p-4">
      <!-- Header -->
      <div class="flex items-center border-b mb-4 pb-1">
        <h2 class="flex-1">{{ t("fund.fund", 2) }}</h2>
        <CreateFundWidget :fund-registry="fundRegistry" />
      </div>
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
      <div v-else-if="fundIndex.length">
        <ul role="list">
          <router-link
            v-for="subaccount in fundIndex"
            :key="subaccount"
            :to="{ name: 'fund', params: { locale, subaccount } }"
          >
            <li class="text-sm text-gray-500">
              {{ `${subaccount}.${fundRegistry.contractId}` }}
            </li>
          </router-link>
        </ul>
      </div>
      <!-- END Fund List -->
      <!-- No Funds Prompt -->
      <div v-else>
        <p class="text-lg text-gray-500 text-center mt-6">
          {{ t("fund.createFundPrompt") }}
        </p>
      </div>
      <!-- END No Funds Prompt -->
    </div>
    <!-- END Centered White Panel -->
  </div>
</template>
