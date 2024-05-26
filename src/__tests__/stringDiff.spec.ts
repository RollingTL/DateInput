import { describe, expect, test } from 'vitest'
import { findAddedSymbol, findRemovedSymbol, findChangedSymbol } from '../utils/stringDiff'

describe('findAddedSymbol', () => {
  test('add to empty', () => {
    const result = findAddedSymbol('', '1')
    expect(result).toEqual({
      start: '',
      added: '1',
      end: ''
    })
  })
  test('add to one', () => {
    const result = findAddedSymbol('1', '1a')
    expect(result).toEqual({
      start: '1',
      added: 'a',
      end: ''
    })
  })
  test('add to one', () => {
    const result = findAddedSymbol('1', 'a1')
    expect(result).toEqual({
      start: '',
      added: 'a',
      end: '1'
    })
  })
  test('add 10 one', () => {
    const result = findAddedSymbol('1', '11')
    expect(result).toEqual({
      start: '1',
      added: '1',
      end: ''
    })
  })
  test('add to two', () => {
    const result = findAddedSymbol('11', '111')
    expect(result).toEqual({
      start: '11',
      added: '1',
      end: ''
    })
  })
  test('add to two', () => {
    const result = findAddedSymbol('12', '121')
    expect(result).toEqual({
      start: '12',
      added: '1',
      end: ''
    })
  })
  test('add to two', () => {
    const result = findAddedSymbol('12', '112')
    expect(result).toEqual({
      start: '1',
      added: '1',
      end: '2'
    })
  })
  test('add to two', () => {
    const result = findAddedSymbol('12', 'a12')
    expect(result).toEqual({
      start: '',
      added: 'a',
      end: '12'
    })
  })
  test('add to two', () => {
    const result = findAddedSymbol('12', '122')
    expect(result).toEqual({
      start: '12',
      added: '2',
      end: ''
    })
  })
  test('add to two', () => {
    const result = findAddedSymbol('12', '123')
    expect(result).toEqual({
      start: '12',
      added: '3',
      end: ''
    })
  })
  test('add arbitrary', () => {
    const result = findAddedSymbol('1245', '121345')
    expect(result).toEqual({
      start: '12',
      added: '1',
      end: '345'
    })
  })
  test('add arbitrary', () => {
    const result = findAddedSymbol('1122', '11122')
    expect(result).toEqual({
      start: '11',
      added: '1',
      end: '22'
    })
  })
  test('add arbitrary', () => {
    const result = findAddedSymbol('1122', '11222')
    expect(result).toEqual({
      start: '1122',
      added: '2',
      end: ''
    })
  })
  test('add arbitrary', () => {
    const result = findAddedSymbol('123', 'a123')
    expect(result).toEqual({
      start: '',
      added: 'a',
      end: '123'
    })
  })
})

describe('findRemovedSymbol', () => {
  test('remove last', () => {
    const result = findRemovedSymbol('1', '')
    expect(result).toEqual({
      start: '',
      removed: '1',
      end: ''
    })
  })
  test('remove from two', () => {
    const result = findRemovedSymbol('11', '1')
    expect(result).toEqual({
      start: '1',
      removed: '1',
      end: ''
    })
  })
  test('remove from two', () => {
    const result = findRemovedSymbol('12', '1')
    expect(result).toEqual({
      start: '1',
      removed: '2',
      end: ''
    })
  })
  test('remove from two', () => {
    const result = findRemovedSymbol('12', '2')
    expect(result).toEqual({
      start: '',
      removed: '1',
      end: '2'
    })
  })
  test('remove from more', () => {
    const result = findRemovedSymbol('123', '23')
    expect(result).toEqual({
      start: '',
      removed: '1',
      end: '23'
    })
  })
  test('remove from more', () => {
    const result = findRemovedSymbol('123', '12')
    expect(result).toEqual({
      start: '12',
      removed: '3',
      end: ''
    })
  })
  test('remove from more', () => {
    const result = findRemovedSymbol('123', '13')
    expect(result).toEqual({
      start: '1',
      removed: '2',
      end: '3'
    })
  })
  test('remove from more', () => {
    const result = findRemovedSymbol('112', '12')
    expect(result).toEqual({
      start: '1',
      removed: '1',
      end: '2'
    })
  })
  test('remove from more', () => {
    const result = findRemovedSymbol('111333', '11133')
    expect(result).toEqual({
      start: '11133',
      removed: '3',
      end: ''
    })
  })
  test('remove from more', () => {
    const result = findRemovedSymbol('1234567', '123456')
    expect(result).toEqual({
      start: '123456',
      removed: '7',
      end: ''
    })
  })
  test('remove from more', () => {
    const result = findRemovedSymbol('123123', '12123')
    expect(result).toEqual({
      start: '12',
      removed: '3',
      end: '123'
    })
  })

  describe('findChangedSymbol', () => {
    test('change equal throws error', () => {
      expect(() => findChangedSymbol('a', 'a')).toThrow()
      expect(() => findChangedSymbol('', '')).toThrow()
      expect(() => findChangedSymbol('111', '111')).toThrow()
    })
    test('change in middle', () => {
      const result = findChangedSymbol('123', '1a3')
      expect(result).toEqual({
        start: '1',
        changedFrom: '2',
        changedTo: 'a',
        end: '3'
      })
    })
    test('change at beginning', () => {
      const result = findChangedSymbol('123', 'a23')
      expect(result).toEqual({
        start: '',
        changedFrom: '1',
        changedTo: 'a',
        end: '23'
      })
    })
    test('change at end', () => {
      const result = findChangedSymbol('123', '12a')
      expect(result).toEqual({
        start: '12',
        changedFrom: '3',
        changedTo: 'a',
        end: ''
      })
    })
    test('change various', () => {
      expect(findChangedSymbol('11111', '11a11')).toEqual({
        start: '11',
        changedFrom: '1',
        changedTo: 'a',
        end: '11'
      })
      expect(findChangedSymbol('abcdef', 'abcde/')).toEqual({
        start: 'abcde',
        changedFrom: 'f',
        changedTo: '/',
        end: ''
      })
    })
  })
})
