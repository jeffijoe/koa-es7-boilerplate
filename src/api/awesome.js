// An API method.
export const getStuff = async ({ someService }, ctx) => {
  // Dependencies are passed in with an object as the first parameter.
  const data = await someService.getStuff('What is the universe?');

  // .ok comes from responseCalls.js middleware.
  return ctx.ok({ data });
};

// Another API method
export const postStuff = async ({}, ctx) => {
  // echo back stuff to prove bodyparser works.
  return ctx.ok({ youSaid: ctx.request.body });
};

// The default export is the registration function.
// It gets passed the router, and the container
// which is used to bind the router calls so the container is
// injected into each method. You can use classes here if
// that's what floats your boat.
export default function (router, { bind }) {
  // router is a KoaRouter.
  router
    .get(
      '/api/stuff',
      // bind comes from the container
      bind(getStuff)
    )
    .post(
      '/api/stuff',
      bind(postStuff)
    );
}