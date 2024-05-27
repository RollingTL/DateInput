<script setup lang="ts">
import InputDateDualLocale from '@/components/InputDateDualLocale.vue'

import { ref } from 'vue'

// "YYYY-MM-DD"
// M M / D D / Y Y Y Y
// America MM/DD/YYYY
// Europe  DD//MM/YYYY
const dataString = ref<string>('')
const locale = ref('en-US')
</script>

<template>
  <div class="container">
    <header>
      <div>Model = {{ dataString }}</div>
      <div>Locale = {{ locale }}</div>
    </header>

    <main>
      <h1>Hello</h1>
      <InputDateDualLocale v-model="dataString" locale="en-US" />
      <InputDateDualLocale v-model="dataString" locale="en-GB" />
    </main>
  </div>
</template>

<style scoped>
.container {
  padding: 48px;
}

.container header {
  font-size: 18px;
}

.container main {
  font-size: 18px;
}
</style>
