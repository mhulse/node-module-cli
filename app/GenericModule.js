import path from "path"
import fs from "fs"
import util from "./util.js"

const GenericModule = (function () {
  const defaults = {
    letters: "A",
    numbers: 1,
  }

  class GenericModule {
    // Singleton pattern:
    constructor(options = {}) {
      if (! GenericModule.instance) {
        GenericModule.instance = this
      }

      // Save initial options:
      this.options = options

      return GenericModule.instance
    }

    static init(options = {}) {
      const instance = new GenericModule()

      // Create a new shallow copy using Object Spread Params (last one in wins):
      instance.options = {
        ... defaults,
        ... instance.options,
        ... options,
      }

      return instance
    }

    async run() {
      const dirName = util.normalizePath(this.options.directory) || util.getCurrentModulePath()
      const html = path.join(dirName, "/temp.html")

      if (this.options.color == "orange") {
        // Instead of using `writeFile().then()`, use await:
        await fs.promises.writeFile(html, "Hello world!", "utf8")

        let result = await fs.promises.readFile(html, "utf8")

        await fs.promises.unlink(html)

        // Resolve this async function with the result:
        return result
      } else {
        throw new Error(`Orange isn’t orange, it’s ${this.options.color}!`)
      }
    }
  }

  return GenericModule
}())

export default (options = {}) => {
  if (Object.entries(options).length) {
    new GenericModule(options)
  }

  return GenericModule.init
}
