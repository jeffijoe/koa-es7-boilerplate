// An API method.
export const stuff = async ({ someService }, ctx) => {
  // Dependencies are passed in with an object as the first parameter.
  const data = await someService.getStuff('What is the universe?');

  // .ok comes from responseCalls.js middleware.
  return ctx.ok({ data });
};

// The default export is the registration function.
// It gets passed the router, and the container
// which is used to bind the router calls so the container is
// injected into each method. You can use classes here if
// that's what floats your boat.
export default function (router, { bind }) {
  // router is a KoaRouter.
  router.get(
    '/api/stuff',
    // bind comes from the container
    bind(stuff)
  );
}