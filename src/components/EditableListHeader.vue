<!--
  EditableListHeader
  Used for Payer/Payee lists and list of funds.  Header with action buttons.
-->

<script setup lang="ts">
  import EditButton from "./EditButton.vue";

  const props = defineProps<{
    title: string;
    modelValue: boolean;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", editMode: boolean): void;
  }>();
</script>

<template>
  <div class="px-4 pt-4 pb-2 border-b border-gray-200 flex flex-wrap">
    <!-- Title -->
    <div class="mt-2 flex-1 flex items-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ title }}
      </h3>
      <EditButton
        class="ml-6"
        :active="modelValue"
        @click="emit('update:modelValue', !modelValue)"
      />
    </div>
    <!-- Actions -->
    <div v-if="modelValue" class="ml-4 mt-2 flex-shrink-0 flex-1 flex justify-end">
      <slot name="editModeContent"></slot>
    </div>
    <div v-else class="flex items-end font-medium text-gray-900">
      <slot name="viewModeContent"></slot>
    </div>
  </div>
</template>
