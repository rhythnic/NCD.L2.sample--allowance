<!--
  ErrorMessage
  Uses a PromiseTracker to show an error message if an async request fails
-->

<script setup lang="ts">
  import { PromiseTracker } from "@/models/promise-tracker";

  const props = defineProps<{
    status?: PromiseTracker;
  }>();
</script>

<template>
  <p v-if="status?.failed" class="text-red-600">
    {{ status.error?.message }}
  </p>
</template>
