import _ from "lodash";
import parceFile from "../utils/parcers.js";
import genStrWithDiffs from "../utils/genStrWithDiff.js";

const makeAstTree = (mainObj1, mainObj2) => {
  const keys = _.sortBy(_.union(_.keys(mainObj1), _.keys(mainObj2)))
  const treePart = keys.map((key) => {
    if (!_.has(mainObj1, key)) return {key, 'value': mainObj2[key], 'status': 'added'}
    if (!_.has(mainObj2, key)) return {key, 'value': mainObj1[key], 'status': 'deleted'}
    if (mainObj1[key] == mainObj2[key]) return {key, 'value': mainObj1[key], 'status': 'equal'}
    if (_.isObject(mainObj1[key]) && _.isObject(mainObj2[key])) return {key, 'children': makeAstTree(mainObj1[key], mainObj2[key]), 'status': 'nested'}
    if (mainObj1[key] != mainObj2[key])return {key, 'newValue': mainObj2[key], 'oldValue': mainObj1[key]}
  })
  return treePart
};



const genDiff = (filepath1, filepath2) => {
  return genStrWithDiffs(
    makeAstTree(parceFile(filepath1), parceFile(filepath2))
    );
  };
  
  
const firstObj = ("./__fixtures__/file3.json");
const secondObj = ("./__fixtures__/file4.json");
  // console.log(JSON.stringify(getAllKeys(firstObj, secondObj)));
  // console.log(buildAstTree(firstObj, secondObj));
  // console.log(JSON.stringify(makeAstTree(firstObj, secondObj)));

  // console.log(getArrDifferenceFiles(parceFile("./__fixtures__/file1.json"), parceFile("./__fixtures__/file2.json")));
console.log(genDiff(firstObj, secondObj));
export default genDiff;
