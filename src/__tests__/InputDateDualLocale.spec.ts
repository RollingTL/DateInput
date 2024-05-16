import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import InputDateDualLocale from '../components/InputDateDualLocale.vue'

describe('InputDateDualLocale', () => {
  test('Must contain input only', async () => {
    const wrapper = mount(InputDateDualLocale, {})
    const inputElements = wrapper.findAll('input')
    expect(inputElements.length).toBe(1)

    const allElements = wrapper.findAll('*')
    expect(allElements.length).toBe(1)
  })
})
