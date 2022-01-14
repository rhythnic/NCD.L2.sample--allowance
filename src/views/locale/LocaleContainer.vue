<!--
  LocaleContainer
  All routes are nested under a :locale parameter in the route path
  This component watches the :locale param and instructs i18n to update the locale
-->

<script setup lang="ts">
  import { watch, onMounted, nextTick } from "vue";
  import { useRoute } from "vue-router";
  import { i18n, setLocale } from "../../i18n";

  const route = useRoute();

  onMounted(async () => {
    await setLocale(i18n, route.params.locale as string, document);
    nextTick();
  });

  watch(
    () => route.params.locale,
    async (locale) => {
      await setLocale(i18n, locale as string, document);
      nextTick();
    },
  );
</script>

<template>
  <router-view></router-view>
</template>
