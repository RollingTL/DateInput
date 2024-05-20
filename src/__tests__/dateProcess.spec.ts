import { describe, expect, test } from 'vitest'
import { format } from '../utils/dateProcess'

// describe('format', () => {
//   test('Date input check', async () => {
//     expect(
//       format({
//         oldString: '',
//         newString: 'a',
//         selectionStart: 0
//       })
//     ).toEqual('')
//   })
//   test('One char', async () => {
//     expect(
//       format({
//         oldString: '',
//         newString: 'a',
//         selectionStart: 0
//       })
//     ).toEqual('')
//     expect(
//       format({
//         oldString: '',
//         newString: '0',
//         selectionStart: 1
//       })
//     ).toEqual('0')
//     expect(
//       format({
//         oldString: '',
//         newString: '1',
//         selectionStart: 1
//       })
//     ).toEqual('1')
//     expect(
//       format({
//         oldString: '',
//         newString: '3',
//         selectionStart: 1
//       })
//     ).toEqual('')
//     expect(
//       format({
//         oldString: '',
//         newString: '_',
//         selectionStart: 1
//       })
//     ).toEqual('')
//   })

//   test('Two char', async () => {
//     expect(
//       format({
//         oldString: '0',
//         newString: '0p',
//         selectionStart: 2
//       })
//     ).toEqual('0')
//     expect(
//       format({
//         oldString: '0',
//         newString: '01',
//         selectionStart: 2
//       })
//     ).toEqual('01')
//     expect(
//       format({
//         oldString: '0',
//         newString: '09',
//         selectionStart: 2
//       })
//     ).toEqual('09')
//     expect(
//       format({
//         oldString: '1',
//         newString: '12',
//         selectionStart: 2
//       })
//     ).toEqual('12')
//     expect(
//       format({
//         oldString: '1',
//         newString: '10',
//         selectionStart: 2
//       })
//     ).toEqual('10')
//     expect(
//       format({
//         oldString: '1',
//         newString: '13',
//         selectionStart: 2
//       })
//     ).toEqual('1')
//   })
// })
