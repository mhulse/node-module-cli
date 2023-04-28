const GenericModule = (function () {
  const defaults = {
    red: "red",
    green: "green",
    orange: "orange",
  }

  class GenericModule {
    constructor(options = {}) {
      if (! GenericModule.instance) {
        GenericModule.instance = this
      }

      this.options = options

      return GenericModule.instance
    }

    static init(options = {}) {
      const instance = new GenericModule()

      instance.options = {
        ... defaults,
        ... instance.options,
        ... options,
      }

      return instance
    }

    run() {
      if ( ! (this.options.orange == "orange")) {
        throw new Error(`Orange isn’t orange, it’s ${this.options.orange}!`)
      }

      console.log("options:", this.options)

      return "Fuck yah"
    }
  }

  return GenericModule
}())

export default (options = {}) => {
  if (Object.entries(options).length) {
    console.log("shit")

    new GenericModule(options)
  }

  return GenericModule.init
}
