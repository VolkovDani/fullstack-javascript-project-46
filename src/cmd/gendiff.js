import { Command } from 'commander'

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --file <type>', 'Choose type file')

export default program;
