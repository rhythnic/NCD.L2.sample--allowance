<script setup lang="ts">
  import { inject, onMounted, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";
  import Loading from "@/components/Loading.vue";
  import FundNavCard from "./FundNavCard.vue";
  import CreateFundDialog from "./CreateFundDialog.vue";
  import { FundRegistry } from "@/models/blockchain";
  import { PromiseTracker } from "@/models/PromiseTracker";

  const fundRegistry = inject("fundRegistry") as FundRegistry;
  const loadStatus = new PromiseTracker();
  const fundIndex = ref([]);

  onMounted(async () => {
    fundIndex.value = await loadStatus.track(fundRegistry.getFundIndex());
  });

  const route = useRoute();

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });
</script>

<template>
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
  <template v-else>
    <h2 class="text-gray-500 text-xs font-medium uppercase tracking-wide">
      {{ t("fund.funds") }}
    </h2>
    <ul
      role="list"
      class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <router-link
        v-for="subaccount in fundIndex"
        :key="subaccount"
        :to="{ name: 'fund', params: { ...route.params, subaccount } }"
      >
        <FundNavCard :subaccount="subaccount" class="col-span-1" />
      </router-link>
      <li><CreateFundDialog /></li>
    </ul>
    <p v-if="!fundIndex.length" class="text-lg text-gray-500 text-center mt-6">
      {{ t("fund.noFundsPrompt") }}
    </p>
  </template>
</template>
