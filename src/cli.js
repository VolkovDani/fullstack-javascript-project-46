import { Command } from 'commander';
import genDiff from './genDiff';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'Choose type file', 'stylish')
  .action((filepath1, filepath2) => {
    // eslint-disable-next-line no-console
    console.log(genDiff(filepath1, filepath2, program.opts().format));
  });

export default program;
