<script setup lang="ts">
  import { reactive } from "vue";
  import { useI18n } from "vue-i18n";
  import ActionDialog from "./ActionDialog.vue";
  import TextField from "@/components/TextField.vue";
  import { PromiseTracker } from "@/models/PromiseTracker";
  import IconButton from "./IconButton.vue";
  import { SelectorIcon } from "@heroicons/vue/solid";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const props = defineProps<{
    promiseTracker: PromiseTracker;
    balance: string;
    showActions: boolean;
    title: string;
    helpText?: string;
  }>();

  const emit = defineEmits<{
    (e: "set-balance", amount: string): void;
  }>();

  const state = reactive({
    open: false,
    balance: props.balance,
  });

  function initSetBalance() {
    state.balance = "";
    state.open = true;
  }

  function handleCancel() {
    state.open = false;
  }
</script>

<template>
  <div class="inline-flex items-center">
    <span>{{ balance }}</span>
    <IconButton v-if="showActions" @click="initSetBalance" class="ml-2">
      <SelectorIcon class="h-6 w-6" aria-hidden="true" />
    </IconButton>
  </div>
  <ActionDialog
    v-if="showActions"
    :is-open="state.open"
    :promise-tracker="promiseTracker"
    :title="title"
    :confirm-label="t('actions.set')"
    :disable-confirm="!state.balance || state.balance === balance"
    @confirm="emit('set-balance', state.balance)"
    @cancel="handleCancel"
  >
    <TextField
      class="mt-4"
      id="balance"
      name="balance"
      v-model="state.balance"
      type="text"
      :label="t('account.balance')"
      :help-text="helpText"
    />
  </ActionDialog>
</template>
