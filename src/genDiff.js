import _ from 'lodash';
import parceFile from './utils/parcers.js';
import setFormat from './formatters/index.js';


const makeAstTree = (mainObj1, mainObj2) => {
  const keys = _.sortBy(_.union(_.keys(mainObj1), _.keys(mainObj2)));
  const treePart = keys.map((key) => {
    if (!_.has(mainObj1, key))
      return { key, value: mainObj2[key], status: 'added' };
    if (!_.has(mainObj2, key))
      return { key, value: mainObj1[key], status: 'deleted' };
    if (mainObj1[key] == mainObj2[key])
      return { key, value: mainObj1[key], status: 'equal' };
    if (_.isObject(mainObj1[key]) && _.isObject(mainObj2[key]))
      return {
        key,
        children: makeAstTree(mainObj1[key], mainObj2[key]),
        status: 'nested',
      };
    if (mainObj1[key] != mainObj2[key])
      return { key, newValue: mainObj2[key], oldValue: mainObj1[key], status: 'updated'};
  });
  return treePart;
};


const genDiff = (filepath1, filepath2, formatOutput = 'stylish') => {
  return setFormat(
    makeAstTree(parceFile(filepath1), parceFile(filepath2)), formatOutput
  );
};

export default genDiff;


// const firstObj = './__fixtures__/file3.json';
// const secondObj = './__fixtures__/file4.json';

// console.log(setFormat(makeAstTree(parceFile(firstObj), parceFile(secondObj)), 'plain'));
// console.log(JSON.stringify(getAllKeys(firstObj, secondObj)));
// console.log(buildAstTree(firstObj, secondObj));
// console.log(genDiff(firstObj, secondObj, 'json'));

// console.log(getArrDifferenceFiles(parceFile("./__fixtures__/file1.json"), parceFile("./__fixtures__/file2.json")));
// console.log(genDiff(firstObj, secondObj));
