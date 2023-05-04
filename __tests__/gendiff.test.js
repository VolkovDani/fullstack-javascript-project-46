import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff';

const filename = fileURLToPath(import.meta.url);
const myDirname = dirname(filename);
const getFixturePath = (filenameFile) => path.join(myDirname, '..', '__fixtures__', filenameFile);
const readFile = (filenameFile) => fs.readFileSync(getFixturePath(filenameFile), 'utf-8');

describe('Throw Errors', () => {
  test('ERR path', () => {
    expect(() => {
      genDiff();
    }).toThrowError('Пустой путь к файлу');
  });

  test('ERR extension', () => {
    expect(() => {
      genDiff('./__fixtures__/file1.yml', './__fixtures__/fakefile.ya');
    }).toThrowError('Не поддерживаемый формат файла');
  });

  test('Uncorrect Format', () => {
    expect(() => {
      genDiff(
        './__fixtures__/file1.json',
        './__fixtures__/file2.json',
        'fakeFormat',
      );
    }).toThrowError('Incorrect format. For example use stylish-dots');
  });
});

describe('Simple Structures', () => {
  test('JSON', () => {
    expect(
      genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json'),
    ).toStrictEqual(readFile('finalResult1'));
  });

  test('YAML', () => {
    expect(
      genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yaml'),
    ).toStrictEqual(readFile('finalResult1'));
  });
});

describe('Difficult Structures', () => {
  test('JSON Recursia Diff', () => {
    expect(
      genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json'),
    ).toStrictEqual(readFile('finalResult2'));
  });

  test('YAML Recursia Diff', () => {
    expect(
      genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml'),
    ).toStrictEqual(readFile('finalResult2'));
  });
});

describe('Different Formats Output', () => {
  test('JSON Diff format Plain', () => {
    expect(
      genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'plain'),
    ).toStrictEqual(readFile('finalResult3'));
  });

  test('JSON Diff format JSON', () => {
    const data = genDiff(
      './__fixtures__/file3.json',
      './__fixtures__/file4.json',
      'json',
    );
    expect(() => JSON.parse(data)).not.toThrow();
  });
});
