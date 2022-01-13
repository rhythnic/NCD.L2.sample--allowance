<script setup lang="ts">
  import { inject, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";
  import { buildFundRegistryContractType } from "@/models/fund-registry";
  import { PromiseTracker } from "@/models/promise-tracker";
  import { Wallet } from "@/models/wallet";
  import Loading from "@/components/Loading.vue";
  import CreateFundWidget from "./CreateFundWidget.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const wallet = inject("wallet") as Wallet;

  const buildFundRegistryContract = inject(
    "buildFundRegistryContract",
  ) as buildFundRegistryContractType;

  // state
  const route = useRoute();
  const loadStatus = new PromiseTracker();
  const fundIndex = ref([]);

  const fundRegistry = buildFundRegistryContract();

  onMounted(async () => {
    fundIndex.value = await loadStatus.track(
      fundRegistry.getFundIndex(wallet.getAccountId()),
    );
  });
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="bg-white rounded p-4">
      <div class="flex items-center border-b mb-4 pb-1">
        <h2 class="flex-1">{{ t("fund.managedFunds") }}</h2>
        <CreateFundWidget :fund-registry="fundRegistry" />
      </div>
      <div v-if="loadStatus.isLongRunning">
        <Loading>
          <span class="mt-2">{{ t("fund.loading") }}</span>
        </Loading>
      </div>
      <div v-else-if="loadStatus.failed">
        <p class="text-red-500">
          {{ (loadStatus.error as Error).toString() }}
        </p>
      </div>
      <div v-else-if="fundIndex.length">
        <ul role="list">
          <router-link
            v-for="subaccount in fundIndex"
            :key="subaccount"
            :to="{ name: 'fund', params: { ...route.params, subaccount } }"
          >
            <li class="text-sm text-gray-500">
              {{ `${subaccount}.${fundRegistry.contractId}` }}
            </li>
          </router-link>
        </ul>
      </div>
      <div v-else>
        <p class="text-lg text-gray-500 text-center mt-6">
          {{ t("fund.noFundsPrompt") }}
        </p>
      </div>
    </div>
  </div>
</template>
