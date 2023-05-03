import { load as loadYAML } from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const allowedExt = ['.json', '.yml', '.yaml'];

const checkExt = (filepath) => {
  if (!filepath) throw Error('Пустой путь к файлу');
  const extFile = path.extname(filepath);
  if (!allowedExt.includes(extFile)) throw Error('Не поддерживаемый формат файла');
  return extFile;
};

const parceFile = (pathFile) => {
  const extens = checkExt(pathFile);
  try {
    const str = readFileSync(path.resolve(pathFile), 'utf-8');
    switch (extens) {
      case '.json':
        return JSON.parse(str);
      case '.yaml':
      case '.yml':
        return loadYAML(str);
      default:
        throw Error('Error in parce');
    }
  } catch (e) {
    throw Error(`${e.name}': '${e.message}`);
  }
};

export default parceFile;
