<!--
  SelectableListRow
  A row in the AccountList
  Shows account ID or label, a transfer money button (used for payees and to deposit mooney to contract),
  and a balance associated with the account.  The balance uses a widget so users can interact with the balance.

  About Balances
  All users (payers and payees) have a balance that decreases with each transaction in which the user account is involved.
  Payers are unable to transfer money that would cause either the payer or payee balance to be negative.
  Clicking on the trigger for the AmountWidget allows the fund owner to set the balance.

  About Transfer Button
  It shows on Payee rows so users can send money to payees.  It shows on the unrestricted balance row in the fund card
  so users can make a transfer to a recipient that is not a payee.
-->

<script setup lang="ts">
  import { computed } from "vue";

  const props = defineProps<{
    editMode: boolean;
    modelValue?: string[];
    value: string;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", selected: string[]): void;
  }>();

  const selectedAccounts = computed({
    get() {
      return props.modelValue || [];
    },
    set(value: string[]) {
      emit("update:modelValue", value);
    },
  });
</script>

<template>
  <li class="flex items-center pl-4 py-2">
    <!-- Checkbox -->
    <div v-if="editMode" class="mr-4">
      <input
        v-model="selectedAccounts"
        :value="value"
        type="checkbox"
        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded mt-0"
      />
    </div>
    <!-- END Checkbox -->
    <slot></slot>
  </li>
</template>
