<documentation>
  AmountWidget
  Shows an amount and optionally an icon button.
  Clicking the button opens the dialog, allowing the user to interact with the amount.
</documentation>

<script setup lang="ts">
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import ActionDialog from "./ActionDialog.vue";
  import TextField from "@/components/TextField.vue";
  import { PromiseTracker } from "@/models/promise-tracker";
  import IconButton from "./IconButton.vue";
  import { SelectorIcon } from "@heroicons/vue/solid";
  import NearIcon from "@/components/NearIconSvg.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    status: PromiseTracker;
    amount: string;
    showActions: boolean;
    title: string;
    confirmLabel: string;
    helpText?: string;
  }>();

  const emit = defineEmits<{
    (e: "set-amount", amount: string): void;
  }>();

  const isOpen = ref(false);
  const amount = ref(props.amount);

  function initSetBalance() {
    amount.value = "";
    isOpen.value = true;
  }

  function handleCancel() {
    isOpen.value = false;
  }
</script>

<template>
  <div class="inline-flex items-center text-gray-600">
    <div class="flex items-center justify-end text-right">
      {{ amount }}
      <NearIcon class="w-3 h-3 ml-2 fill-gray-600" />
    </div>
    <IconButton v-if="showActions" @click="initSetBalance" class="ml-2">
      <SelectorIcon class="h-6 w-6" aria-hidden="true" />
    </IconButton>
  </div>
  <ActionDialog
    v-if="showActions"
    :open="isOpen"
    :status="status"
    :title="title"
    :confirm-label="confirmLabel"
    :disable-confirm="!amount || amount === amount"
    @confirm="emit('set-amount', amount)"
    @cancel="handleCancel"
    @success="handleCancel"
  >
    <TextField
      class="mt-4"
      id="amount"
      name="amount"
      v-model="amount"
      type="text"
      :label="t('account.amount')"
      :help-text="helpText"
    />
  </ActionDialog>
</template>
