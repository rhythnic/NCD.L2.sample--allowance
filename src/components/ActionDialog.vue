<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  } from "@headlessui/vue";
  import { PromiseTracker } from "@/models/PromiseTracker";
  import ErrorMessage from "./ErrorMessage.vue";
  import LoadingButton from "./LoadingButton.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  defineProps<{
    title: string;
    isOpen: boolean;
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
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emit('cancel')">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ title }}
              </DialogTitle>
              <slot></slot>
              <div class="mt-4 flex justify-between">
                <LoadingButton
                  @click="emit('confirm')"
                  :status="status"
                  :disabled="disableConfirm"
                >
                  {{ confirmLabel || t('actions.confirm') }}
                </LoadingButton>
                <button
                  type="button"
                  :disabled="status?.isRunning"
                  class="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  @click="emit('cancel')"
                >
                  {{ cancelLabel || t('actions.cancel') }}
                </button>
              </div>
              <ErrorMessage
                v-if="status"
                class="mt-2"
                :promise-tracker="status"
              />
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
