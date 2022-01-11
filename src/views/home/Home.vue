<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import { signIn } from "@/composables/auth";
  import SignInButton from "@/components/SignInButton.vue";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });
</script>

<template>
  <div class="flex flex-col pt-16 items-center">
    <p class="text-lg text-gray-500 text-center">
      {{ t("wallet.signInPrompt") }}
    </p>
    <SignInButton
      class="mt-6 grow-0"
      @click="signIn"
      :text="t('wallet.signIn')"
    />
  </div>
</template>
