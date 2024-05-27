import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

import InputDateDualLocale from '../components/InputDateDualLocale.vue'

describe('InputDateDualLocale', () => {
  test('Should render', async () => {
    const wrapper = mount(InputDateDualLocale, {
      propsData: {
        locale: 'en-US',
        modelValue: ''
      }
    })
    expect(wrapper.find('input').exists()).toBeTruthy()
  })
  test('Should set empty on init', async () => {
    const wrapper = await mount(InputDateDualLocale, {
      propsData: {
        locale: 'en-US',
        modelValue: ''
      }
    })

    // wrapper.find('input').setValue('1__/__/____')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').element.value).toBe('__/__/____')
    expect(wrapper.emitted('update:modelValue')).toStrictEqual([['____-__-__']])
  })

  test('Should accept input', async () => {
    const wrapper = await mount(InputDateDualLocale, {
      propsData: {
        locale: 'en-US',
        modelValue: ''
      }
    })
    wrapper.find('input').setValue('1__/__/____')
    await wrapper.vm.$nextTick()
    //
    expect(wrapper.find('input').element.value).toBe('1_/__/____')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeDefined()
    if (emitted) {
      expect(Array.isArray(emitted)).toBe(true)
      expect(emitted.length).toBe(2)
      expect(emitted[0]).toEqual(['____-__-__'])
      expect(emitted[1]).toEqual(['____-1_-__'])
    }
  })

  test('Should ignore wrong input', async () => {
    const wrapper = await mount(InputDateDualLocale, {
      propsData: {
        locale: 'en-US',
        modelValue: ''
      }
    })
    wrapper.find('input').setValue('2__/__/____')
    await wrapper.vm.$nextTick()
    //
    expect(wrapper.find('input').element.value).toBe('__/__/____')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeDefined()
    if (emitted) {
      expect(Array.isArray(emitted)).toBe(true)
      expect(emitted.length).toBe(2)
      expect(emitted[0]).toEqual(['____-__-__'])
      expect(emitted[1]).toEqual(['____-__-__'])
    }
  })
})
