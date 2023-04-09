// import _ from "lodash";
import parceFile from "../utils/parcers.js";
import genStrWithDiffs from "../utils/genStrWithDiff.js";

// Эта функция получает на вход два объекта
// На выходе получаем третий объект с описанием разницы первых двух
const getArrDifferenceFiles = (object1, object2, accumulator = []) => {
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
  return genStrWithDiffs(
    getArrDifferenceFiles(parceFile(filepath1), parceFile(filepath2))
  );
};

export default genDiff;
