<script setup>
import { ref } from "vue";

const emit = defineEmits(["input"]);

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
  isValid: {
    type: Boolean,
    default: null,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: "",
  },
});

function onInput(event) {
  emit("input", event.target.value);
}
</script>

<template>
  <input
    :type="type"
    :name="id"
    :id="id"
    :required="isRequired"
    :placeholder="placeholder"
    :class="[
      'block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
      isLoading || isDisabled ? 'cursor-not-allowed bg-gray-100 ' : 'bg-white ',
      isValid === true || isValid === null ? 'outline-gray-300' : '',
      isValid === false ? 'outline-red-300' : '',
    ]"
    :disabled="isLoading || isDisabled"
    @input.stop.prevent="onInput"
    :value="value"
  />
</template>