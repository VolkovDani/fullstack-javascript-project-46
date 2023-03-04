import { genDiff } from "../src/genDiff"

const firstFile = '__tests__/res/file1.json'
const secondFile = '__tests__/res/file2.json'

test('Test 1', () => {
  expect(genDiff(firstFile, secondFile))
})