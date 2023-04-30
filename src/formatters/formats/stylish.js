import _ from 'lodash';


const genStr = (arr, spaceStr) => {
  let str = `{\n`;
  const prepareObjValue = (child, deep = 0) => {
    if (!_.isObject(child)) return `${child}\n`;
    let newStrPre = '{\n';
    const templateSpace = String(spaceStr).repeat(4 + 4 * deep);
    const templateSpaceForBracket = String(spaceStr).repeat(4 * deep);
    _.keys(child).map((key) => {
      newStrPre += `${templateSpace}${key}: `;
      if (_.isObject(child[key])) {
        newStrPre += prepareObjValue(child[key], deep + 1);
      } else newStrPre += `${child[key]}\n`;
    });
    newStrPre += `${templateSpaceForBracket}}\n`;
    return newStrPre;
  };

  const genStrChild = (child, deep = 0) => {
    let newStr = '';
    child.map(({ key, children, status, value, newValue, oldValue }) => {
      let strObj = '';
      const templateSpace = String(spaceStr).repeat(2 + 4 * deep);
      if (newValue || oldValue) {
        strObj +=
          `${templateSpace}- ` +
          `${key}: ${prepareObjValue(oldValue, deep + 1)}`.trim();
        strObj += '\n';
        strObj +=
          `${templateSpace}+ ` +
          `${key}: ${prepareObjValue(newValue, deep + 1)}`.trim();
        strObj += '\n';
      }
      if (status == 'nested') {
        strObj += `${templateSpace}  ${key}: {\n`;
        strObj += genStrChild(children, deep + 1);
        strObj += `${templateSpace}  }\n`;
      }
      if (status == 'deleted') {
        strObj += `${templateSpace}- ${key}: ${prepareObjValue(
          value,
          deep + 1
        )}`;
      }
      if (status == 'added') {
        if (_.isObject(value)) {
          strObj += `${templateSpace}+ ${key}: `;
          strObj += prepareObjValue(value, deep + 1);
        } else strObj += `${templateSpace}+ ${key}: ${value}\n`;
      }
      if (status == 'equal') {
        if (_.isObject(value)) {
          strObj += `${templateSpace}  ${key}: `;
          strObj += prepareObjValue(value, deep + 1);
        } else strObj += `${templateSpace}  ${key}: ${value}\n`;
      }
      return (newStr += strObj);
    });
    return newStr;
  };
  str += genStrChild(arr);
  str += '}';
  return str;
};

export default genStr;
