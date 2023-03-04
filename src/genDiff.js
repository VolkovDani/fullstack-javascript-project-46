import { readFileSync } from 'node:fs'

const genDiff = (filepath1, filepath2) => {
  
};

console.log(readFileSync('__tests__/res/file1.json', 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(data);
})); 

export { genDiff };