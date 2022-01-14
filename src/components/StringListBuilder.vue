<!--
  StringListBuilder
  An input that maintains a list of strings
  Has one text field for inputing the strings
-->

<script setup lang="ts">
  import { ref } from "vue";
  import { MinusCircleIcon } from "@heroicons/vue/solid";

  const props = defineProps<{
    textLabel: string;
    textPlaceholder: string;
    listTitle: string;
    modelValue: string[];
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", modelValue: string[]): void;
  }>();

  const textField = ref("");

  function addItemToList() {
    if (!props.modelValue.includes(textField.value)) {
      emit("update:modelValue", [...props.modelValue, textField.value]);
    }
    textField.value = "";
  }

  function removeItemFromList(item: string) {
    emit(
      "update:modelValue",
      props.modelValue.filter((x) => x !== item),
    );
  }
</script>

<template>
  <div>
    <div>
      <div>
        <label class="block text-sm font-medium text-gray-700">
          {{ textLabel }}
        </label>
        <div class="mt-1 flex rounded-md shadow-sm">
          <div class="relative flex items-stretch flex-grow focus-within:z-10">
            <input
              v-model="textField"
              type="text"
              name="beneficiary"
              id="beneficiary-input"
              class="block w-full rounded-none rounded-l-md pl-2 sm:text-sm border border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
              :placeholder="textPlaceholder"
              @keyup.enter="addItemToList"
            />
          </div>
          <button
            type="button"
            @click="addItemToList"
            :disabled="!textField"
            class="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <slot name="addBtnIcon" />
          </button>
        </div>
      </div>
    </div>
    <div class="mt-8 pb-8">
      <p class="border-b text-sm text-gray-500">{{ listTitle }}</p>
      <ul class="mt-4">
        <li v-for="item in modelValue" :key="item" class="py-2 mt-2">
          <div class="relative flex items-start">
            <div class="flex items-center h-5">
              <button @click="removeItemFromList(item)">
                <MinusCircleIcon class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <div class="ml-3 text-sm">
              <span class="font-medium text-gray-700">
                {{ item }}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
