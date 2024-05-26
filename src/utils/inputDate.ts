import { processDateString } from '@/utils/dateUtils'
import { findAddedSymbol, findRemovedSymbol, findChangedSymbol } from '../utils/stringDiff'
export function format(input: InputSpec, locale: string): OutputSpec {
  const divider = '/'
  const placeholder = '_'
  const { oldString, newString, selectionStart } = input
  const prevLen = oldString.length
  const newLen = newString.length

  if (newString === '')
    return { newString: emptyFormatted(divider, placeholder), selectionStart: 0 }

  if (newLen === prevLen) {
    console.log('detect if one changed else reject ')
    if (newLen === 10 && newString.indexOf(placeholder) === -1) {
      const parsedDate: DateObject | null = processDateString(input.newString)
      if (parsedDate) {
        const resultString: string = dateObjectToString(parsedDate, locale, divider)
        if (resultString.length === 10) {
          return { newString: resultString, selectionStart: resultString.length }
        } else {
          return {
            newString: resultString + placeholder + placeholder + placeholder,
            selectionStart: resultString.length
          }
        }
      } else return { newString: oldString, selectionStart: 0 }
    }
  }

  if (prevLen + 1 === newLen) {
    return add(input, locale, divider, placeholder)
  }

  if (prevLen - 1 === newLen) {
    return remove(input, locale, divider, placeholder)
  }

  return { newString: oldString, selectionStart: selectionStart }
}

function change(
  input: InputSpec,
  locale: string,
  divider: string,
  placeholder: string
): OutputSpec {
  const diff = findChangedSymbol(input.oldString, input.newString)
  if (!/^\d$/.test(diff.changedTo))
    return { newString: input.oldString, selectionStart: diff.start.length }

  const mewStr = ''

  return {
    newString: input.newString,
    selectionStart: diff.start.length + 1
  }
}

function add(input: InputSpec, locale: string, divider: string, placeholder: string): OutputSpec {
  const diff = findAddedSymbol(input.oldString, input.newString)
  if (!/^\d$/.test(diff.added))
    return { newString: input.oldString, selectionStart: diff.start.length }

  const mewStr = ''

  return {
    newString: input.newString,
    selectionStart: diff.start.length + 1
  }
}

function remove(
  input: InputSpec,
  locale: string,
  divider: string,
  placeholder: string
): OutputSpec {
  return {
    newString: input.newString,
    selectionStart: 0
  }
}

function emptyFormatted(divider: string, placeholder: string): string {
  return (
    placeholder +
    placeholder +
    divider +
    placeholder +
    placeholder +
    divider +
    placeholder +
    placeholder +
    placeholder +
    placeholder
  )
}

function dateObjectToString(dateObject: DateObject, locale: string, divider: string): string {
  let result: string = ''
  if (locale === 'en-US') {
    result = dateObject.month + divider + dateObject.day + divider
  } else {
    result = dateObject.day + divider + dateObject.month + divider
  }

  if (dateObject.year > 1900 && dateObject.year < 2100) return result + dateObject.year.toString()
  else return result
}
//12/__/2024
