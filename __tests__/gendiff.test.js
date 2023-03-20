import genDiff from "../src/genDiff.js";
import { test, expect } from "@jest/globals";


const finalResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test("Test JSON", () => {
  expect(genDiff("./__fixtures__/file1.json", "./__fixtures__/file2.json")).toStrictEqual(finalResult);
});

test("Test YAML", () => {
  expect(genDiff("./__fixtures__/file1.yml", "./__fixtures__/file2.yaml")).toStrictEqual(finalResult)
})

test("Test err path", () => {
  expect(genDiff).toThrowError("Пустой путь к файлу");
});

test("Test err extension", () => {
  expect(genDiff("./__fixtures__/file1.yml", "./__fixtures__/fakefile.ya")).toThrowError("Не поддерживаемый формат файла");
});

// test('Test uncorrect file', () => {
//   expect(genDiff('afa', 'aght')).toThrow('Нет файла для сравнения')
// })
