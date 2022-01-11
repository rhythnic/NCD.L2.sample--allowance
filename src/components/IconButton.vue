<template>
  <button
    v-bind="$attrs"
    type="button"
    class="inline-flex items-center p-1 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-gray-100 focus:ring-gray-500"
  >
    <slot></slot>
  </button>
</template>
