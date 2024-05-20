<script setup lang="ts">
import { ref } from 'vue'
import { format } from '../utils/dateProcess'
// M M / D D / Y Y Y Y

// const model:string = defineModel()

// await nextTick()
// if (inputRef.value) {
//   inputRef.value.setSelectionRange(caretPosition, caretPosition)
// }

const props = defineProps<{
  locale: string
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const previousValue = ref('')
previousValue.value = props.modelValue

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const selectionStart = target.selectionStart
  if (!target) return
  ////
  const newValue = format({
    oldString: previousValue.value,
    newString: target.value,
    selectionStart: selectionStart
  })
  ///
  target.value = newValue.newString
  if (newValue.selectionStart) {
    target.setSelectionRange(newValue.selectionStart, newValue.selectionStart)
  } else {
    target.setSelectionRange(selectionStart, selectionStart)
  }
  //
  emit('update:modelValue', newValue.newString)
  previousValue.value = newValue.newString
  ////
}
</script>
<template>
  <input type="text" :value="props.modelValue" @input="onInput" />
</template>

<style scoped>
input {
  font-size: 20px;
  padding: 10px;
  font-family: monospace;
}
</style>
