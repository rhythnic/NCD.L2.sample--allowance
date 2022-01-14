<!--
  KeyboardStyleButton
  Looks like a physical keyboard button
  https://codepen.io/vladracoare/pen/jOPmMap
  Thanks <a href="https://twitter.com/pwign" class="credits__reference">Anh</a> for the inspiration
-->

<script setup lang="ts">
  defineProps<{
    lighted: boolean; // show a neon glow on active
  }>();
</script>

<template>
  <button v-bind="$attrs" class="keyboard-button" :class="lighted && 'lighted'">
    <div class="keyboard-button__content">
      <slot></slot>
    </div>
  </button>
</template>

<style scoped lang="scss">
  @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

  .keyboard-button {
    position: relative;

    padding: 0;

    border: 4px solid #888888;
    outline: none;
    background-color: #f4f5f6;
    border-radius: 40px;
    box-shadow: -6px -20px 35px #ffffff, -6px -10px 15px #ffffff,
      -20px 0px 30px #ffffff, 6px 20px 25px rgba(0, 0, 0, 0.2);
    transition: 0.13s linear;
    cursor: pointer;
    &:active {
      box-shadow: none;
      background-color: transparent;
      .keyboard-button__content {
        box-shadow: none;
      }
    }
    &__content {
      position: relative;

      padding: 20px;
      width: 100%;
      height: 100%;

      box-shadow: inset 0px -8px 0px #dddddd, 0px -8px 0px #f4f5f6;
      border-radius: 40px;
      transition: 0.13s ease-in-out;

      z-index: 1;
    }
  }

  .lighted:active {
    // background-color: #fafafa;
    color: #000;
    box-shadow: 0 0 2px rgba(0, 255, 229, 0.4), 0 0 8px rgba(0, 255, 229, 0.3),
      0 0 14px rgba(0, 255, 229, 0.2), 0 0 22px rgba(0, 255, 229, 0.1);
    border: 3px solid rgba(136, 136, 136, 0.5);
  }
</style>
