<script setup lang="ts">
  import { PencilIcon as PencilIconSolid } from "@heroicons/vue/solid";
  import IconButton from "./IconButton.vue";

  defineProps<{
    active: boolean;
  }>();
</script>

<template>
  <IconButton
    v-bind="$attrs"
    :class="
      active
        ? 'text-violet-500 hover:text-violet-800'
        : 'text-gray-500 hover:text-gray-800'
    "
  >
    <PencilIconSolid class="h-6 w-6" aria-hidden="true" />
  </IconButton>
</template>
