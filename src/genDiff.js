import { readFileSync } from 'node:fs'
import path from 'node:path';
import _ from 'lodash';


const makejson = (filepath) => {
  let str = '';
  try {
    str = readFileSync(path.resolve(filepath), 'utf-8', (err) => {
    if (err) throw err;
  });
  } catch (e) {
    console.log(e.name + ': ' + e.message);
  }
  
  return JSON.parse(str);
}

const makeArrKeysAndValues = (obj) => {
    const keysobj = Object.keys(obj);
    const valuesobj = Object.values(obj);
    const arr = keysobj.reduce((acc, item, index) => {
      acc[0].push(item);
      acc[1].push(valuesobj[index]);
      return acc;
    }, [[],[]])
    return arr;
}

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

const genDiff = (filepath1, filepath2) => {
  
    const firstFile = makejson(filepath1);
    const secondFile = makejson(filepath2);

    console.log(firstFile);
    console.log(secondFile);
  
  return 0;
};


// test section
const firstFile = '__tests__/res/file1.json'
const secondFile = '__tests__/res/file2.json'

differenceJSON(makejson(firstFile), makejson(secondFile))

export { genDiff };
