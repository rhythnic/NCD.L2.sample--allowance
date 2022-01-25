<!--
  ActionDialog
  Dialog with confirm and cancel buttons and slot for content

  About props.actionStatus
  The dialog can remain open during an async request, and display the error message if the request fails.
-->

<script setup lang="ts">
  import { watch } from "vue";
  import Dialog from "./DefaultDialog.vue";
  import ErrorMessage from "./ErrorMessage.vue";
  import LoadingButton from "./LoadingButton.vue";
  import { ActionStatus } from "@/composables/ui";

  const props = defineProps<{
    title: string;
    open: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    actionStatus?: ActionStatus;
    actionError?: Error | null;
    disableConfirm?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "confirm"): void;
    (e: "cancel"): void;
    (e: "done"): void;
  }>();

  watch(
    () => props.actionStatus,
    (status) => {
      if (status === ActionStatus.Succeeded) emit("done");
    },
  );
</script>

<template>
  <Dialog v-bind="$attrs" :open="open" :title="title">
    <slot></slot>
    <div class="mt-4 flex justify-between">
      <LoadingButton
        @click="emit('confirm')"
        :actionStatus="actionStatus"
        :disabled="disableConfirm"
      >
        {{ confirmLabel }}
      </LoadingButton>
      <button
        type="button"
        :disabled="actionStatus === ActionStatus.Running"
        class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        @click="emit('cancel')"
      >
        {{ cancelLabel }}
      </button>
    </div>
    <ErrorMessage class="mt-2" :error="actionError" />
  </Dialog>
</template>
