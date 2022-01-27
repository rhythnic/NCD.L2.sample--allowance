<!-- 
  NearInput
  Text input the contains "NEAR" svg
 -->

<script setup lang="ts">
  import NearTypeSvg from "./NearTypeSvg.vue";
  const props = defineProps<{
    id: string;
    modelValue: string;
    label: string;
    errorMessage?: string;
    helpText?: string;
    class?: string;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", modelValue: string): void;
  }>();
</script>

<template>
  <div :class="class">
    <label :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        v-bind="$attrs"
        :id="id"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="block w-full sm:text-sm rounded-md p-1 shadow-sm border border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        :aria-describedby="`${id}-description`"
      />
      <div
        class="absolute inset-y-0 right-0 flex items-center pointer-events-none"
      >
        <NearTypeSvg class="h-auto w-16 text-gray-400" aria-hidden="true" />
      </div>
    </div>
    <p
      v-if="helpText"
      :id="`${id}-description`"
      class="mt-2 text-sm text-gray-500"
    >
      {{ helpText }}
    </p>
    <p v-if="errorMessage" class="mt-2 text-sm text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
