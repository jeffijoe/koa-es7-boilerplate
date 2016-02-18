// First argument is the container,
// then the actual args follow.
//
// This is because we've bound these methods with the container.
// We are exporting the methods so they can be tested
// with mock dependencies.
export async function getStuff({}, someArg) {
  return someArg + ' The answer is 42.';
}

// The function being called when registering services.
export default function (container) {
  // We register the stuff we want to expose.
  // That means when dependents need this service,
  // they must reference it as `someService` in the container.
  container.someService = container.bindAll({
    getStuff
  });
}