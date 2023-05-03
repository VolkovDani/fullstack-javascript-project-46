import { test, expect, describe } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff';

const filename = fileURLToPath(import.meta.url);
const myDirname = dirname(filename);
const getFixturePath = (filenameFile) => path.join(myDirname, '..', '__fixtures__', filenameFile);
const readFile = (filenameFile) => fs.readFileSync(getFixturePath(filenameFile), 'utf-8');

describe('Test Throw Errors', () => {
  test('Test err path', () => {
    expect(() => {
      genDiff();
    }).toThrowError('Пустой путь к файлу');
  });

  test('Test err extension', () => {
    expect(() => {
      genDiff('./__fixtures__/file1.yml', './__fixtures__/fakefile.ya');
    }).toThrowError('Не поддерживаемый формат файла');
  });

  test('Test uncorrect format', () => {
    expect(() => {
      genDiff(
        './__fixtures__/file1.json',
        './__fixtures__/file2.json',
        'fakeFormat',
      );
    }).toThrowError('Incorrect format. For example use stylish-dots');
  });
});

describe('Test Simple Structures', () => {
  test('Test JSON', () => {
    expect(
      genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json'),
    ).toStrictEqual(readFile('finalResult1'));
  });

  test('Test YAML', () => {
    expect(
      genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yaml'),
    ).toStrictEqual(readFile('finalResult1'));
  });
});

describe('Test Difficult Structures', () => {
  test('Test JSON Recursia Diff', () => {
    expect(
      genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json'),
    ).toStrictEqual(readFile('finalResult2'));
  });

  test('Test YAML Recursia Diff', () => {
    expect(
      genDiff('./__fixtures__/file3.yml', './__fixtures__/file4.yml'),
    ).toStrictEqual(readFile('finalResult2'));
  });
});

describe('Test Different Formats Output', () => {
  test('Test JSON Diff format Plain', () => {
    expect(
      genDiff('./__fixtures__/file3.json', './__fixtures__/file4.json', 'plain'),
    ).toStrictEqual(readFile('finalResult3'));
  });

  test('Test JSON Diff format json', () => {
    const data = genDiff(
      './__fixtures__/file3.json',
      './__fixtures__/file4.json',
      'json',
    );
    expect(() => JSON.parse(data)).not.toThrow();
  });
});
