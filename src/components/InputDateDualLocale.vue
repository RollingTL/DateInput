<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useDateDualLocale } from '@/modules/useDateDualLocale'
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

const inputElement = ref<HTMLInputElement | null>(null)

///
const { set, get } = useDateDualLocale()

onMounted(() => {
  if (!inputElement.value) return
  set({ str: props.modelValue, cursor: 0 })
  const initial = get()
  inputElement.value.value = initial.str
  inputElement.value.setSelectionRange(initial.cursor, initial.cursor)
  emit('update:modelValue', initial.str)
})

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target) return
  const selectionStart = target.selectionStart
  set({ str: target.value, cursor: selectionStart })
  const result = get()
  target.value = result.str
  emit('update:modelValue', result.str)
  if (result.cursor !== null) {
    target.setSelectionRange(result.cursor, result.cursor)
  }
}
</script>
<template>
  <input ref="inputElement" type="text" :value="props.modelValue" @input="onInput" />
  <br />
</template>

<style scoped>
input {
  font-size: 20px;
  padding: 10px;
  font-family: monospace;
}
</style>
