import { processDateString } from '@/utils/dateUtilsMMDD'
export function format(input: InputSpec): OutputSpec {
  // M M / D D / Y Y Y Y
  // 0 1 2 3 4 5 6 7 8 9  = 10
  //
  // 1 2 3 4 5 6 7 8 9 10
  const divider = '/'
  const placeholder = '_'

  // CHECK STRING

  // string EMPTY
  if (input.newString.length === 0) return { newString: '', selectionStart: null }

  // string is DATE
  const parsedDate = processDateString(input.newString)
  if (parsedDate.length > 0) return { newString: parsedDate, selectionStart: parsedDate.length }

  //

  if (parsedDate)
    if (input.newString.length === input.oldString.length + 1) {
      //  CORRECT string and one symbol ADDED
      const output: OutputSpec = {
        newString: processAdd(input, divider, placeholder),
        selectionStart: null
      }
      output.selectionStart = output.newString.length
      return output
    }

  //  CORRECT string and one symbol DELETED
  if (input.newString.length === input.oldString.length - 1) {
    const output: OutputSpec = {
      newString: processDelete(input, divider, placeholder),
      selectionStart: null
    }
    output.selectionStart = output.newString.indexOf(placeholder)

    return output
  }

  return { newString: '', selectionStart: null }
}

function processDelete(input: InputSpec, divider: string, placeholder: string) {
  let start = ''
  let end = ''
  let delPosition: number = 0
  for (let i = 0; i < input.oldString.length; i++) {
    if (input.oldString[i] !== input.newString[i]) {
      start = input.oldString.slice(0, i)
      end = input.oldString.slice(i + 1)
      delPosition = i
      break
    }
  }

  if (start === input.newString) {
    return input.newString
  }

  if (delPosition === 6) {
    return start + placeholder + placeholder + placeholder + placeholder
  }

  if (delPosition === 6) {
    return start + placeholder + placeholder + placeholder + placeholder
  }
  if (delPosition === 3) {
    return start + placeholder + placeholder + end.slice(1)
  }
  if (delPosition === 0) {
    return start + placeholder + placeholder + end.slice(1)
  }

  return start + placeholder + end
}

function processAdd(input: InputSpec, divider: string, placeholder: string) {
  let resultString = ''
  if (input.newString.length === 1) {
    if (testMonthOne(input.newString)) resultString = input.newString
    else resultString = input.oldString
  }
  if (input.newString.length === 2) {
    if (testMonthTwo(input.newString)) resultString = input.newString + divider
    else resultString = input.oldString
  }

  if (input.newString.length === 4) {
    const arr = input.newString.split(divider)
    if (testDayOne(arr[1])) resultString = input.newString
    else resultString = input.oldString
  }
  if (input.newString.length === 5) {
    const arr = input.newString.split(divider)
    if (testDayTwo(arr[1])) resultString = input.newString + divider
    else resultString = input.oldString
  }
  if (input.newString.length > 6) {
    const arr = input.newString.split(divider)
    if (testYearAny(arr[2])) resultString = input.newString
    else resultString = input.oldString
  }

  if (input.newString.length === 11) {
    const underscoreIndex = resultString.indexOf(placeholder)
    if (underscoreIndex === -1) {
      return resultString
    }
    return resultString.slice(0, underscoreIndex) + resultString.slice(underscoreIndex + 1)
  }
  return resultString
}

function testMonthOne(str: string): boolean {
  const regex = /^0|1$/
  return regex.test(str)
}
function testMonthTwo(str: string): boolean {
  const regex = /^(0[1-9]|1[0-2])$/
  return regex.test(str)
}
function testDayOne(str: string): boolean {
  const regex = /^0|1|2|3$/
  return regex.test(str)
}
function testDayTwo(str: string): boolean {
  const regex = /^0[1-9]|1[0-9]|2[0-9]|3[0-1]$/
  return regex.test(str)
}
function testYearAny(str: string): boolean {
  const regex = /^[12]$|^19$|^20$|^19\d{1,2}$|^20\d{1,2}$/
  return regex.test(str)
}
