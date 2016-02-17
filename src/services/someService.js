// First argument is the container,
// then the actual args follow.
//
// This is because we've bound these methods with the container.
export async function getStuff({}, someArg) {
  return someArg + ' The answer is 42.';
}

// The function being called when registering services.
export default function (container, bind) {
  container.someService = {
    getStuff: bind(getStuff)
  };
}