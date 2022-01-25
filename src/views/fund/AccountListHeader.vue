<!--
  AccountListHeader
  Used for Payer/Payee lists.  Header with action buttons.
-->

<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import EditButton from "@/components/EditButton.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    title: string;
    editMode: boolean;
  }>();

  const emit = defineEmits<{
    (e: "setEditMode", editMode: boolean): void;
  }>();
</script>

<template>
  <div class="px-4 pt-4 pb-2 border-b border-gray-200 flex flex-wrap">
    <!-- Title -->
    <div class="mt-2 flex-1 flex items-center">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        {{ title }}
      </h3>
      <EditButton
        class="ml-6"
        :active="editMode"
        @click="emit('setEditMode', !editMode)"
      />
    </div>
    <!-- Actions -->
    <div class="ml-4 mt-2 flex-shrink-0 flex-1 flex justify-end">
      <slot name="actions"></slot>
    </div>
    <div v-if="!editMode" class="flex items-end font-medium text-gray-900">
      <span>{{ t("account.balance") }}</span>
    </div>
  </div>
</template>
