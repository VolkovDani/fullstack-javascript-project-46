// Принимает массив объектов с описанием ключей[{ключ, значение, значение "разности файлов"},...]
// Возвращает строку в формате "{ *значение дифа* ключ: значение }"
const genStrWithDiffs = (arr, deep = 0) => {
  const arrWithObj = Object.assign([], arr);
  let str = `{\n`
  arrWithObj.sort(({key: key1}, {key: key2}) => {
    if (key1 < key2) return -1;
    if (key1 > key2) return 1;
    if (key1 == key2) return 0;
  }).map(({key, value, diff}) => {
    if (typeof value == 'object') str += genStrWithDiffs(value, deep++)
    if (diff == '=') str += `${' '.repeat(4 + deep)}`;
    else str += `${' '.repeat(2 + deep)}${diff} `
    str += `${key}: ${value}\n`
  })
  str += '}'
  return str;
}

export default genStrWithDiffs;