<!--
  Header
  Application header contains app title, navigation, user menu, and signIn/signOut buttons
-->

<script setup lang="ts">
  import { inject } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRouter, useRoute } from "vue-router";
  import {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from "@headlessui/vue";
  import { MenuIcon, XIcon } from "@heroicons/vue/outline";
  import { ChevronDownIcon } from "@heroicons/vue/solid";
  import { Wallet } from "@/models/interfaces";
  import { supportedLanguages } from "@/i18n";
  import SignInButton from "@/components/NearSignInButton.vue";
  import LocaleSelect from "@/components/LocaleSelect.vue";

  const contractId = inject("contractId") as string;
  const wallet = inject("wallet") as Wallet;

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });

  const authNotRequiredNavigation = [{ name: "nav.learn", href: "#" }];

  const userNavigation = [{ name: "nav.settings", href: "#" }];

  const accountId = wallet.getAccountId();
  const router = useRouter();
  const route = useRoute();

  function handleSignOut(): void {
    wallet.signOut();
    router.push({ name: "home", params: { locale: route.params.locale } });
  }

  function handleLocaleSelect(locale: string): void {
    router.push({ ...route, params: { ...route.params, locale } });
  }

  function signIn() {
    wallet.requestSignIn({ contractId });
  }
</script>

<template>
  <Popover as="header" class="relative">
    <div
      class="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8"
    >
      <!-- App Title Link -->
      <div class="flex justify-start lg:w-0 lg:flex-1">
        <router-link :to="`/${route.params.locale}`" class="flex items-center">
          <img src="@/assets/logo.png" class="w-16 h-16" alt="Allowance logo" />
          {{ t("app.title") }}
        </router-link>
      </div>
      <!-- END App Title Link -->
      <!-- Mobile Menu Buton -->
      <div class="-mr-2 -my-2 md:hidden">
        <PopoverButton
          class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
        >
          <span class="sr-only">Open menu</span>
          <MenuIcon class="h-6 w-6" aria-hidden="true" />
        </PopoverButton>
      </div>
      <!-- END Mobile Menu Buton -->
      <!-- Desktop Auth Not Required Navigation -->
      <PopoverGroup as="nav" class="hidden md:flex space-x-10">
        <a
          v-for="item in authNotRequiredNavigation"
          :key="item.name"
          :href="item.href"
          class="text-base font-medium text-gray-500 hover:text-gray-900"
        >
          {{ t(item.name) }}
        </a>
      </PopoverGroup>
      <!-- END Desktop Auth Not Required Navigation -->
      <!-- Desktop Top Right -->
      <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
        <!-- User Menu -->
        <div class="z-10">
          <Menu
            v-if="accountId"
            as="div"
            class="relative inline-block text-left"
          >
            <div>
              <MenuButton
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-violet-500"
              >
                {{ accountId }}
                <ChevronDownIcon
                  class="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="py-1">
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <a
                      :href="item.href"
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm',
                      ]"
                    >
                      {{ t(item.name) }}
                    </a>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full text-left px-4 py-2 text-sm',
                      ]"
                      @click="handleSignOut"
                    >
                      {{ t("wallet.signOut") }}
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <SignInButton v-else />
        </div>
        <!-- END User Menu -->
        <!-- Desktop Language Selector -->
        <LocaleSelect
          v-if="route.params.locale"
          class="ml-6"
          :languages="supportedLanguages"
          :selected-locale="(route.params.locale as string)"
          @select="handleLocaleSelect"
        />
        <!-- END Desktop Language Selector -->
      </div>
      <!-- END Desktop Top Right -->
    </div>
    <!-- Mobile Menu -->
    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
      >
        <div
          class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50"
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <span v-if="accountId">{{ accountId }}</span>
              </div>
              <!-- Close Mobile Menu Button -->
              <div class="-mr-2">
                <PopoverButton
                  class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
              <!-- END Close Mobile Button -->
            </div>
          </div>
          <div class="py-6 px-5">
            <!-- User Navigation -->
            <div v-if="wallet.isSignedIn()" class="grid grid-cols-2 gap-4 mb-6">
              <a
                v-for="item in userNavigation"
                :key="item.name"
                :href="item.href"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                {{ t(item.name) }}
              </a>
            </div>
            <!-- END User Navigation -->
            <!-- Sign IN/Out Buttons-->
            <div class="mb-6">
              <button
                v-if="accountId"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
                @click="handleSignOut"
              >
                {{ t("wallet.signOut") }}
              </button>
              <SignInButton v-else :long="true" @click="signIn" />
            </div>
            <!-- END Sign IN/Out Buttons-->
            <hr v-if="wallet.isSignedIn()" />
            <!-- Mobile Language Select -->
            <LocaleSelect
              v-if="route.params.locale"
              class="mt-4 mb-6"
              :languages="supportedLanguages"
              :selected-locale="(route.params.locale as string)"
              @select="handleLocaleSelect"
            />
            <!-- END Mobile Language Select -->
            <!-- Mobile Auth Not Required Navigation -->
            <div class="mt-8 grid grid-cols-2 gap-4 pl-1">
              <a
                v-for="item in authNotRequiredNavigation"
                :key="item.name"
                :href="item.href"
                class="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                {{ t(item.name) }}
              </a>
            </div>
            <!-- END Mobile Auth Not Required Navigation -->
          </div>
        </div>
      </PopoverPanel>
    </transition>
    <!-- END Mobile Menu -->
  </Popover>
</template>
