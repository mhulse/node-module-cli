import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import untildify from "untildify"

// TODO: make more modular, like: https://stackoverflow.com/a/30282425/922323
export default {
  normalizePath(dir) {
    return path.resolve(untildify(dir))
  },

  // https://stackoverflow.com/a/50053801/922323
  getDirPathFromFileURL(fileURL) {
    return path.dirname(fileURLToPath(fileURL))
  },

  getCurrentModulePath() {
    return this.getDirPathFromFileURL(import.meta.url)
  },

  async dirExists(dir) {
    try {
      await fs.promises.access(this.normalizePath(dir))
      return true
    } catch (err) {
      return false
    }
  },
}
