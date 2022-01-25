<!--
  Home Route
  Home is only accesible when signed out.  If signed in, it will redirect to the /funds route.
  Shows simple hero section with description and sign in button
-->

<script setup lang="ts">
  import { inject } from "vue";
  import { useI18n } from "vue-i18n";
  import { Wallet } from "@/interfaces";
  import SignInButtonAlt from "@/providers/near/components/NearSignInButtonKeyboardStyle.vue";

  const wallet = inject("wallet") as Wallet;
  const contractId = inject("contractId") as string;

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });
</script>

<template>
  <!-- Hero -->
  <section class="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
    <div class="text-center">
      <h1
        class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
      >
        <span class="block xl:inline">{{ t("app.taglinePt1") }}</span>
        {{ " " }}
        <span class="block text-violet-600 xl:inline">{{
          t("app.taglinePt2")
        }}</span>
      </h1>
      <p
        class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
      >
        {{ t("app.description") }}. {{ t("wallet.signInPrompt") }}.
      </p>
      <!-- Sign In Button -->
      <div class="mt-12 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
        <SignInButtonAlt
          class="w-32 h-32"
          :title="t('wallet.signIn')"
          data-testid="signInHome"
          @click="wallet.requestSignIn({ contractId })"
        />
      </div>
      <!-- END Sign In Button -->
    </div>
  </section>
  <!-- END Hero -->
</template>
