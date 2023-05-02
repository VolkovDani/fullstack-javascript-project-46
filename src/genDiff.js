import parceFile from './utils/parcers.js';
import setFormat from './formatters/index.js';
import makeAstTree from './utils/makeAstTree.js';


const genDiff = (filepath1, filepath2, formatOutput = 'stylish') => {
  return setFormat(
    makeAstTree(parceFile(filepath1), parceFile(filepath2)), formatOutput
  );
};

export default genDiff;


// const firstObj = './__fixtures__/newTests/file1.yml';
// const secondObj = './__fixtures__/newTests/file2.yml';

// console.log(setFormat(makeAstTree(parceFile(firstObj), parceFile(secondObj)), 'plain'));
// console.log(JSON.stringify(getAllKeys(firstObj, secondObj)));
// console.log(buildAstTree(firstObj, secondObj));
// console.log(genDiff(firstObj, secondObj, 'json'));

// console.log(getArrDifferenceFiles(parceFile("./__fixtures__/file1.json"), parceFile("./__fixtures__/file2.json")));
// console.log(genDiff(firstObj, secondObj));
