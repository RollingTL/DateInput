<script setup lang="ts">
import InputDateDualLocale from '@/components/InputDateDualLocale.vue'

import { ref } from 'vue'

// "YYYY-MM-DD"
// M M / D D / Y Y Y Y
// America MM/DD/YYYY
// Europe  DD//MM/YYYY
const dataString1 = ref<string>('')
const dataString2 = ref<string>('')
const locale = ref('en-US')
</script>

<template>
  <div class="container">
    <header>
      <div>Locale = {{ locale }}</div>
    </header>

    <section>
      <h1>Model 1</h1>
      <h4>Model = {{ dataString1 }}</h4>
      <InputDateDualLocale v-model="dataString1" locale="en-US" />
      <InputDateDualLocale v-model="dataString1" locale="en-GB" />
    </section>
    <section>
      <h1>Model 2</h1>

      <h4>Model = {{ dataString2 }}</h4>
      <InputDateDualLocale v-model="dataString2" locale="en-US" />
    </section>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 8px;
}
h4 {
  margin-top: 0;
  margin-bottom: 16px;
}
.container {
  padding: 48px;
}

.container header {
  font-size: 18px;
}

.container section {
  font-size: 18px;
  padding-bottom: 1rem;
}
</style>
