import parceFile from './utils/parcers.js';
import setFormat from './formatters/index.js';
import makeAstTree from './utils/makeAstTree.js';

const genDiff = (filepath1, filepath2, formatOutput = 'stylish') => {
  const result = setFormat(
    makeAstTree(parceFile(filepath1), parceFile(filepath2)),
    formatOutput,
  );
  return result;
};

export default genDiff;

// const firstObj = './__fixtures__/newTests/file1.yml';
// const secondObj = './__fixtures__/newTests/file2.yml';

// console.log(setFormat(makeAstTree(parceFile(firstObj), parceFile(secondObj)), 'plain'));
// console.log(JSON.stringify(getAllKeys(firstObj, secondObj)));
// console.log(buildAstTree(firstObj, secondObj));
// console.log(genDiff(firstObj, secondObj, 'json'));

// console.log(genDiff(firstObj, secondObj));
