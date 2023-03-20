import { load } from "js-yaml";
import { readFileSync } from "node:fs";
import path from "node:path";

const str = readFileSync(path.resolve("./__fixtures__/file1.yml"), "utf-8")

console.log(load(str));