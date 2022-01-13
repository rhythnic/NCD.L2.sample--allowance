<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps<{
    label?: string;
    accountId?: string;
    editMode: boolean;
    modelValue: string[];
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", selected: string[]): void;
  }>();

  const selectedAccounts = computed({
    get() {
      return props.modelValue;
    },
    set(value: string[]) {
      console.log("set", value);
      emit("update:modelValue", value);
    },
  });
</script>

<template>
  <li class="flex flex-wrap items-center pl-4 py-2">
    <!-- Checkbox -->
    <div v-if="editMode" class="mr-4">
      <input
        v-model="selectedAccounts"
        :value="accountId"
        type="checkbox"
        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mt-0"
      />
    </div>
    <!-- END Checkbox -->
    <!-- Label -->
    <div class="py-2 text-sm flex-auto sm:basis-auto">
      <span class="font-medium text-gray-600">
        {{ label || accountId }}
      </span>
    </div>
    <!-- END Label -->
    <div
      v-if="!editMode"
      class="flex justify-end mt-2 sm:mt-0 flex-1 sm:flex-0"
    >
      <!-- Transfer Button -->
      <div class="mr-4 sm:mr-16">
        <slot name="transfer-button"></slot>
      </div>
      <!-- END Transfer Button -->

      <!-- AmountWidget -->
      <div class="mx-2">
        <slot></slot>
      </div>
      <!-- END Amount Widet -->
    </div>
  </li>
</template>
