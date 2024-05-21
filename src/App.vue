<script setup lang="ts">
import InputDateDualLocale from '@/components/InputDateDualLocale.vue'
import { format } from '@/utils/dateProcess'
import { ref } from 'vue'

// "YYYY-MM-DD"
// M M / D D / Y Y Y Y
// America MM/DD/YYYY
// Europe  DD//MM/YYYY
const dataString = ref<string>('')

// console.log(
//   format({
//     oldString: '',
//     newString: '13/01/2023',
//     selectionStart: 0
//   })
// )
// console.log(
//   format({
//     oldString: '',
//     newString: '1',
//     selectionStart: 0
//   })
// )
</script>

<template>
  <header>
    <div>dataString = {{ dataString }}</div>
  </header>

  <main>
    <h1>Hello</h1>
    <InputDateDualLocale v-model="dataString" locale="ru_RU" />
    <br />
    <br />
    <input type="text" />
    <br />
    <br />
    <div>
      <h3>05/19/2024</h3>
      <h3>02/29/2024</h3>
      <h3>31/12/1899</h3>
    </div>
  </main>
</template>

<style scoped>
header {
  font-size: 18px;
}
main {
  font-size: 18px;
}
</style>
