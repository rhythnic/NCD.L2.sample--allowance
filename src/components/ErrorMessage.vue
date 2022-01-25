<!--
  ErrorMessage
  Show the message of the error prop in red text
-->

<script setup lang="ts">
  const props = defineProps<{
    error?: Error | null;
  }>();
</script>

<template>
  <p v-if="error" class="text-red-600">
    {{ error?.message }}
  </p>
</template>
