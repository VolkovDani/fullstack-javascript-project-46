import { Command } from 'commander';
import genDiff from './genDiff.js';

const myProgram = new Command();

myProgram
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'Choose type file', 'stylish')
  .action((filepath1, filepath2) => {
    // eslint-disable-next-line no-console
    console.log(genDiff(filepath1, filepath2, myProgram.opts().format));
  });

export default myProgram;
