<script setup>
import InputLabel from "../atoms/InputLabel.vue"
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
    default: "",
  },
});
</script>

<template>
  <div>
    <InputLabel forHtml="password">Password</InputLabel>
    <div class="">
      <!-- autocomplete="current-password" -->
      <input
        type="password"
        name="password"
        id="password"
        :required="isRequired"
        :placeholder="placeholder"
        :class="[
          'block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
          (isLoading || isDisabled) ?  'cursor-not-allowed bg-gray-100 ' : 'bg-white ',
        ]"
        :disabled="isLoading || isDisabled"
      />
    </div>
  </div>
</template>