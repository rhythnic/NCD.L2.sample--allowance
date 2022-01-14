<!-- 
  DeleteButton
-->

<script setup lang="ts">
  import { TrashIcon } from "@heroicons/vue/solid";
  import IconButton from "./IconButton.vue";
</script>

<template>
  <IconButton v-bind="$attrs" class="text-red-500 hover:text-red-800">
    <TrashIcon class="h-6 w-6" aria-hidden="true" />
  </IconButton>
</template>
