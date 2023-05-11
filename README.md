# Gendiff
## Generate output with the difference between your two files
Supported File Formats:
- **JSON**
- **YAML**

Supported Output Formats:
- **Stylish**(All the contents of the files in one output with their differences)
- **Plain**(Output in comment format)
- **JSON**(You can use it in your programs)

### Installing:
- Install NodeJS 18.16.0 or newer(https://nodejs.org/)
- Print in console `make install`

### How to use:
- `gendiff [options] <filepath1> <filepath2>`
  - Options: `-f, --format <type>`
    - Types Format: `stylish, plain, json`
  - Filepath:
  <br>**Absolute** path to your file, **relative** path to your file, or **name** your file if you are in the **same directory** as the file.
  <br>
  Example:
    - `/home/danil/test_dir/file1.json`
    - `./test_dir/file1.json`
    - `file1.json`

Work with:
- JSON
___
[![asciicast](https://asciinema.org/a/wDZepp08ZKsxqzXYcC82ATpVf.svg)](https://asciinema.org/a/wDZepp08ZKsxqzXYcC82ATpVf)
- YAML
___
[![asciicast](https://asciinema.org/a/JzBUs1XaJZJg0auaD6tx70hYh.svg)](https://asciinema.org/a/JzBUs1XaJZJg0auaD6tx70hYh)

You can use other formats for generation string with diffs.
Print argument -f or --format after files paths and write one of the format options
For example 'stylish-dots', `gendiff firstFile.ext secondFile.ext -f stylish-dots`
___
[![asciicast](https://asciinema.org/a/nkHM9KwYr7dQfc0MO6CbRFlOx.svg)](https://asciinema.org/a/nkHM9KwYr7dQfc0MO6CbRFlOx)

Or you can use "plain"
___
[![asciicast](https://asciinema.org/a/Dgcrh0oxFvBq2mswk4Ba1bhr4.svg)](https://asciinema.org/a/Dgcrh0oxFvBq2mswk4Ba1bhr4)
You can use my JSON format for your further work with data
___

[![asciicast](https://asciinema.org/a/EYiySL6zf7Tky0gjP5EOoKDGm.svg)](https://asciinema.org/a/EYiySL6zf7Tky0gjP5EOoKDGm)


### Hexlet tests and linter status:
[![Actions Status](https://github.com/DanilCrazy99/fullstack-javascript-project-46/workflows/hexlet-check/badge.svg)](https://github.com/DanilCrazy99/fullstack-javascript-project-46/actions)
[![my-check](https://github.com/DanilCrazy99/fullstack-javascript-project-46/actions/workflows/my-check.yml/badge.svg)](https://github.com/DanilCrazy99/fullstack-javascript-project-46/actions/workflows/my-check.yml)
<a href="https://codeclimate.com/github/DanilCrazy99/fullstack-javascript-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/3666d54fb560475fae00/maintainability" /></a>
<a href="https://codeclimate.com/github/DanilCrazy99/fullstack-javascript-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/3666d54fb560475fae00/test_coverage" /></a>