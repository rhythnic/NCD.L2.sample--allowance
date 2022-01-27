<!-- 
  Checkbox
 -->

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps<{
    modelValue?: string[] | boolean;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", selected: string[] | boolean): void;
  }>();

  const selectedAccounts = computed({
    get() {
      return props.modelValue;
    },
    set(value: string[] | boolean) {
      console.log({ value })
      emit("update:modelValue", value);
    },
  });
</script>

<template>
  <input
    v-bind="$attrs"
    v-model="selectedAccounts"
    type="checkbox"
    class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mt-0"
  />
</template>