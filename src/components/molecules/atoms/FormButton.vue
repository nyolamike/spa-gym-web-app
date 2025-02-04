<script setup>
import { inject, computed } from 'vue'
import LoadingIcon from "./icons/LoadingIcon.vue"

const emit = defineEmits(["on-click", "on-click-clear-errors"]);

const props = defineProps({
  formKey: {
    type: String,
    required: true,
  }
});

const injectedForm = inject(props.formKey)

const onClick = (event) => {
    emit("on-click-submit", event);
}

const onClickClearFormErrors =  (event) => {
    emit("on-click-clear-errors", event);
}

</script>

<template>
  <button
    v-if="((injectedForm?.isValid??true) === true)"
    type="button"
    :class="[
      'flex w-full justify-center items-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      ((injectedForm?.isLoading??false) || ((injectedForm?.isValid??true) === false)) ?  'cursor-not-allowed bg-indigo-400 hover:bg-indigo-300' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-500',
    ]"
    :disabled="(injectedForm?.isLoading??false) || ((injectedForm?.isValid??true) === false)"
    @click.stop.prevent="onClick"
  >
    <LoadingIcon v-if="injectedForm?.isLoading??false" />
    <slot />
  </button>

  <button
    v-else
    type="button"
    :class="[
      'flex w-full justify-center items-center rounded-md  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      ((injectedForm?.isLoading??false)) ?  'cursor-not-allowed bg-indigo-400 hover:bg-indigo-300' : 'cursor-pointer bg-indigo-600 hover:bg-indigo-500',
    ]"
    @click.stop.prevent="onClickClearFormErrors"
  >
    Clear Form Errors
  </button>
</template>