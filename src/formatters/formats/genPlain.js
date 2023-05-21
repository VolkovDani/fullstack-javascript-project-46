import _ from 'lodash';

const checkSpecialValues = (value) => {
  if (typeof value === 'boolean' || value == null) return `${value}`;
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'number') return `${value}`;
  return `'${value}'`;
};

const genPlain = (arrKeys) => {
  const genStr = (arr, keyParent) => arr.map(({
    key, children, status, newValue, oldValue, value,
  }) => {
    const templateStr = `Property '${
      keyParent ? `${keyParent}.${key}` : key
    }`;
    switch (status) {
      case 'nested':
        return genStr(children, (keyParent ? `${keyParent}.${key}` : key)).flat(1);
      case 'added':
        return `${templateStr}' was added with value: ${checkSpecialValues(
          value,
        )}`;
      case 'deleted':
        return `${templateStr}' was removed`;
      case 'updated':
        return `${templateStr}' was updated. From ${checkSpecialValues(
          oldValue,
        )} to ${checkSpecialValues(newValue)}`;
      default:
        return undefined;
    }
  });
  return genStr(arrKeys)
    .flat(1)
    .filter((item) => item !== undefined)
    .join('\n');
};

export default genPlain;
