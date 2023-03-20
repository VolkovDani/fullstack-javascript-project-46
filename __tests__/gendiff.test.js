import { genDiff } from "../src/genDiff.js";
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

test("Test throw err", () => {
  expect(genDiff).toThrow("Пустой путь к файлу");
});

// test('Test uncorrect file', () => {
//   expect(genDiff('afa', 'aght')).toThrow('Нет файла для сравнения')
// })
