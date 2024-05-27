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
  test('Must contain one input element', async () => {
    const wrapper = await mount(InputDateDualLocale, {
      propsData: {
        locale: 'en-US',
        modelValue: ''
      }
    })
    // wrapper.find('input').setValue('')
    // await wrapper.vm.$nextTick()
    // expect(wrapper.find('input').element.value).toBe('__/__/____')
    wrapper.find('input').setValue('1__/__/____')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('input').element.value).toBe('1_/__/____')
  })
  // ////////////////////
  // test('Initial value is set', async () => {
  //   const wrapper = await mount(InputDateDualLocale, {
  //     propsData: {
  //       locale: 'en-US',
  //       modelValue: ''
  //     }
  //   })
  //   wrapper.setProps({
  //     'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
  //   })
  //   expect(wrapper.props('modelValue')).toBe('__/__/____')
  // })
  ////////////////////
  // test('Initial input works', async () => {
  //   const wrapper = await mount(InputDateDualLocale, {
  //     propsData: {
  //       locale: 'en-US',
  //       modelValue: ''
  //     }
  //   })
  //   const input = await wrapper.find('input')
  //   console.log(input['wrapperElement'].value)

  //   wrapper.vm.onVnodeMounted = async () => {
  //     console.log('==========')

  //     const input = await wrapper.find('input')
  //     console.log(input)

  //     input.element.value = '++++'
  //     input.trigger('input')
  //     console.log(input['wrapperElement'].value)
  //     expect(input.element.value).toBe('__')
  //   }
  // })
  ////////////////////
  // test('Initial value input', async () => {
  //   const wrapper = mount(InputDateDualLocale, {
  //     propsData: {
  //       locale: 'en-US',
  //       modelValue: '__/__/____'
  //     }
  //   })
  //   wrapper.setProps({
  //     'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
  //   })
  //   wrapper.find('input').setValue('1__/__/____')
  //   expect(wrapper.props('modelValue')).toBe('__/__/____')
  // })
})
