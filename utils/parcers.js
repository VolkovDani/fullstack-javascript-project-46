import { load as loadYAML } from "js-yaml";
import { readFileSync } from "node:fs";
import path from "node:path";

const allowedExt = [".json", ".yml", ".yaml"];

const checkExt = (filepath) => {
  if (!filepath) throw Error("Пустой путь к файлу");
  const extFile = path.extname(filepath);
  if (!allowedExt.includes(extFile))
    throw Error("Не поддерживаемый формат файла");
  return extFile;
};

const parceFile = (pathFile) => {
  const extens = checkExt(pathFile);
  let str = "";
  try {
    str = readFileSync(path.resolve(pathFile), "utf-8");
  } catch (e) {
    return console.error(e.name + ": " + e.message);
  }
  switch (extens) {
    case ".json":
      return JSON.parse(str);
    case ".yaml":
    case ".yml":
      return loadYAML(str);
    default:
      throw Error("Error in parce");
  }
};

export default parceFile;
