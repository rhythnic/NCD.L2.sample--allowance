<!--
  LocaleSelect
  A select input for choosing a language for i18n.
-->

<script setup lang="ts">
  import { computed } from "vue";
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from "@headlessui/vue";
  import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";

  interface Language {
    locale: string;
    name: string;
  }

  const props = defineProps<{
    languages: Language[];
    selectedLocale: string;
  }>();

  const emit = defineEmits<{
    (e: "select", locale: string): void;
  }>();

  const selectedLanguage = computed<Language>(
    () =>
      props.languages.find(
        (language) => language.locale === props.selectedLocale,
      ) as Language,
  );

  function handleSelect({ locale }: Language) {
    emit("select", locale);
  }
</script>

<template>
  <Listbox :model-value="selectedLanguage" @update:model-value="handleSelect">
    <div class="relative">
      <ListboxButton
        class="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-violet-500 sm:text-sm"
      >
        <span class="block truncate">{{ selectedLanguage.name }}</span>
        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="language in languages"
            v-slot="{ active, selected }"
            :key="language.name"
            :value="language"
            as="template"
          >
            <li
              :class="[
                active ? 'text-amber-900 bg-zinc-200' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
              >
                {{ language.name }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <CheckIcon class="w-5 h-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
