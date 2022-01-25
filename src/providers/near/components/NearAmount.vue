<script setup lang="ts">
  import NearIconSvg from "./NearIconSvg.vue";
  defineProps<{
    amount: string;
  }>();
</script>

<template>
  <div class="flex items-center justify-end text-right">
    <span>{{ amount }}</span>
    <NearIconSvg class="w-3 h-3 ml-2 fill-gray-600" />
  </div>
</template>
