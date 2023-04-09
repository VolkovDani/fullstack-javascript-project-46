// Принимает массив объектов с описанием ключей[{ключ, значение, значение "разности файлов"},...]
// Возвращает строку в формате "{ *значение дифа* ключ: значение }"
const genStrWithDiffs = (arr) => {
  const arrWithSort = Object.assign([], arr);
  let str = `{\n`
  arrWithSort.sort(({key: key1}, {key: key2}) => {
    if (key1 < key2) return -1;
    if (key1 > key2) return 1;
    if (key1 == key2) return 0;
  }).map(({key, value, diff}) => {
    if (diff == '=') str += '    ';
    else str += `  ${diff} `
    str += `${key}: ${value}\n`
  })
  str += '}'
  return str;
}

export default genStrWithDiffs;