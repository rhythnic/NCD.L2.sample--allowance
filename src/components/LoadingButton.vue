<!--
  LoadingButton
  Used as a submit button for async actions.
  Shows a spinner instead of the button label if the request is taking a long time.
  Disables the button when the request is in progress.
-->

<script setup lang="ts">
  import { ActionStatus } from "@/composables/ui";
  import Loading from "./Loading.vue";

  defineProps<{
    disabled?: boolean;
    status?: ActionStatus;
    colorClasses?: string;
  }>();
</script>

<template>
  <button
    v-bind="$attrs"
    :disabled="status === ActionStatus.Running || disabled"
    :class="
      colorClasses ||
      'text-blue-900 bg-violet-100 hover:bg-violet-200 focus-visible:ring-blue-500'
    "
    class="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50"
  >
    <Loading v-if="status === ActionStatus.LongRunning" />
    <slot v-else></slot>
  </button>
</template>
