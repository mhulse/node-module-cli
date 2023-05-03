#!/usr/bin/env node

import colors from "colors"
import yargs from "yargs"

import util from "./util.js"
import GenericModule from "./GenericModule.js"

module.exports = (() => {
  class GenericModuleCLI {
    constructor () {
      this._argv = {}
      this._allowed = {
        letters: ["A", "B", "C", "D"],
        numbers: [0, 1, 2],
      }
      this._options = {}
    }

    async getOptions () {
      const parser = yargs(hideBin(process.argv))
        .usage(`Usage: $0 -d </path/to/directory/>`)
        .option("directory", {
          alias: [
            "d",
          ],
          description: "Output directory?",
          type: "string",
          demand: true,
        })
        .option("letters", {
          alias: [
            "l",
          ],
          description: `Alphabet? Choose one: ${this._allowed.fisheye.join(", ")}`,
          type: "string",
        })
        .option("numbers", {
          alias: [
            "n",
          ],
          description: `Numbers? Choose one: ${this._allowed.debug.join(", ")}`,
          type: "number",
        })
        .alias("h", "help")
        .help("h", "Show help.")
        .fail(false)
        .strict()

        try {
          this._argv = await parser.parse()
          console.info("Parsed!")
        } catch (err) {
          console.info(`${err.message}\n ${await parser.getHelp()}`)
        }
    }

    async checkOptions () {
      const results = {
        directory: "required".red,
        letters: "optional".yellow,
        numbers: "optional".yellow,
      }

      if (
        this._argv.directory
        &&
        (typeof this._argv.directory === "string")
        &&
        (await util.dirExists(this._argv.directory))
      ) {
        this._options.directory = this._argv.directory;
        results.directory = this._argv.directory.green;
      }

      if (
        this._argv.letters
        &&
        (typeof this._argv.letters === "string")
        &&
        this._allowed.letters.includes(this._argv.letters)
      ) {
        this._options.letters = this._argv.letters
        results.letters = this._argv.letters.green
      }

      if (
        this._argv.numbers
        &&
        (typeof this._argv.numbers === "number")
        &&
        this._allowed.numbers.includes(this._argv.numbers)
      ) {
        this._options.numbers = this._argv.numbers;
        results.numbers = this._argv.numbers.toString().green
      }

      for (const [key, value] of Object.entries(results)) {
        console.log(`${key.bold.gray}: ${value}`)
      }
    }

    async callGenericModule () {
      const genericModule = new GenericModule(
        this._options
      );

      console.log(this._options);
    }
  }
})()

// import fs from "fs"
// import yargs from "yargs"
// import { hideBin } from "yargs/helpers" // This is shorthand for `process.argv.slice(2)`.

// const OPTIONS = {}

// ;(async function start() {
//   console.info("start")

//   const parser = yargs(hideBin(process.argv))
//     .usage(`Usage: $0 -d [/path/to/directory/]`)
//     .option("directory", {
//       alias: ["d"],
//       description: "A directory!",
//       type: "string",
//       demand: true,
//     })
//     .alias("h", "help")
//     .help("h", "Show help.")
//     .fail(false)

//   try {
//     const argv = await parser.parse();
//     console.info("Parsed!")
//   } catch (err) {
//     console.info(`${err.message}\n ${await parser.getHelp()}`)
//   }

//   console.info("finish")

//   try {
//     OPTIONS.directory = await fs.promises.realpath(parser.argv.directory);
//   } catch (err) {
//     console.error("Error occurred while reading directory!", err);
//   }

//   console.log(OPTIONS)
// })()
