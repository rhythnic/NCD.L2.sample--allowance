<!--
  LocaleContainer
  All routes are nested under a :locale parameter in the route path
  This component watches the :locale param and instructs i18n to update the locale
-->

<script setup lang="ts">
  import { watch, onMounted, nextTick } from "vue";
  import { useI18n } from "vue-i18n";

  const props = defineProps<{
    locale: string;
  }>();

  const i18n = useI18n();

  onMounted(setLocale);

  watch(() => props.locale, setLocale);

  async function setLocale(): Promise<void> {
    if (!i18n.availableLocales.includes(props.locale)) {
      const messages = await import(`../locales/${props.locale}.json`);
      i18n.setLocaleMessage(props.locale, messages.default);
    }
    i18n.locale.value = props.locale;
    (document.querySelector("html") as HTMLElement).setAttribute(
      "lang",
      props.locale,
    );
    nextTick();
  }
</script>

<template><slot></slot>></template>
