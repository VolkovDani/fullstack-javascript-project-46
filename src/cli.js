import { Command } from "commander";
import { genDiff } from "./genDiff.js";

const program = new Command();

program
  .description("Compares two configuration files and shows a difference.")
  .version("0.0.1")
  .arguments("<filepath1> <filepath2>")
  .option("-f, --format <type>", "Choose type file")
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
  });

export default program;
