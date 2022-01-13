<documentation>
  NearSignInButtonKeyboardStyle
  Uses the KeyboardStyleButton for a 3D button press effect
</documentation>

<script setup lang="ts">
  import KeyboardStyleButton from "./KeyboardStyleButton.vue";
  import NearTypeSvg from "./NearTypeSvg.vue";
  import { LoginIcon } from "@heroicons/vue/outline";
</script>

<template>
  <KeyboardStyleButton :lighted="true" v-bind="$attrs">
    <div class="w-full h-full flex flex-col items-center">
      <LoginIcon class="w-8 h-8" aria-hidden="true" />
      <NearTypeSvg class="w-24 h-12 mt-2" aria-hiddne="true" />
    </div>
  </KeyboardStyleButton>
</template>
