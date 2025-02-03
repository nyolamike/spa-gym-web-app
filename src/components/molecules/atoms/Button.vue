<script setup>
import LoadingIcon from "./icons/LoadingIcon.vue"
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    type="button"
    :class="[
      'flex w-full justify-center items-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      (isLoading || isDisabled) ?  'cursor-not-allowed bg-indigo-400 hover:bg-indigo-300' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-500',
    ]"
    :disabled="isLoading || isDisabled"
  >
    <LoadingIcon :if="isLoading" />
    <slot />
  </button>
</template>