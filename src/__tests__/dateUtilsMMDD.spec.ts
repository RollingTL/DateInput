import { describe, expect, test } from 'vitest'
import { processDateString } from '../utils/dateUtilsMMDD'

describe('processDateString', () => {
  test('Date correct ISO YYYY-MM-DD', async () => {
    expect(processDateString('2023-05-19')).toEqual('05/19/2023')
    expect(processDateString('2000-02-29')).toEqual('02/29/2000')
    expect(processDateString('2024-02-29')).toEqual('02/29/2024')
    expect(processDateString('1899-12-31')).toEqual('12/31/')
  })

  test('Date incorrect ISO YYYY-MM-DD', async () => {
    expect(processDateString('2122-04-31')).toEqual('')
    expect(processDateString('2001-02-29')).toEqual('')
    expect(processDateString('2023-02-30')).toEqual('')
    expect(processDateString('2024-04-31')).toEqual('')
    expect(processDateString('abcd-ef-gh')).toEqual('')
  })

  test('Date correct American MM/DD/YYYY', async () => {
    expect(processDateString('05/19/2024')).toEqual('05/19/2024')
    expect(processDateString('02/29/2024')).toEqual('02/29/2024')
    expect(processDateString('31/12/1899')).toEqual('12/31/')
  })

  test('Date incorrect American MM/DD/YYYY', async () => {
    expect(processDateString('02/30/2024')).toEqual('')
    expect(processDateString('04/31/2023')).toEqual('')
  })

  test('Date correct European DD/MM/YYYY', async () => {
    expect(processDateString('19/05/2024')).toEqual('05/19/2024')
    expect(processDateString('29/02/2024')).toEqual('02/29/2024')
    expect(processDateString('12/31/1899')).toEqual('12/31/')
  })

  test('Date incorrect European DD/MM/YYYY', async () => {
    expect(processDateString('31/04/2023')).toEqual('')
    expect(processDateString('30/02/2024')).toEqual('')
  })

  test('Edge cases', async () => {
    expect(processDateString('2023-01-01')).toEqual('01/01/2023')
    expect(processDateString('2023-12-31')).toEqual('12/31/2023')
    expect(processDateString('01/01/2023')).toEqual('01/01/2023')
    expect(processDateString('31/12/2023')).toEqual('12/31/2023')
  })

  test('Invalid formats', async () => {
    expect(processDateString('')).toEqual('')
    expect(processDateString('not a date')).toEqual('')
    expect(processDateString('12345')).toEqual('')
    expect(processDateString('05-19-2024')).toEqual('')
    expect(processDateString('2024/05/19')).toEqual('')
  })
})
