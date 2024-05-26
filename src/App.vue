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
    <InputDateDualLocale v-model="dataString" locale="en_US" />
    <br />
    <br />
    <input type="text" />
    <br />
    <br />
    <div>
      en-US
      <h3>12/31/2024</h3>
      <h3>02/29/2023</h3>
      <h3>02/29/2024</h3>
      en-GB
      <h3>31/12/2024</h3>
      <h3>29/02/2023</h3>
      <h3>29/02/2024</h3>
      ISO
      <h3>2024-12-31</h3>
      <h3>2023-02-29</h3>
      <h3>2024-02-29</h3>
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
