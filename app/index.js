import GenericModule from './GenericModule.js'

const genericModule = GenericModule({
  // Options can be passed here:
  red: "black",
  green: "purple",
})

(async function start() {
  console.log("before")

  try {
    let result = await genericModule({
      // Options can also be passed here:
      // orange: "blue",
    }).run()

    console.log(result)
  } catch(err) {
    console.dir(err)
  }

  console.log("after")
})()
