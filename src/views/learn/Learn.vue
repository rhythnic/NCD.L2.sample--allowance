<!-- 
  Learn Page
  Link to NEAR University site
 -->

<script setup lang="ts">
  import { useI18n } from "vue-i18n";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });
</script>

<template>
  <div class="text-center mt-8">
    <h2 class="text-3xl">{{ t('learn.learnToBuildNearDapps') }}</h2>
    
    <p class="mt-4 text-sm text-gray-600">{{ t('learn.madeForNcd') }}</p>

    <a href="https://www.near.university/" class="mt-16 inline-block bg-white rounded-lg p-4 shadow-lg">
      <img src="@/assets/nearedu_logo.svg" alt="NEAR University logo" />
    </a>
    <p class="mt-2 text-sm text-gray-600">{{ t('learn.nearEduTeachesNear') }}</p>
  </div>

</template>