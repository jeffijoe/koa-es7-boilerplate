// The function being called when registering services.
export default function () {
  async function getStuff (someArg) {
    return someArg + ' The answer is 42.'
  }

  return {
    getStuff
  }
}
