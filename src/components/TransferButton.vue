<script setup lang="ts">
  import { PaperAirplaneIcon } from "@heroicons/vue/solid";
  import IconButton from "./IconButton.vue";
</script>

<template>
  <IconButton v-bind="$attrs" class="text-gray-500 hover:text-gray-800">
    <PaperAirplaneIcon class="h-6 w-6 rotate-90" aria-hidden="true" />
  </IconButton>
</template>
