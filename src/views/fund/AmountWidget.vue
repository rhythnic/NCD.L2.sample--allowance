<!--
  AmountWidget
  Shows an amount and optionally an icon button.
  Clicking the button opens the dialog, allowing the user to interact with the amount.
-->

<script setup lang="ts">
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { SelectorIcon } from "@heroicons/vue/solid";
  import ActionDialog from "@/components/ActionDialog.vue";
  import IconButton from "@/components/IconButton.vue";
  import NearAmount from "@/providers/near/components/NearAmount.vue";
  import NearInput from "@/providers/near/components/NearInput.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    amount: string;
    confirmLabel: string;
    helpText?: string;
    showActions: boolean;
    inputLabel: string;
  }>();

  const emit = defineEmits<{
    (e: "set-amount", amount: string): void;
  }>();

  const isOpen = ref(false);
  const inputAmount = ref(props.amount);

  function initSetBalance() {
    inputAmount.value = "";
    isOpen.value = true;
  }

  function handleCancel() {
    isOpen.value = false;
  }
</script>

<template>
  <div class="inline-flex items-center text-gray-600">
    <NearAmount :amount="amount" />
    <IconButton v-if="showActions" @click="initSetBalance" class="ml-2">
      <SelectorIcon class="h-6 w-6" aria-hidden="true" />
    </IconButton>
  </div>
  <ActionDialog
    v-if="showActions"
    v-bind="$attrs"
    :title="($attrs.title as string)"
    :open="isOpen"
    :confirm-label="confirmLabel"
    :cancel-label="t('actions.cancel')"
    :disable-confirm="!inputAmount || inputAmount === amount"
    @confirm="emit('set-amount', inputAmount)"
    @cancel="handleCancel"
    @done="handleCancel"
  >
    <NearInput
      class="mt-4"
      id="amount"
      name="amount"
      v-model="inputAmount"
      type="text"
      :label="inputLabel"
      :help-text="helpText"
    />
  </ActionDialog>
</template>
