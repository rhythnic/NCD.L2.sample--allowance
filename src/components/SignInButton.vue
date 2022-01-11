<script setup lang="ts">
  defineProps<{
    text: string;
  }>();

  const emit = defineEmits<{
    (e: "click"): void;
  }>();
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
    @click="emit('click')"
  >
    {{ text }}
  </button>
</template>
