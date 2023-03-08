import { genDiff } from "../src/genDiff.js";

const firstFile = '__tests__/res/file1.json'
const secondFile = '__tests__/res/file2.json'
const thirdFile = '/home/danil/Projects Programming/fullstack-javascript-project-46/__tests__/res/file1.json'

console.log(genDiff(firstFile, secondFile));

const differenceJSON = (file1, file2) => {
  const arr1 = makeArrKeysAndValues(file1);
  const arr2 = makeArrKeysAndValues(file2);
  const obj = arr1[0].map((item, index) => {
    // если файл есть только в первом файле то ставится '-'
    // если файл есть в обоих файлах ничего не ставится
    // если файл есть только во втором файле ставится '+'
    if (arr2[0].includes(item)) {
      if (arr2[1][arr2[0].indexOf(item)] == arr1[1][index]) {
        return [item, arr1[1][index]]
      } else {
        return [item, arr1[1][index], '-']
      }
    } return [item, arr1[1][index], '-']
  })
  const obj2 = arr2.map((item, index) => {
    if (!arr1[0].includes(item)) return [item, arr2[1][index], '+']
  })
  const obj3 = [...obj, ...obj2]
}