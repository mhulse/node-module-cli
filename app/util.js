import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import untildify from "untildify"

// TODO: make more modular, like: https://stackoverflow.com/a/30282425/922323
export default {
  getDirName(moduleUrl) {
    const filename = fileURLToPath(moduleUrl)
    return path.dirname(filename)
  },

  async dirExists(dir) {
    try {
      await fs.promises.access(path.resolve(untildify(dir)))
      return true
    } catch (err) {
      return false
    }
  },
}
