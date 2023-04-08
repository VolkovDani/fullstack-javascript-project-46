import _ from "lodash";
import parceFile from "../utils/parcers.js";

// Эта функция получает на вход два объекта
// На выходе получаем третий объект с описанием разницы первых двух
const getArrDifferenceFiles = (object1, object2, accumulator = []) => {
  // const object1arr = Object.entries(object1);
  Object.entries(object1).reduce((acc, [key, value]) => {
    const innerObj = {};
    innerObj.key = key;
    innerObj.value = value;
    if (Object.hasOwn(object2, key)) {
      if (object2[key] == value) {
        innerObj["diff"] = "=";
      } else innerObj["diff"] = "-";
    } else {
      innerObj["diff"] = "-";
    }
    acc.push(innerObj);
    return acc;
  }, accumulator);
  Object.entries(object2).reduce((acc, [key, value]) => {
    const innerObj = {};
    innerObj.key = key;
    innerObj.value = value;
    const findedKey = acc.find(({ key: keyInObj }) => keyInObj == key);
    if (findedKey) {
      if (findedKey.value != value) {
        innerObj.diff = "+";
        acc.push(innerObj);
      }
    } else {
      innerObj.diff = "+";
      acc.push(innerObj);
    }
    return acc;
  }, accumulator);
  return accumulator;
};

const genDiff = (filepath1, filepath2) => {
  if (!filepath1 || !filepath2) throw Error("Нет файла для сравнения");
  return getArrDifferenceFiles(parceFile(filepath1), parceFile(filepath2));
};

// Принимает массив объектов с описанием ключей[{ключ, значение, значение "разности файлов"},...]
// Возвращает строку в формате "{ *значение дифа* ключ: значение }"
// const diffToStr = (obj) => {
//   obj
// }
export default genDiff;
