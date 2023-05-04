#!/usr/bin/env node

import colors from "colors"
import readline from "readline"
import yargs from "yargs"
import { hideBin } from "yargs/helpers" // This is shorthand for `process.argv.slice(2)`.

import util from "./util.js"
import GenericModule from "./GenericModule.js"

export default (() => {
  class GenericModuleCLI {
    constructor () {
      this._argv = {}
    }

    async confirm(question) {
      const line = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      return new Promise((resolve) => {
        line.question(question, (response) => {
          line.close()
          resolve(response.toLowerCase === "y")
        })
      })
    }

    async getOptions () {
      const parser = yargs(hideBin(process.argv))
        .usage(`Usage: $0 -d </path/to/directory/>`)
        .option("directory", {
          alias: "d",
          description: "Output directory?",
          type: "string",
          demand: true,
        })
        .option("color", {
          alias: "c",
          describe: "Choose a color",
          choices: ["red", "green", "blue", "orange"],
          default: "red",
          type: "string",
        })
        .check(async argv => {
          if (! (await util.dirExists(argv.directory))) {
            throw new Error("Value passed for option `directory` does not exist!")
          }
          return true;
        })
        .showHelpOnFail(true)
        .alias("h", "help")
        .help("help")
        .fail(false)
        .strict()

        try {
          this._argv = await parser.parse()

          console.log()
          console.log("Your choices are:".bold)
          for (const value of ["directory", "color"]) {
            console.log(`${value}: ${this._argv[value].green}`)
          }
          console.log()

          await this.confirm(`Execute? [Y/n] `)
        } catch (err) {
          console.info(`${err.message}\n ${await parser.getHelp()}`)
        }
    }

    async callGenericModule () {
      console.log("before")

      try {
        const genericModule = GenericModule(
          this._argv
        )

        let result = await genericModule().run()

        console.log(result)
      } catch (err) {
        console.error("Exiting CLI due to error:".red, "\n", err)

        process.exitCode = 1
      }

      console.log("after")
    }
  }

  (async () => {
    const genericModuleCLI = new GenericModuleCLI()

    await genericModuleCLI.getOptions()
    await genericModuleCLI.callGenericModule()
  })();
})()
