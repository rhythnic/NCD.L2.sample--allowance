<!--
  CreateFundWidget
  Contains an Add Button and a Dialog with a form for creating a Fund

  *calls FundRegistryContract#createFund
-->

<script setup lang="ts">
  import { inject, computed, ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { FundRegistryContract } from "@/interfaces";
  import { useAction, useState } from "@/composables/ui";
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

  const createFundAction = useAction();
  const [dialogOpen, setDialogOpen] = useState(false);
  const subaccount = ref("");

  const helpText = computed(() =>
    subaccount.value ? `${subaccount.value}.${contractId}` : "",
  );

  function handleCancel() {
    subaccount.value = "";
    setDialogOpen(false);
  }

  function handleConfirm() {
    createFundAction.track(props.fundRegistry.createFund(subaccount.value));
  }
</script>

<template>
  <AddButton @click="setDialogOpen(true)" />
  <ActionDialog
    :open="dialogOpen"
    :action-status="createFundAction.status.value"
    :action-error="createFundAction.error.value"
    :title="t('fund.create')"
    :confirm-label="t('actions.create')"
    :cancel-label="t('actions.cancel')"
    :disable-confirm="!subaccount"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <TextField
      id="subaccount"
      :label="t('account.subaccount')"
      v-model="subaccount"
      :help-text="helpText"
      name="subaccount"
    />
  </ActionDialog>
</template>
