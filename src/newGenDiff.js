import parceFile from "../utils/parcers.js";
import genStrWithDiffs from "../utils/genStrWithDiff.js";
import _ from "lodash";

const getAllKeys = (obj1, obj2) => {
  const keysObj = {}
  _.merge(keysObj, obj1, obj2)
  const createArrKeys = (obj) => {
    return Object.entries(obj).sort((a, b) => a[0] - b[0])
      .reduce((acc, [item, values]) => {
        let value
        if (typeof values === 'object' && values !== null) {
          value = createArrKeys(values)
        }
        acc.push({
          'key': item,
          'value': value
        })
        return acc
    }, [])
  }
  const arrKeys = createArrKeys(keysObj)
  return arrKeys
}

// Я получаю один из объектов и при помощи массива ключей 
// прохожу рекурсивно по всему объекту
// записывая значение отмечая отсутствующие ключи

const getDiffsValues = (obj, arrKeys) => {
  return arrKeys.reduce((acc, {key, value}) => {
    const newObj = {}
    if (obj[key] !== undefined) {
      if (typeof value == "object") {
        newObj.key = key
        newObj.value = getDiffsValues(obj[key], value)
        newObj.diff = '-'
        acc.push(newObj)
      } else {
        newObj.key = key
        newObj.value = obj[key]
        newObj.diff = '-'
        acc.push(newObj)
      }
    } else {
      newObj.key = key
      newObj.diff = '+'
      acc.push(newObj)
    }
    return acc
  }, [])
}


// Принимаю второй объект, массив ключей и массив значений дифа
// от первого файла чтобы сравнить
const getDiffsInSecondFile = (obj, arrKeys, arrDiffs) => {
  return arrKeys.reduce((acc, {key, value}, index) => {
    const callbackForArr = (element) => element.key == key
    if (obj[key] !== undefined) {
      const diffFirstFile = arrDiffs.find(callbackForArr)
      // console.log(diffFirstFile);
      if (typeof value == "object") {
        const newObj = {}
        if (diffFirstFile.diff == '+') {
          acc[index]['value'] = obj[key]
        } else {
        if (diffFirstFile['value']) {
          acc[index]['diff'] = '='
          newObj.value = getDiffsInSecondFile(obj[key], value, diffFirstFile['value'])
        }
      }
      } else {
        if (diffFirstFile.diff == '+') {
          acc[index]['value'] = obj[key]
        } else {
          const firstValue = diffFirstFile.value
          if (firstValue == obj[key]) {
            acc[index]['diff'] = '='
          } else {
            const valueFirst = acc[index]['value']
            acc[index] = {
              key,
              'value-': valueFirst,
              'value+': obj[key]
            }
          }
        }
      }
    }
    return acc;
  }, arrDiffs)
}
 

const firstObj = parceFile("./__fixtures__/file3.json")
const secondObj = parceFile("./__fixtures__/file4.json")

console.log(getDiffsValues(firstObj, getAllKeys(firstObj, secondObj)));
console.log(JSON.stringify(getDiffsInSecondFile(secondObj, getAllKeys(firstObj, secondObj), getDiffsValues(firstObj, getAllKeys(firstObj, secondObj)))));