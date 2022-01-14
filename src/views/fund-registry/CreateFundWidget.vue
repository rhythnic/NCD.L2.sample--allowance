<!--
  CreateFundWidget
  Contains an Add Button and a Dialog with a form for creating a Fund

  *calls FundRegistryContract#createFund
-->

<script setup lang="ts">
  import { inject, computed, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { FundRegistryContract } from "@/models/interfaces";
  import { PromiseTracker } from "@/models/promise-tracker";
  import { useDialog } from "@/composables/ui";
  import AddButton from "@/components/AddButton.vue";
  import ActionDialog from "@/components/ActionDialog.vue";
  import TextField from "@/components/TextField.vue";

  const contractId = inject("contractId") as string;

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    fundRegistry: FundRegistryContract;
  }>();

  const createFundStatus = new PromiseTracker();
  const dialog = useDialog();
  const subaccount = ref("");

  const helpText = computed(() =>
    subaccount.value ? `${subaccount.value}.${contractId}` : "",
  );

  function handleCancel() {
    subaccount.value = "";
    dialog.hide();
  }

  function handleConfirm() {
    createFundStatus.track(props.fundRegistry.createFund(subaccount.value));
  }
</script>

<template>
  <AddButton @click="dialog.show" />
  <ActionDialog
    :open="dialog.isOpen.value"
    :status="createFundStatus"
    :title="t('fund.create')"
    :confirm-label="t('actions.create')"
    :disable-confirm="!subaccount"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <TextField
      id="subaccount"
      :label="t('fund.subaccount')"
      v-model="subaccount"
      :help-text="helpText"
      name="subaccount"
    />
  </ActionDialog>
</template>
