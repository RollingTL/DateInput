import { describe, expect, test } from 'vitest'
import { format } from '../utils/dateProcess'

describe('format', () => {
  test('Full date works', async () => {
    expect(
      format({
        oldString: '',
        newString: '1999-04-01',
        selectionStart: 0
      })
    ).toEqual({
      newString: '04/01/1999',
      selectionStart: 10
    })
    expect(
      format({
        oldString: '',
        newString: '1999-04-31',
        selectionStart: 0
      })
    ).toEqual({
      newString: '',
      selectionStart: null
    })
  })
})
