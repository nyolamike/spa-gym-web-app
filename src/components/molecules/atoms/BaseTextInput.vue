<script setup>
import { ref } from "vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: "Enter Phone Number",
  },
  type: {
    type: String,
    default: "text",
  },
});

const vModelValue = ref("");
</script>

<template>
  <input
    :type="type"
    v-model="vModelValue"
    :required="isRequired"
    :placeholder="placeholder"
    :class="[
      'w-full sm:flex-1 appearance-none border border-gray-300 rounded-b-md rounded-t-none py-2 px-3 leading-tight focus:outline-none focus:border-blue-500',
      isLoading || isDisabled ? 'cursor-not-allowed bg-gray-100 ' : 'bg-white ',
    ]"
    :disabled="isLoading || isDisabled"
  />
</template>