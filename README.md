# koa-es7-boilerplate

[![Dependency Status](https://david-dm.org/jeffijoe/icebug.svg)](https://david-dm.org/jeffijoe/koa-es7-boilerplate)
[![devDependency Status](https://david-dm.org/jeffijoe/koa-es7-boilerplate/dev-status.svg)](https://david-dm.org/jeffijoe/koa-es7-boilerplate#info=devDependencies)

A boilerplate for writing beautiful `async-await`-based Koa 2 API's with ES7 using `babel`.

## Setting up shop

Clone this repo and adjust details in `package.json`. Read on to learn how to actually start being productive.

## What's in the package?

* A minimal setup for doing dependency injection
* Auto-loading of API "controllers"
* Helper methods for dynamically discovering modules
* `mocha-sinon-chai` testing, as well as `supertest` for API testing
* Routing with `koa-router`
* Parsing request bodies with `koa-bodyparser`
* [`icebug`](https://github.com/jeffijoe/icebug) for debugging
* `babel` with `es2015` + `stage-1` presets, `transform-runtime` plugin and sourcemaps as well as `babel-polyfill` for `async-await` support
* **Source map support with nice stack traces!**
* `eslint` (+ optional watch-mode) with rules I think are nice, works with ES7 thanks to `babel-eslint`
* Helper methods for setting status + response content - e.g. `ctx.ok()`, `ctx.notFound()`, etc...
* CORS middleware with `kcors`
* `app-module-path` for improving your module importing life
* `nodemon` for development to auto-restart when your files change
* Nifty `npm run` scripts, see next section for details
* [`yenv`](https://github.com/jeffijoe/yenv) for environment variable management
* [`Awilix`](https://github.com/jeffijoe/awilix) for dependency injection / IoC

## `npm run` scripts

There are a few defined run scripts, here's a list of them with a description of what they do. To run them, simply execute `npm run <script name>` - e.g. `npm run dev`

* `start`: Used by the production environment to start the app. This will run a compiled version, so you need to execute `build` first.
* `build`: Runs the `babel` CLI to compile the app. Files are emitted to `dist/`.
* `dev`: Runs the app in development mode - uses `babel-register` to compile on-the-fly. Also uses `nodemon` to automatically restart when stuff changes.
* `debug`: Runs the app in development mode with `icebug` (a combo of `nodemon` + `node-inspector`).
* `test`: Runs `mocha` tests.
* `test-watch`: Runs `mocha` tests in watch-mode.
* `lint`: Lints the code in `src` and `test` with `eslint`.
* `lint-watch`: Same as above, in watch-mode.

**Tip**: to pass additional arguments to the actual CLI's being called, do it like in this example:

```bash
npm run test -- --debug
```

*Note the __`--`__ before the actual arguments.*

## Directory structure

The repository root contains config files, e.g. eslint config, gitignore, etc.

* `src`: the actual source for the app goes here. Duh.
  * `api`: API endpoints go here, and are automatically loaded at startup. Please see the section about API endpoints for details.
  * `bin`: files that are usually executed by `npm run` scripts, e.g. starting the server.
  * `lib`: stuff that helps the app start up, e.g. environment, utilities for loading modules, the container implementation, etc.
  * `middleware`: custom app middleware.
  * `services`: application services, this is just to illustrate the dynamic discovery of stuff as described in the Dependency injection section.
* `test`: tests for the source code. You usually want to replicate the source structure.
  * `_helpers`: test helpers


## Environment variables

So the environment variables can be reached by importing `lib/env`.

```
import env from 'lib/env';

// When NODE_ENV=production
env.prod === true;
env.dev === false;

// otherwise...
env.prod === false;
env.dev === true;
```

Additionally, all environment variables you'd usually find on `process.env` will be available on this object.

In the repository root, you will find a `env.yaml`, which is where you can set up environment variables so you won't have to do it from your shell. This also makes it more platform-agnostic.

The top-level nodes in the YAML-file contain a set of environment variables.
`yenv` will load the set that matches whatever `NODE_ENV` says.

I've set it up so anything in `tests` will override anything in `development` when running tests.

*Actual environment variables will take precedence over the `env.yaml` file!*

See the [`yenv` docs](https://github.com/jeffijoe/yenv) for more info.

## Dependency injection

This boilerplate uses the [`Awilix`](https://github.com/jeffijoe/awilix) container for managing dependencies - please check out the Awilix documentation
for details. The container is configured in `lib/configureContainer.js`.

## Middleware

Middleware is located in the `middleware` folder. The `responseCalls` middleware can be removed if you don't want it, I personally find it quite nice with helper methods such as:

* `ctx.ok()`
* `ctx.notFound()`
* `ctx.badRequest()`

and so on, check the file for details. Middleware is *not* automatically loaded, and should be installed in `lib/createServer`.

## app-module-path - what?

Basically, instead of `import stuff from '../../../../../lib/stuff'`, you can use `import stuff from 'lib/stuff'`.

# Authors

* Jeff Hansen - [@Jeffijoe](https://twitter.com/Jeffijoe)
* Jon West - [@ddproxy](https://twitter.com/ddproxy)

# License

MIT.