<documentation>
  ActionDialog
  Dialog with confirm and cancel buttons and slot for content

  About props.status
  The status prop is a PromiseTracker.  The dialog can remain open during an async request, and close
  on success or display the error message.  Emitting the "success" event on promise resolution allows
  parent components to clean up state.
</documentation>

<script setup lang="ts">
  import { watch } from 'vue';
  import { useI18n } from "vue-i18n";
  import { PromiseTracker } from "@/models/promise-tracker";
  import Dialog from "./DefaultDialog.vue";
  import ErrorMessage from "./ErrorMessage.vue";
  import LoadingButton from "./LoadingButton.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    title: string;
    open: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    status?: PromiseTracker;
    disableConfirm?: boolean;
  }>();

  const emit = defineEmits<{
    (e: "confirm"): void;
    (e: "cancel"): void;
    (e: "success"): void;
  }>();

  watch(
    () => props.status?.succeeded,
    (succeeded) => {
      if (succeeded) emit('success');
    }
  )
</script>

<template>
  <Dialog :open="open" :title="title" v-bind="$attrs">
    <slot></slot>
    <div class="mt-4 flex justify-between">
      <LoadingButton
        @click="emit('confirm')"
        :status="status"
        :disabled="disableConfirm"
      >
        {{ confirmLabel || t("actions.confirm") }}
      </LoadingButton>
      <button
        type="button"
        :disabled="status?.isRunning"
        class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        @click="emit('cancel')"
      >
        {{ cancelLabel || t("actions.cancel") }}
      </button>
    </div>
    <ErrorMessage class="mt-2" :status="status" />
  </Dialog>
</template>
