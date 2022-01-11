<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import DeleteButton from "@/components/DeleteButton.vue";
  import ActionDialog from "@/components/ActionDialog.vue";
  import { useDialog } from "@/composables/ui";
  import { PromiseTracker } from "@/models/PromiseTracker";

  const props = defineProps<{
    title: string;
    accountIds: string[];
    removeStatus: PromiseTracker;
  }>();

  const emit = defineEmits<{
    (e: "confirm"): void;
  }>();

  const dialog = useDialog();

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });
</script>

<template>
  <DeleteButton v-if="accountIds.length" @click="dialog.show" />
  <ActionDialog
    :is-open="dialog.isOpen.value"
    :promise-tracker="removeStatus"
    :title="title"
    :confirm-label="t('actions.delete')"
    @cancel="dialog.hide"
    @confirm="emit('confirm')"
  >
    <ul class="m-4 list-disc">
      <li v-for="accountId in accountIds" :key="accountId">
        {{ accountId }}
      </li>
    </ul>
  </ActionDialog>
</template>
