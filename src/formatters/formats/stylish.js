import _ from 'lodash';

const genStr = (arr, spaceStr) => {
  const prepareObjValue = (child, deep = 0) => {
    if (!_.isObject(child)) return `${child}\n`;
    const templateSpace = String(spaceStr).repeat(4 + 4 * deep);
    const templateSpaceForBracket = String(spaceStr).repeat(4 * deep);
    return (
      '{\n' +
      _.keys(child)
        .map((key) => {
          if (_.isObject(child[key])) {
            return (
              `${templateSpace}${key}: ` + prepareObjValue(child[key], deep + 1)
            );
          } else return `${templateSpace}${key}: ` + `${child[key]}\n`;
        })
        .join('') +
      `${templateSpaceForBracket}}\n`
    );
  };

  const genStrChild = (child, deep = 0) => {
    return child
      .map(({ key, children, status, newValue, oldValue }) => {
        const templateSpace = String(spaceStr).repeat(2 + 4 * deep);
        if (status == 'updated') {
          return (
            `${templateSpace}- ` +
            `${key}: ${prepareObjValue(oldValue, deep + 1)}` +
            `${templateSpace}+ ` +
            `${key}: ${prepareObjValue(newValue, deep + 1)}` 
          );
        }
        if (status == 'nested') {
          return (
            `${templateSpace}  ${key}: {\n` +
            genStrChild(children, deep + 1) +
            `${templateSpace}  }\n`
          );
        }
        if (status == 'deleted') {
          return `${templateSpace}- ${key}: ${prepareObjValue(
            children,
            deep + 1
          )}`;
        }
        if (status == 'added') {
          if (_.isObject(children)) {
            return (
              `${templateSpace}+ ${key}: ` + prepareObjValue(children, deep + 1)
            );
          } else return `${templateSpace}+ ${key}: ${children}\n`;
        }
        if (status == 'equal') {
          if (_.isObject(children)) {
            return (
              `${templateSpace}  ${key}: ` + prepareObjValue(children, deep + 1)
            );
          } else return `${templateSpace}  ${key}: ${children}\n`;
        }
      })
      .join('');
  };
  return '{\n' + genStrChild(arr) + '}';
};

export default genStr;
