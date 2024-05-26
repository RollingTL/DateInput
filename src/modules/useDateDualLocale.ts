import { ref, onMounted, onUnmounted } from 'vue'
import { findSymbolChange } from '@/utils/symbolDiff'
import { parseAmericanDate, parseEuropeanDate } from '../utils/dateUtils'
// M M / D D / Y Y Y Y
// 0 1 2 3 4 5 6 7 8 9  = 10
//
// 1 2 3 4 5 6 7 8 9 10

export function useDateDualLocale() {
  const divider = '/'
  const placeholder = '_'

  const locale = ref('en-US')
  const dayStr = ref(placeholder + placeholder)
  const monthStr = ref(placeholder + placeholder)
  const yearStr = ref(placeholder + placeholder + placeholder + placeholder)
  const normalLength = 10

  const previous = ref('')
  const cursor = ref<number | null>(null)
  function set(input: TextInputData) {
    if (input.str === '') {
      dayStr.value = placeholder + placeholder
      monthStr.value = placeholder + placeholder
      yearStr.value = placeholder + placeholder + placeholder + placeholder
      cursor.value = 0
      previous.value = get().str
      return
    }

    const diff = findSymbolChange(previous.value, input.str)
    if (!diff) return
    //
    if (!diff.changedTo.match(/^\d$|^$/)) {
      return
    }
    //
    let newStr = ''
    if (diff.changedFrom === '' && diff.changedTo !== '') {
      console.log('INSERT ------------------------------------!!!')
      newStr = diff.start + diff.changedTo + diff.end.slice(1)
    }
    if (diff.changedFrom !== '' && diff.changedTo === '') {
      console.log('DELETE ------------------------------------!!!', diff)
      if (diff.changedFrom === placeholder) return
      if (diff.changedFrom === divider) {
        newStr = diff.start.slice(0, -1) + placeholder + divider + diff.end
      } else {
        let dummyEnd = diff.end
        if (dummyEnd.length < 4) dummyEnd = dummyEnd.replace(/./g, '_')
        if (dummyEnd.length === 6) dummyEnd = placeholder + dummyEnd.slice(1)
        if (dummyEnd.length === 9) dummyEnd = placeholder + dummyEnd.slice(1)
        newStr = diff.start + placeholder + dummyEnd
      }
    }
    if (diff.changedFrom !== '' && diff.changedTo !== '') {
      console.log('CHANGE ------------------------------------!!!')
      newStr = diff.start + diff.changedTo + diff.end
    }
    ///////////////////////////////////////////////////////
    const newArr = newStr.split('/')
    let newMonth: string = ''
    let newDay: string = ''
    let newYear: string = ''
    if (locale.value === 'en-US') {
      newMonth = newArr[0]
      newDay = newArr[1]
      newYear = newArr[2]
    } else {
      newMonth = newArr[1]
      newDay = newArr[0]
      newYear = newArr[2]
    }

    if (!testMonth(newMonth)) return
    if (!testDay(newDay)) return
    if (!testYear(newYear)) return

    if ((newDay + newMonth).indexOf(placeholder) === -1) {
      let dummyYear = ''
      if (newYear.lastIndexOf(placeholder) === -1) {
        dummyYear = newYear
      } else {
        dummyYear = '1980'
      }
      if (locale.value === 'en-US') {
        if (parseAmericanDate(newMonth + divider + newDay + divider + dummyYear) === null) return
      } else {
        if (parseEuropeanDate(newDay + divider + newMonth + divider + dummyYear) === null) return
      }
    }

    monthStr.value = newMonth
    dayStr.value = newDay
    yearStr.value = newYear

    previous.value = get().str
    return
  }

  function testMonth(str: string): boolean {
    const regex = /^__$|^(0|1)_$|^(0[1-9]|1[0-2])$/
    return regex.test(str)
  }
  function testDay(str: string): boolean {
    const regex = /^__$|^(0|1|2|3)_$|^0[1-9]|1[0-9]|2[0-9]|3[0-1]$/
    return regex.test(str)
  }
  function testYear(str: string): boolean {
    const regex = /^____$|^[12]___$|^(19|20)__$|^(19|20)\d_$|^(19|20)\d\d$/
    return regex.test(str)
  }
  function get(): TextInputData {
    let str: string
    if (locale.value === 'en-US') {
      str = monthStr.value + divider + dayStr.value + divider + yearStr.value
    } else {
      str = dayStr.value + divider + monthStr.value + divider + yearStr.value
    }
    let newCursorPosition = str.indexOf(placeholder)
    if (newCursorPosition === -1) newCursorPosition = str.length
    return { str: str, cursor: newCursorPosition }
  }

  return { set, get }
}
