<!-- 
  UrlSearchDetector
  After the user approves a transaction in NEAR Wallet and is redirected back to the app,
  there is a transaction hash in the url search.  This component detects the hash in the url,
  and emits an event.

  NEAR Wallet doesn't redirect back to the application if there was a failure, so this
  component doesn't handle transaction failures.
-->

<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { useRoute } from 'vue-router';

  const props = defineProps<{
    params: string[]
  }>();

  const route = useRoute();

  const paramFound = ref(false);

  onMounted(async () => {
    // when using WebHashHistory, route.query is empty even when transactionHashes is present
    const parsedUrl = new URL(window.location.href);
    const foundParams = props.params.map(name => parsedUrl.searchParams.get(name)).filter(value => value);
    // const transactionHashes = parsedUrl.searchParams.get("transactionHashes");
    if (!foundParams.length) return;

    paramFound.value = true;
    // vue router already sees query as empty, so it doesn't respond to setting it to empty object
    // using window.history as a workaround
    window.history.replaceState({}, document.title, "/#" + route.path);
  });

  function handleSetParamFound(detected: boolean) {
    paramFound.value = detected;
  }
</script>

<template>
  <slot :param-found="paramFound" :set-param-found="handleSetParamFound"></slot>
</template>
