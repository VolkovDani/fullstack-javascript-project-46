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
