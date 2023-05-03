#!/usr/bin/env node

import colors from "colors"
import yargs from "yargs"
import { hideBin } from "yargs/helpers" // This is shorthand for `process.argv.slice(2)`.

import util from "./util.js"
import GenericModule from "./GenericModule.js"

export default (() => {
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
          description: `Alphabet? Choose one: ${this._allowed.letters.join(", ")}`,
          type: "string",
        })
        .option("numbers", {
          alias: [
            "n",
          ],
          description: `Numbers? Choose one: ${this._allowed.numbers.join(", ")}`,
          type: "number",
        })
        .alias("h", "help")
        .help("h", "Show help.")
        .fail(false)
        .strict()

        try {
          this._argv = await parser.parse()
        } catch (err) {
          console.info(`${err.message}\n ${await parser.getHelp()}`)
        }
    }

    async checkOptions () {
      const results = {
        directory: "not set".red,
        letters: "not set".yellow,
        numbers: "not set".yellow,
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
      )

      console.log(this._options)

      console.log("before")

      try {
        await genericModule({
          // Options can also be passed here:
          // orange: "blue",
        }).run()
      } catch (err) {
        console.error(
          "Exiting CLI due to error:".red,
          "\n",
          err
        )

        process.exitCode = 1
      }

      console.log("after")
    }
  }

  (async () => {
    const genericModuleCLI = new GenericModuleCLI();

    await genericModuleCLI.getOptions();
    await genericModuleCLI.checkOptions();
    await genericModuleCLI.callGenericModule();
  })();
})()
