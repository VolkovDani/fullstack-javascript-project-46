// import _ from "lodash";
import parceFile from "../utils/parcers.js";
import genStrWithDiffs from "../utils/genStrWithDiff.js";

// Эта функция получает на вход два объекта
// На выходе получаем третий объект с описанием разницы первых двух
const getArrDifferenceFiles = (object1, object2) => {
  const mainAccumulator = [];
  const prepareKeysFirstObj = (obj1, obj2, accumulator) => {
    Object.entries(obj1).reduce((acc, [key, value]) => {
      const innerObj = {};
      innerObj.key = key;
      innerObj.value = value;
      if (Object.hasOwn(obj2, key)) {
        if (obj2[key] == value) {
          innerObj.diff = "=";
        } else {
          if (typeof value == "object") {
            innerObj.value = prepareKeysFirstObj(value, obj2[key], []);
            innerObj.diff = "=";
          } else innerObj.diff = "-";
        }
      } else {
        innerObj.diff = "-";
      }
      acc.push(innerObj);
      return acc;
    }, accumulator);
    return accumulator;
  };

  prepareKeysFirstObj(object1, object2, mainAccumulator);

  const prepareKeysSecondObj = (obj2, accumulator) => {
    // console.log(obj2);
    Object.entries(obj2).reduce((acc, [key, value]) => {
      const innerObj = {};
      if (value != null && typeof value != 'string' && typeof value == "object"){
        const innerAcc = acc[acc.reduce((acc, {key: name}) => {
          acc.push(name)
          return acc;
        }, []).indexOf(key)]
        if (innerAcc) 
          innerObj.value = prepareKeysSecondObj(
            value,
            innerAcc.value
          );
        return acc
      }
      else innerObj.value = value;
      innerObj.key = key;
      const findedKey = acc.find(({ key: keyInObj }) => keyInObj == key);
      if (findedKey) {
        if (findedKey.value != value) {
          innerObj.diff = "+";
          if (typeof value == "object") innerObj.diff = "=";
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

  prepareKeysSecondObj(object2, mainAccumulator);
  return mainAccumulator;
};

const genDiff = (filepath1, filepath2) => {
  return genStrWithDiffs(
    getArrDifferenceFiles(parceFile(filepath1), parceFile(filepath2))
  );
};

// console.log(getArrDifferenceFiles(parceFile("./__fixtures__/file1.json"), parceFile("./__fixtures__/file2.json")));
console.log(genDiff("./__fixtures__/file3.json", "./__fixtures__/file4.json"));
export default genDiff;
