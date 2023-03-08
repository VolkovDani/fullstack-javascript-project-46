import { genDiff } from "../src/genDiff.js"
import { test } from "@jest/globals"

const firstFile = '__tests__/res/file1.json'
const secondFile = '__tests__/res/file2.json'
const thirdFile = '/home/danil/Projects Programming/fullstack-javascript-project-46/__tests__/res/file1.json'
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

