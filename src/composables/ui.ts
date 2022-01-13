/**
 * Composables for common UI state
 */

import { ref } from "vue";

export function useDialog() {
  const isOpen = ref<boolean>(false);

  function show() {
    isOpen.value = true;
  }

  function hide() {
    isOpen.value = false;
  }

  return {
    isOpen,
    show,
    hide,
  };
}

export function useEditMode() {
  const editMode = ref<boolean>(false);

  function toggleEditMode() {
    editMode.value = !editMode.value;
  }

  return {
    editMode,
    toggleEditMode,
  };
}
