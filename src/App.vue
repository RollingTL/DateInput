<script setup lang="ts">
import InputDateDualLocale from '@/components/InputDateDualLocale.vue'
import { processDateString, parseAmericanDate, parseEuropeanDate } from '@/utils/dateUtilsMMDD'
import { ref } from 'vue'

// "YYYY-MM-DD"
// M M / D D / Y Y Y Y
// America MM/DD/YYYY
// Europe  DD//MM/YYYY
const dataString = ref<string>('')

// console.log(parseAmericanDate('13/01/2023'))
console.log(processDateString('13/01/2023'))
// console.log(parseAmericanDate('05/19/2024'))
// console.log(processDateString('19/05/2024'))
// console.log(processDateString('05/19/2024'))
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
  </main>
</template>

<style scoped>
header {
  font-size: 18px;
}
</style>
