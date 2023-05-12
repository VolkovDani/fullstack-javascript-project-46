import _ from 'lodash';

const makeAstTree = (mainObj1, mainObj2) => {
  const keys = _.sortBy(_.union(_.keys(mainObj1), _.keys(mainObj2)));
  const treePart = keys.map((key) => {
    if (!_.has(mainObj1, key)) { return { key, value: mainObj2[key], status: 'added' }; }
    if (!_.has(mainObj2, key)) { return { key, value: mainObj1[key], status: 'deleted' }; }
    if (Object.is(mainObj1[key], mainObj2[key])) { return { key, children: mainObj1[key], status: 'equal' }; }
    if (_.isObject(mainObj1[key]) && _.isObject(mainObj2[key])) {
      return {
        key,
        children: makeAstTree(mainObj1[key], mainObj2[key]),
        status: 'nested',
      };
    }
    return {
      key, newValue: mainObj2[key], oldValue: mainObj1[key], status: 'updated',
    };
  });
  return treePart;
};

export default makeAstTree;
