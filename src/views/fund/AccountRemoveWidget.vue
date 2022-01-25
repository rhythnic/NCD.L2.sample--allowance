<!--
  AccountRemoveWidget
  When AccountRows are selected, the DeleteButton will be shown.  Clicking the delete button opens a confirm dialog.
-->

<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { useState } from "@/composables/ui";
  import DeleteButton from "@/components/DeleteButton.vue";
  import ActionDialog from "@/components/ActionDialog.vue";

  defineProps<{
    accountIds: string[];
  }>();

  const emit = defineEmits<{
    (e: "confirm"): void;
  }>();

  const [dialogOpen, setDialogOpen] = useState(false);

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });
</script>

<template>
  <DeleteButton v-if="accountIds.length" @click="setDialogOpen(true)" />
  <ActionDialog
    v-bind="$attrs"
    :title="($attrs.title as string)"
    :open="dialogOpen"
    :confirm-label="t('actions.delete')"
    :cancel-label="t('actions.cancel')"
    @cancel="setDialogOpen(false)"
  >
    <ul class="m-4 list-disc">
      <li v-for="accountId in accountIds" :key="accountId">
        {{ accountId }}
      </li>
    </ul>
  </ActionDialog>
</template>
