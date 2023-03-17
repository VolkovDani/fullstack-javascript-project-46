import { genDiff } from "../src/genDiff.js"
import { test, expect } from "@jest/globals"

const firstFile = '__tests__/__fixtures__/file1.json'
const secondFile = '__tests__/__fixtures__/file2.json'
const finalJSON = 
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

test('Test 1', () => {
  expect(genDiff(firstFile, secondFile)).toStrictEqual(finalJSON)
})

test('Test throw err', () => {
  expect(genDiff).toThrow('Пустой путь к файлу')
})

// test('Test uncorrect file', () => {
//   expect(genDiff('afa', 'aght')).toThrow('Нет файла для сравнения')
// })