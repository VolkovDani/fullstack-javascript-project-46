import _ from 'lodash';

const genStrChild = (child, spaceStr, deep = 0) => child
  .map(({
    key, children, status, newValue, oldValue,
  }) => {
    const templateSpace = String(spaceStr).repeat(2 + 4 * deep);
    if (status === 'updated') {
      return (
        `${templateSpace}- `
          + `${key}: ${prepareObjValue(oldValue, spaceStr, deep + 1)}`
          + `${templateSpace}+ `
          + `${key}: ${prepareObjValue(newValue, spaceStr, deep + 1)}`
      );
    }
    if (status === 'nested') {
      return (
        `${templateSpace}  ${key}: {\n${
          genStrChild(children, spaceStr, deep + 1)
        }${templateSpace}  }\n`
      );
    }
    if (status === 'deleted') {
      return `${templateSpace}- ${key}: ${prepareObjValue(
        children,
        spaceStr,
        deep + 1,
      )}`;
    }
    if (status === 'added') {
      if (_.isObject(children)) {
        return (
          `${templateSpace}+ ${key}: ${prepareObjValue(children, spaceStr, deep + 1)}`
        );
      } return `${templateSpace}+ ${key}: ${children}\n`;
    }
    if (status === 'equal') {
      if (_.isObject(children)) {
        return (
          `${templateSpace}  ${key}: ${prepareObjValue(children, spaceStr, deep + 1)}`
        );
      } return `${templateSpace}  ${key}: ${children}\n`;
    } return undefined;
  })
  .join('');
  
  const prepareObjValue = (child, spaceStr, deep = 0) => {
    if (!_.isObject(child)) return `${child}\n`;
    const templateSpace = String(spaceStr).repeat(4 + 4 * deep);
    const templateSpaceForBracket = String(spaceStr).repeat(4 * deep);
    return (
      `{\n${
        _.keys(child)
          .map((key) => {
            if (_.isObject(child[key])) {
              return (
                `${templateSpace}${key}: ${prepareObjValue(child[key], spaceStr, deep + 1)}`
              );
            } return `${templateSpace}${key}: ${child[key]}\n`;
          })
          .join('')
      }${templateSpaceForBracket}}\n`
    );
  };

const genStr = (arr, spaceStr) => `{\n${genStrChild(arr, spaceStr)}}`;

export default genStr;
