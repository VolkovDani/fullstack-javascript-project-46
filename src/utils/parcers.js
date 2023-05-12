import { load as loadYAML } from 'js-yaml';

const parceFile = (str, extens) => {
  switch (extens) {
    case '.json':
      return JSON.parse(str);
    case '.yaml':
    case '.yml':
      return loadYAML(str);
    default:
      throw Error('Error in parce. Not find supported extension');
  }
};

export default parceFile;
