<script setup>
const props = defineProps({
  forHtml: {
    type: String,
    default: '',
  },
});
</script>

<template>
    <label :for="forHtml" class="block text-gray-700 text-sm/6 font-bold" >
      <slot />
    </label>
</template>