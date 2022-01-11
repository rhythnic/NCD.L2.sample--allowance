<script setup lang="ts">
  import { inject, ref, computed, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import AddButton from "@/components/AddButton.vue";
  import ActionDialog from "@/components/ActionDialog.vue";
  import { useDialog } from "@/composables/ui";
  import { FundRegistry } from "@/models/blockchain";
  import { PromiseTracker } from "@/models/PromiseTracker";
  import { CONTRACT_ID } from "@/services/near";
  import TextField from "@/components/TextField.vue";

  const fundRegistry = inject("fundRegistry") as FundRegistry;
  const createFundStatus = new PromiseTracker();
  const dialog = useDialog();
  const subaccount = ref("");

  const helpText = computed(() =>
    subaccount.value ? `${subaccount.value}.${CONTRACT_ID}` : "",
  );

  function handleCancel() {
    subaccount.value = "";
    dialog.hide();
  }

  function handleConfirm() {
    createFundStatus.track(fundRegistry.createFund(subaccount.value));
  }

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });
</script>

<template>
  <div>
    <AddButton @click="dialog.show" />
    <ActionDialog
      :is-open="dialog.isOpen.value"
      :promise-tracker="createFundStatus"
      :title="t('fund.create')"
      :confirm-text="t('actions.create')"
      :disable-confirm="!subaccount"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <div>
        <TextField
          id="subaccount"
          :label="t('fund.subaccount')"
          v-model="subaccount"
          :help-text="helpText"
          name="subaccount"
        />
      </div>
    </ActionDialog>
  </div>
</template>
