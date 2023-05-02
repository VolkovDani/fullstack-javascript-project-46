import genStr from "./formats/stylish.js"
import genPlain from "./formats/plain.js"
import genJSON from "./formats/json.js"

const formatSelector = {
  'stylish': ' ',
  'stylish-dots': '.',
  'stylish-doubleSpace': '  ',
  'stylish-sharp': '#',
  'plain': 1,
  'json': 1
}

const selectFormatOutput = (arr, format) => {
  if (formatSelector[format]) {
    if (format.startsWith('stylish')) return genStr(arr, formatSelector[format])
    if (format == 'plain')return genPlain(arr)
    if (format == 'json')return genJSON(arr)
  } else {
    return console.log('Incorrect format. For example use stylish-dots');
  }
}

export default selectFormatOutput
