<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { PromiseTracker } from "@/models/promise-tracker";
  import Dialog from "./DefaultDialog.vue";
  import ErrorMessage from "./ErrorMessage.vue";
  import LoadingButton from "./LoadingButton.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  defineProps<{
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
  }>();
</script>

<template>
  <Dialog :title="title" v-bind="$attrs">
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
    <ErrorMessage v-if="status" class="mt-2" :promise-tracker="status" />
  </Dialog>
</template>
