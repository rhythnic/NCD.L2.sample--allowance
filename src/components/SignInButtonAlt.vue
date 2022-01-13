<script setup lang="ts">
  import { useI18n } from "vue-i18n";
  import KeyboardStyleButton from "./KeyboardStyleButton.vue";
  import NearTypeSvg from "./NearTypeSvg.vue";
  import { LoginIcon, LogoutIcon } from "@heroicons/vue/outline";

  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
  });
</script>

<template>
  <KeyboardStyleButton :lighted="true" v-bind="$attrs">
    <div class="w-full h-full flex flex-col items-center">
      <LoginIcon class="w-8 h-8" aria-hidden="true" />
      <NearTypeSvg class="w-24 h-12 mt-2" aria-hiddne="true" />
      <!-- <img src="@/assets/near_type_wht_nm.svg" class="w-16 h-8 mt-2"/> -->
    </div>
  </KeyboardStyleButton>
</template>
