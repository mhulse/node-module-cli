import GenericModule from './GenericModule.js'

const genericModule = GenericModule({
  // Options can be passed here:
  color: "orange",
})

;(async function start() {
  console.log("before")

  try {
    let result = await genericModule({
      // … and options can be passed here:
      //color: "blue",
    }).run()

    console.log(result)
  } catch(err) {
    console.error("Exiting app due to error:".red, "\n", err)
  }

  console.log("after")
})()
