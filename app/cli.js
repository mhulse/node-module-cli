#!/usr/bin/env node

import fs from "fs"
import yargs from "yargs"
import { hideBin } from "yargs/helpers" // This is shorthand for `process.argv.slice(2)`.

const OPTIONS = {}

;(async function start() {
  console.info("start")

  const parser = yargs(hideBin(process.argv))
    .usage(`Usage: $0 -d [/path/to/directory/]`)
    .option("directory", {
      alias: ["d"],
      description: "A directory!",
      type: "string",
      demand: true,
    })
    .alias("h", "help")
    .help("h", "Show help.")
    .fail(false)

  try {
    const argv = await parser.parse();
    console.info("Parsed!")
  } catch (err) {
    console.info(`${err.message}\n ${await parser.getHelp()}`)
  }

  console.info("finish")

  try {
    OPTIONS.directory = await fs.promises.realpath(parser.argv.directory);
  } catch (err) {
    console.error("Error occurred while reading directory!", err);
  }

  console.log(OPTIONS)
})()
