# koa-es7-boilerplate

[![dependency Status](https://img.shields.io/david/jeffijoe/koa-es7-boilerplate.svg?maxAge=1000)](https://david-dm.org/jeffijoe/koa-es7-boilerplate)
[![devDependency Status](https://img.shields.io/david/dev/jeffijoe/koa-es7-boilerplate.svg?maxAge=1000)](https://david-dm.org/jeffijoe/koa-es7-boilerplate)
[![npm](https://img.shields.io/npm/l/koa-es7-boilerplate.svg?maxAge=1000)](https://github.com/jeffijoe/koa-es7-boilerplate/blob/master/LICENSE.md)
[![node](https://img.shields.io/node/v/koa-es7-boilerplate.svg?maxAge=1000)](https://www.npmjs.com/package/koa-es7-boilerplate)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A boilerplate for writing beautiful `async-await`-based Koa 2 API's with ES7 using `babel` for **Node v8.0 and above!**.

## Setting up shop

Clone this repo and adjust details in `package.json`. Read on to learn how to actually start being productive.

## What's in the package?

* Auto-loading of API "controllers"
* Nifty `npm run` scripts, see next section for details
* `babel` with `env` presets, `transform-runtime` + `transform-object-rest-spread` plugins and sourcemaps
* `mocha-sinon-chai` testing, as well as `supertest` for API testing
* Code coverage with `istanbul` + `nyc` (yes, **with ES7 support!**)
* Routing with `koa-router`
* Parsing request bodies with `koa-bodyparser`
* **Source map support with nice stack traces!**
* `eslint` (+ optional watch-mode) with [standard][standard], works with ES7 thanks to `babel-eslint`
* CORS middleware with `kcors`
* `app-module-path` for improving your life when importing code in tests
* `nodemon` for development to auto-restart when your files change
* [`koa-respond`][respond] for helper functions on the context.
* [`yenv`][yenv] for environment variable management
* [`awilix`][awilix] for dependency injection / IoC

## `npm run` scripts

There are a few defined run scripts, here's a list of them with a description of what they do. To run them, simply execute `npm run <script name>` - e.g. `npm run dev`

* `start`: Used by the production environment to start the app. This will run a compiled version, so you need to execute `build` first.
* `build`: Runs the `babel` CLI to compile the app. Files are emitted to `dist/`.
* `dev`: Runs the app in development mode - uses `babel-node` to compile on-the-fly. Also uses `nodemon` to automatically restart when stuff changes.
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
import env from '../lib/env';
```

Additionally, all environment variables you'd usually find on `process.env` will be available on this object.

In the repository root, you will find a `env.yaml`, which is where you can set up environment variables so you won't have to do it from your shell. This also makes it more platform-agnostic.

The top-level nodes in the YAML-file contain a set of environment variables.
`yenv` will load the set that matches whatever `NODE_ENV` says.

I've set it up so anything in `tests` will override anything in `development` when running tests.

*Actual environment variables will take precedence over the `env.yaml` file!*

See the [`yenv` docs](https://github.com/jeffijoe/yenv) for more info.

## API endpoints

Each file in `/api` exports a default function that takes the router as the first parameter. That function registers API endpoints.

## Dependency injection

This boilerplate uses the [`Awilix`](https://github.com/jeffijoe/awilix) container for managing dependencies - please check out the Awilix documentation
for details. The container is configured in `lib/configureContainer.js`.

## Middleware

Middleware is located in the `middleware` folder and is *not* automatically loaded - they should be installed in `lib/createServer`.

## app-module-path - what?

Basically, instead of `import stuff from '../../../../../lib/stuff'`, you can use `import stuff from 'lib/stuff'` in your tests.

# Authors

* Jeff Hansen - [@Jeffijoe](https://twitter.com/Jeffijoe)

# License

MIT.

[standard]: http://standardjs.com/
[respond]: https://github.com/jeffijoe/koa-respond
[yenv]: https://github.com/jeffijoe/yenv
[awilix]: https://github.com/jeffijoe/awilix
[icebug]: https://github.com/jeffijoe/icebug
