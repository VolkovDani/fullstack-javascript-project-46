import {
  test, expect, describe, beforeAll,
} from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff';

const filename = fileURLToPath(import.meta.url);
const myDirname = dirname(filename);
const getFixturePath = (filenameFile) => path.join(myDirname, '..', '__fixtures__', filenameFile);
const readFile = (filenameFile) => fs.readFileSync(getFixturePath(filenameFile), 'utf-8');

let stylishResult;
let plainResult;

const extensions = ['json', 'yml'];

beforeAll(() => {
  stylishResult = readFile('stylishResult.txt');
  plainResult = readFile('plainResult.txt');
});

describe('Throw Errors', () => {
  test('ERR path', () => {
    expect(() => {
      genDiff();
    }).toThrow('Empty file path');
  });

  test('ERR extension', () => {
    expect(() => {
      genDiff('./__fixtures__/file1.yml', './__fixtures__/fakefile.ya');
    }).toThrow('Non supported file extension');
  });

  test('Uncorrect Format', () => {
    expect(() => {
      genDiff(
        './__fixtures__/file1.json',
        './__fixtures__/file2.json',
        'fakeFormat',
      );
    }).toThrow('Incorrect format. For example use "plain');
  });
});

test.each(extensions)('Stylish Format (%p)', (ext) => {
  expect(genDiff(`./__fixtures__/file1.${ext}`, `./__fixtures__/file2.${ext}`)).toStrictEqual(stylishResult);
});

test.each(extensions)('Plain Format (%p)', (ext) => {
  expect(genDiff(`./__fixtures__/file1.${ext}`, `./__fixtures__/file2.${ext}`, 'plain')).toStrictEqual(plainResult);
});

test.each(extensions)('JSON Format (%p)', (ext) => {
  const data = genDiff(`./__fixtures__/file1.${ext}`, `./__fixtures__/file2.${ext}`, 'json');
  expect(() => JSON.parse(data)).not.toThrow();
});
