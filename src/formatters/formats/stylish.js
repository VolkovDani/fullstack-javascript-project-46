import _ from 'lodash';

const prepareValue = (child, spaceStr, deep = 0) => {
  if (!_.isObject(child)) return `${child}\n`;
  const templateSpace = String(spaceStr).repeat(4 + 4 * deep);
  return (
    `{\n${
      _.keys(child)
        .map((key) => {
          if (_.isObject(child[key])) {
            return (
              `${templateSpace}${key}: ${prepareValue(child[key], spaceStr, deep + 1)}`
            );
          } return `${templateSpace}${key}: ${child[key]}\n`;
        })
        .join('')
    }${String(spaceStr).repeat(4 * deep)}}\n`
  );
};

const genStrForObj = (obj, spaceStr, deep = 0) => obj
  .map(({
    key, children, status, newValue, oldValue, value,
  }) => {
    const templateSpace = String(spaceStr).repeat(2 + 4 * deep);
    switch (status) {
      case 'updated':
        return (
          `${templateSpace}- `
            + `${key}: ${prepareValue(oldValue, spaceStr, deep + 1)}`
            + `${templateSpace}+ `
            + `${key}: ${prepareValue(newValue, spaceStr, deep + 1)}`
        );
      case 'nested':
        return (
          `${templateSpace}  ${key}: {\n${
            genStrForObj(children, spaceStr, deep + 1)
          }${templateSpace}  }\n`
        );
      case 'deleted':
        return `${templateSpace}- ${key}: ${prepareValue(
          value,
          spaceStr,
          deep + 1,
        )}`;
      case 'added':
        if (_.isObject(value)) {
          return (
            `${templateSpace}+ ${key}: ${prepareValue(value, spaceStr, deep + 1)}`
          );
        } return `${templateSpace}+ ${key}: ${value}\n`;
      case 'equal':
        if (_.isObject(children)) {
          return (
            `${templateSpace}  ${key}: ${prepareValue(children, spaceStr, deep + 1)}`
          );
        } return `${templateSpace}  ${key}: ${children}\n`;
      default:
        return undefined;
    }
  }).join('');

const genStr = (arr, spaceStr) => `{\n${genStrForObj(arr, spaceStr)}}`;

export default genStr;
