import { readFileSync } from "node:fs";
import path from "node:path";
import _ from "lodash";

const makejson = (filepath) => {
  if (!filepath) throw Error("Пустой путь к файлу");
  let str = "";
  try {
    str = readFileSync(path.resolve(filepath), "utf-8", (err) => {
      if (err) throw err;
    });
  } catch (e) {
    return console.error(e.name + ": " + e.message);
  }
  return JSON.parse(str);
};

const differenceJSON = (file1, file2) => {
  if (!file1 || !file2) throw Error("Нет файла для сравнения");
  const arr = [];
  const arr2 = Object.entries(file2);
  for (const [key, value] of Object.entries(file1)) {
    if (Object.hasOwn(file2, key)) {
      if (file2[key] == value) {
        arr.push([key, value, "="]);
      } else {
        arr.push([key, value, "-"]);
      }
    } else {
      arr.push([key, value, "-"]);
    }
  }
  arr2.map((item) => {
    const [key, value] = item;
    if (file1[key] != value) {
      arr.push([key, value, "+"]);
    }
  });
  const finalArr = _.sortBy(arr, [(item) => item[0]]);
  let str = "{\n";
  finalArr.map((item) => {
    str += `  ${item[2] == "=" ? " " : item[2]} ${item[0]}: ${item[1]}\n`;
  });
  str += "}";
  return str;
};

const genDiff = (filepath1, filepath2) =>
  differenceJSON(makejson(filepath1), makejson(filepath2));

// console.log(
//   genDiff(
//     "./__tests__/__fixtures__/file1.json",
//     "./__tests__/__fixtures__/file2.json"
//   )
// );

export { genDiff };
