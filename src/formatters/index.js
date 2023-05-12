import genStr from './formats/stylish.js';
import genPlain from './formats/genPlain.js';
import genJSON from './formats/json.js';

const selectFormatOutput = (arr, format) => {
  switch (format) {
    case 'stylish':
      return genStr(arr, ' ');
    case 'plain':
      return genPlain(arr);
    case 'json':
      return genJSON(arr);
    default:
      throw Error('Incorrect format. For example use "plain"');
  }
};

export default selectFormatOutput;
