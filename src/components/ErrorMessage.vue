<script setup lang="ts">
  import { PromiseTracker } from "@/lib/PromiseTracker";

  const props = defineProps<{
    promiseTracker: PromiseTracker;
  }>();
</script>

<template>
  <p v-if="promiseTracker.failed" class="text-red-600">
    {{ promiseTracker.error?.message }}
  </p>
</template>
