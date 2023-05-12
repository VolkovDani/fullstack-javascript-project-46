import path from 'node:path';
import { readFileSync } from 'node:fs';
import parceFile from './utils/parcers.js';
import setFormat from './formatters/index.js';
import makeAstTree from './utils/makeAstTree.js';

const allowedExt = ['.json', '.yml', '.yaml'];

const checkExt = (filepath) => {
  if (!filepath) throw Error('Empty file path');
  const extFile = path.extname(filepath);
  if (!allowedExt.includes(extFile)) throw Error('Non supported file extension');
  return extFile;
};

const openFile = (pathFile) => {
  try {
    return readFileSync(path.resolve(pathFile), 'utf-8');
  } catch (e) {
    throw Error(`${e.name}': '${e.message}`);
  }
};

const genDiff = (filepath1, filepath2, formatOutput = 'stylish') => {
  const result = setFormat(
    makeAstTree(
      parceFile(openFile(filepath1), checkExt(filepath1)),
      parceFile(openFile(filepath2), checkExt(filepath2)),
    ),
    formatOutput,
  );
  return result;
};

export default genDiff;
