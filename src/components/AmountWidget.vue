<script setup lang="ts">
  import { reactive } from "vue";
  import { useI18n } from "vue-i18n";
  import ActionDialog from "./ActionDialog.vue";
  import TextField from "@/components/TextField.vue";
  import { PromiseTracker } from "@/models/promise-tracker";
  import IconButton from "./IconButton.vue";
  import { SelectorIcon } from "@heroicons/vue/solid";
  import NearIcon from "@/components/NearIcon.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    promiseTracker: PromiseTracker;
    amount: string;
    showActions: boolean;
    title: string;
    confirmLabel: string;
    helpText?: string;
  }>();

  const emit = defineEmits<{
    (e: "set-amount", amount: string): void;
  }>();

  const state = reactive({
    open: false,
    amount: props.amount,
  });

  function initSetBalance() {
    state.amount = "";
    state.open = true;
  }

  function handleCancel() {
    state.open = false;
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
    :is-open="state.open"
    :promise-tracker="promiseTracker"
    :title="title"
    :confirm-label="confirmLabel"
    :disable-confirm="!state.amount || state.amount === amount"
    @confirm="emit('set-amount', state.amount)"
    @cancel="handleCancel"
  >
    <TextField
      class="mt-4"
      id="amount"
      name="amount"
      v-model="state.amount"
      type="text"
      :label="t('account.amount')"
      :help-text="helpText"
    />
  </ActionDialog>
</template>
