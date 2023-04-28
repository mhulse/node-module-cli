import GenericModule from './GenericModule.js'

const genericModule = GenericModule({
  // Options can be passed here:
  red: "black",
  green: "purple",
});

(function start() {
  try {
    let result = genericModule({
      // orange: 'blue',
    }).run();

    console.log(result)
  } catch(err) {
    console.dir(err)
  }
})();
