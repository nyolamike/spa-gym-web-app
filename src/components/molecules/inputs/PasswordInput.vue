<script setup>
import { inject, computed } from 'vue'

import InputLabel from "../atoms/InputLabel.vue";
import BaseTextInput from "../atoms/BaseTextInput.vue";
const props = defineProps({
  formKey: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: true,
  }
});

const injectedForm = inject(props.formKey)

const defaultId = `${props.formKey}-${props.field}`

const onInput = (value) => {
  injectedForm.value.fields[props.field].value = value;
}

</script>

<template>
  <div>
    <InputLabel :forHtml="injectedForm?.fields?.[field]?.id??defaultId">
      Password
      <span v-if="injectedForm?.fields?.[field]?.isRequired??true" class="text-red-500">*</span>
    </InputLabel>
    <div class="">
      <!-- 
        todo: add this attribute
        autocomplete="current-password" 
      -->
      <BaseTextInput
        type="password"
        :id="injectedForm?.fields?.[field]?.id??defaultId"
        :required="injectedForm?.fields?.[field]?.isRequired??true"
        :placeholder="injectedForm?.fields?.[field]?.placeholder??''"
        :isDisabled="(injectedForm?.isLoading??false) || ((injectedForm?.fields?.[field]?.isValid??null) === false) || (injectedForm?.fields?.[field]?.isDisabled??false)"
        @input="onInput"
        :value="injectedForm?.fields?.[field]?.value??''"
        :isValid="injectedForm?.fields?.[field]?.isValid??null"
      />
    </div>
    <small v-if="(injectedForm?.fields?.[field]?.errors?.length??0) > 0" class="text-red-500 text-xs mt-1">
      {{ injectedForm?.fields?.[field]?.errors[0] }}
    </small>
  </div>
</template>