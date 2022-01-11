<script setup lang="ts">
  const props = defineProps<{
    subaccount: string;
  }>();
</script>

<template>
  <li class="shadow-sm rounded-md">
    {{ subaccount }}
  </li>
</template>
