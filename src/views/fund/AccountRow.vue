<!--
  AccountRow
  Template used for the list rows for PayerList, PayeeList, and FundCard
-->

<script setup lang="ts">
  defineProps<{
    label?: string;
  }>();
</script>

<template>
  <li class="flex items-center pl-4 py-2">
    <slot name="checkbox"></slot>
    <!-- Label -->
    <div class="py-2 text-sm flex-auto sm:basis-auto">
      <span class="font-medium text-gray-600">
        {{ label }}
      </span>
    </div>
    <!-- END Label -->
    <div class="flex justify-end mt-2 sm:mt-0 flex-1 sm:flex-0">
      <!-- Transfer Button -->
      <div class="mr-4 sm:mr-16">
        <slot name="transfer-button"></slot>
      </div>
      <!-- END Transfer Button -->

      <!-- AmountWidget -->
      <div class="mx-2">
        <slot></slot>
      </div>
      <!-- END Amount Widet -->
    </div>
  </li>
</template>
