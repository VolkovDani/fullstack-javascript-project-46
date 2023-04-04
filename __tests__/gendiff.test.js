import { test, expect } from "@jest/globals";
import genDiff from "../src/genDiff.js";

import path from 'path'
import fs from 'node:fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');


test("Test JSON", () => {
  expect(
    genDiff("./__fixtures__/file1.json", "./__fixtures__/file2.json")
  ).toStrictEqual(readFile('finalResult1'));
});

test("Test YAML", () => {
  expect(
    genDiff("./__fixtures__/file1.yml", "./__fixtures__/file2.yaml")
  ).toStrictEqual(readFile('finalResult1'));
});

test("Test err path", () => {
  expect(genDiff).toThrowError("Пустой путь к файлу");
});

test("Test err extension", () => {
  expect(() => {
    genDiff("./__fixtures__/file1.yml", "./__fixtures__/fakefile.ya");
  }).toThrowError("Не поддерживаемый формат файла");
});

// test('Test uncorrect file', () => {
//   expect(genDiff('afa', 'aght')).toThrow('Нет файла для сравнения')
// })
