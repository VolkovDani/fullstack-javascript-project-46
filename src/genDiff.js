import { readFileSync } from 'node:fs'
import path from 'node:path';

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

differenceJSON(makejson(firstFile))

export { genDiff };
