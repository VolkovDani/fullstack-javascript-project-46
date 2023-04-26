import genStr from "./tools/genStr.js";

const formats = {
  'stylish': ' ',
  'dots': '.',
  'doubleSpace': '  '
}

export default (arr, format) => genStr(arr, formats[format])
