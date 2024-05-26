import { describe, expect, test } from 'vitest'
import { findSymbolChange } from '../utils/symbolDiff'

describe('findSymbolChange', () => {
  test('add to empty', () => {
    expect(findSymbolChange('', '1')).toEqual({
      start: '',
      changedFrom: '',
      changedTo: '1',
      end: ''
    })
  })
  test('add to one', () => {
    expect(findSymbolChange('1', '1a')).toEqual({
      start: '1',
      changedFrom: '',
      changedTo: 'a',
      end: ''
    })
  })
  test('add to beginning', () => {
    expect(findSymbolChange('11', 'a11')).toEqual({
      start: '',
      changedFrom: '',
      changedTo: 'a',
      end: '11'
    })
  })
  test('add duplicate character', () => {
    expect(findSymbolChange('1', '11')).toEqual({
      start: '1',
      changedFrom: '',
      changedTo: '1',
      end: ''
    })
  })
  test('add to end of two characters', () => {
    expect(findSymbolChange('11', '111')).toEqual({
      start: '11',
      changedFrom: '',
      changedTo: '1',
      end: ''
    })
  })
  test('add to the end', () => {
    expect(findSymbolChange('12', '121')).toEqual({
      start: '12',
      changedFrom: '',
      changedTo: '1',
      end: ''
    })
  })
  test('add in the middle', () => {
    expect(findSymbolChange('12', '1a2')).toEqual({
      start: '1',
      changedFrom: '',
      changedTo: 'a',
      end: '2'
    })
  })
  test('remove last', () => {
    expect(findSymbolChange('1', '')).toEqual({
      start: '',
      changedFrom: '1',
      changedTo: '',
      end: ''
    })
  })
  test('remove from two', () => {
    expect(findSymbolChange('11', '1')).toEqual({
      start: '1',
      changedFrom: '1',
      changedTo: '',
      end: ''
    })
    expect(findSymbolChange('12', '1')).toEqual({
      start: '1',
      changedFrom: '2',
      changedTo: '',
      end: ''
    })
    expect(findSymbolChange('12', '2')).toEqual({
      start: '',
      changedFrom: '1',
      changedTo: '',
      end: '2'
    })
  })
  test('change in middle', () => {
    expect(findSymbolChange('123', '1a3')).toEqual({
      start: '1',
      changedFrom: '2',
      changedTo: 'a',
      end: '3'
    })
  })
  test('change at beginning', () => {
    expect(findSymbolChange('123', 'a23')).toEqual({
      start: '',
      changedFrom: '1',
      changedTo: 'a',
      end: '23'
    })
  })
  test('change at end', () => {
    expect(findSymbolChange('123', '12a')).toEqual({
      start: '12',
      changedFrom: '3',
      changedTo: 'a',
      end: ''
    })
  })
  test('no changes', () => {
    expect(findSymbolChange('a', 'a')).toBeNull()
    expect(findSymbolChange('', '')).toBeNull()
    expect(findSymbolChange('111', '111')).toBeNull()
  })
  test('multiple changes', () => {
    expect(findSymbolChange('123', '1a4')).toBeNull()
    expect(findSymbolChange('abcd', 'abef')).toBeNull()
    expect(findSymbolChange('abcd', 'ab')).toBeNull()
    expect(findSymbolChange('abcd', 'abcdab')).toBeNull()
    expect(findSymbolChange('1111', '11')).toBeNull()
  })
  test('various changes', () => {
    expect(findSymbolChange('hello world', 'helloworld')).toEqual({
      start: 'hello',
      changedFrom: ' ',
      changedTo: '',
      end: 'world'
    })
    expect(findSymbolChange('__/__//__', '__/__/__')).toEqual({
      start: '__/__/',
      changedFrom: '/',
      changedTo: '',
      end: '__'
    })
    expect(findSymbolChange('__/__/__', '__//__/__')).toEqual({
      start: '__/',
      changedFrom: '',
      changedTo: '/',
      end: '__/__'
    })
  })
})
