<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

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

const labelFormat = computed(() => {
  if (props.locale === 'en-US') {
    return 'MM/DD/YYYY'
  } else {
    return 'DD/MM/YYYY'
  }
})
///
const { set, get, setLocale } = useDateDualLocale()

onMounted(() => {
  setLocale(props.locale)
  if (!inputElement.value) return
  set({ str: fromISO(props.modelValue), cursor: 0 })
  const initial = get()
  inputElement.value.value = initial.str
  inputElement.value.setSelectionRange(initial.cursor, initial.cursor)
  emit('update:modelValue', toISO(initial.str))
})

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target) return
  const selectionStart = target.selectionStart
  set({ str: target.value, cursor: selectionStart })
  const result = get()
  target.value = result.str
  emit('update:modelValue', toISO(result.str))
  if (result.cursor !== null) {
    target.setSelectionRange(result.cursor, result.cursor)
  }
}

const fromISO = (str: string) => {
  if (str === '') return ''
  const arr = str.split('-')
  if (arr.length !== 3) return ''
  if (props.locale === 'en-US') {
    return arr[1] + '/' + arr[2] + '/' + arr[0]
  } else {
    return arr[2] + '/' + arr[1] + '/' + arr[0]
  }
}

const toISO = (str: string): string => {
  if (str === '') return ''
  const arr = str.split('/')
  if (arr.length !== 3) return ''

  if (props.locale === 'en-US') {
    return arr[2] + '-' + arr[0] + '-' + arr[1]
  } else {
    return arr[2] + '-' + arr[1] + '-' + arr[0]
  }
}
</script>
<template>
  <div class="group">
    <label class="label">{{ labelFormat }} 1900 to 2099</label>
    <br />
    <input
      ref="inputElement"
      type="text"
      :value="fromISO(props.modelValue)"
      @input="onInput"
      inputmode="numeric"
      pattern="[0-9]*"
    />
  </div>
</template>

<style scoped>
.group {
  margin-bottom: 1rem;
}

.group input {
  font-size: 20px;
  padding: 10px;
  font-family: monospace;
  width: 10ch;
}

.group .label {
  font-size: 10px;
  color: #8d8d8d;
  padding-left: 2px;
  font-family: monospace;
}
</style>
