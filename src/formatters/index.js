import genStr from "./formats/stylish.js"
import genPlain from "./formats/plain.js"

const formatStylish = {
  'stylish': ' ',
  'stylish-dots': '.',
  'stylish-doubleSpace': '  ',
  'stylish-sharp': '#',
  'plain': 1
}

const selectFormatOutput = (arr, format) => {
  if (formatStylish[format]) {
    if (format.startsWith('stylish')) return genStr(arr, formatStylish[format])
    return genPlain(arr)
  } else {
    return console.log('Incorrect format. For example use stylish-dots');
  }
}

export default selectFormatOutput
