<script setup lang="ts">
  import { watch } from "vue";
  import { CheckCircleIcon, XIcon } from "@heroicons/vue/solid";
  import { TransitionRoot } from "@headlessui/vue";

  const props = defineProps<{
    ttl?: number;
    modelValue: boolean;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", modelValue: boolean): void;
  }>();

  function closeAlert() {
    emit("update:modelValue", false);
  }

  watch(
    () => props.modelValue,
    (show) => {
      if (show && props.ttl) {
        setTimeout(closeAlert, props.ttl);
      }
    },
  );
</script>

<template>
  <TransitionRoot
    appear
    :show="modelValue"
    enter="transition-opacity duration-75"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="transition-opacity duration-150"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <div class="absolute bottom-0 w-full flex justify-center">
      <div class="rounded-md bg-green-50 p-4 w-full md:max-w-lg">
        <div class="flex">
          <div class="flex-shrink-0">
            <CheckCircleIcon
              class="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-green-800">
              <slot></slot>
            </p>
          </div>
          <div class="ml-auto pl-3">
            <div class="-mx-1.5 -my-1.5">
              <button
                type="button"
                @click="closeAlert"
                class="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
              >
                <span class="sr-only">Dismiss</span>
                <XIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TransitionRoot>
</template>
