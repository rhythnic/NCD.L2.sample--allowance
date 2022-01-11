<script setup lang="ts">
  import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/vue/outline";
  import IconButton from "./IconButton.vue";
</script>

<template>
  <IconButton v-bind="$attrs" class="text-gray-500 hover:text-gray-800">
    <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
  </IconButton>
</template>
