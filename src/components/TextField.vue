<documentation>
  TextField
  String input with label and help text
</documentation>

<script setup lang="ts">
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
  <div>
    <label
      :for="id"
      class="block text-sm font-medium text-gray-700"
      :class="class"
    >
      {{ label }}
    </label>
    <div class="mt-1">
      <input
        v-bind="$attrs"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="block w-full sm:text-sm rounded-md p-1 shadow-sm border border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        :aria-describedby="id ? `${id}-description` : ''"
      />
    </div>
    <p
      v-if="helpText && id"
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
