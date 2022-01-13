<script setup lang="ts">
  import { PromiseTracker } from "@/models/promise-tracker";
  import Loading from "./Loading.vue";

  defineProps<{
    disabled?: boolean;
    status?: PromiseTracker;
    colorClasses?: string;
  }>();
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="status?.isRunning || disabled"
    :class="
      colorClasses ||
      'text-blue-900 bg-violet-100 hover:bg-violet-200 focus-visible:ring-blue-500'
    "
    class="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"
  >
    <Loading v-if="status?.isLongRunning" />
    <slot v-else></slot>
  </button>
</template>
