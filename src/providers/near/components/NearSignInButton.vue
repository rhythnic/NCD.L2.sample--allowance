<!--
  NearSignInButton
 -->

<script setup lang="ts">
  import NearIcon from "./NearIconSvg.vue";
</script>

<template>
  <button
    v-bind="$attrs"
    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
  >
    <NearIcon class="w-6 h-6 fill-white" aria-hidden="true" />
    <span class="ml-2"><slot></slot></span>
  </button>
</template>
