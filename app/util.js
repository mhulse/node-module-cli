import path from 'path'
import { fileURLToPath } from 'url'

// TODO: make more modular, like: https://stackoverflow.com/a/30282425/922323
export default {
  getDirName(moduleUrl) {
    const filename = fileURLToPath(moduleUrl)
    return path.dirname(filename)
  }
}
