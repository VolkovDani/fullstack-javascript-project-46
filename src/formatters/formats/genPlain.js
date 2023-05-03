import _ from 'lodash';

const checkBooleanNullComplex = (value) => {
  if (typeof value === 'boolean' || value == null) return `${value}`;
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'number') return `${value}`;
  return `'${value}'`;
};

const genPlain = (arrKeys) => {
  const genStr = (arr, keyParent) => arr.map(({
    key, children, status, newValue, oldValue,
  // eslint-disable-next-line array-callback-return, consistent-return
  }) => {
    const templateStr = `Property '${
      keyParent ? `${keyParent}.${key}` : key
    }`;
    if (status === 'nested') {
      const modifiedPath = keyParent ? `${keyParent}.${key}` : key;
      return genStr(children, modifiedPath).flat(1);
    }
    if (status === 'added') {
      return `${templateStr}' was added with value: ${checkBooleanNullComplex(
        children,
      )}`;
    }
    if (status === 'deleted') return `${templateStr}' was removed`;
    if (status === 'updated') {
      return `${templateStr}' was updated. From ${checkBooleanNullComplex(
        oldValue,
      )} to ${checkBooleanNullComplex(newValue)}`;
    }
  });
  return genStr(arrKeys)
    .flat(1)
    .filter((item) => item !== undefined)
    .join('\n');
};

export default genPlain;