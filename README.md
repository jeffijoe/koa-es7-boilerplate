# Koa Boilerplate

<a href="https://communityinviter.com/apps/koa-js/koajs" rel="KoaJs Slack Community">![KoaJs Slack](https://img.shields.io/badge/Koa.Js-Slack%20Channel-Slack.svg?longCache=true&style=for-the-badge)</a>



✨ A boilerplate for writing beautiful `async-await`-based Koa API's using `babel` for **Node v8.0 and above!**. 🚀

## Setting up shop

Clone this repo and adjust details in `package.json`. Remove the `.git` directory and `git init` to start fresh.

Read on to learn how to actually start being productive.

## What's in the package?

- 🏃‍♀️&nbsp;&nbsp;&nbsp;`npm run` scripts, see next section for details.
- 🛣 &nbsp;&nbsp;[`awilix-koa`][awilix-koa] for declarative routing.
- 🗣&nbsp;&nbsp;&nbsp;[`babel`][babel] with `env` presets, `transform-runtime` + `transform-object-rest-spread` plugins and sourcemaps.
- 🃏&nbsp;&nbsp;&nbsp;[`jest`][jest] for testing with some API testing helpers.
- 💪&nbsp;&nbsp;&nbsp;[`koa-bodyparser`][koa-bodyparser] for parsing request bodies.
- ✅ &nbsp;&nbsp;[`eslint`][eslint] with [standard][standard], works with ES7 thanks to `babel-eslint`.
- 👀 &nbsp;&nbsp;[`prettier`][prettier] code formatting, configured to work with `eslint` out of the box.
- 🐶 &nbsp;&nbsp;[`husky`][husky] + [`lint-staged`][lint-staged] to lint and format files when committing.
- ❌ &nbsp;&nbsp;[`@koa/cors`][cors] CORS middleware for cross-domain requests.
- 🕵️‍♀️&nbsp;&nbsp;&nbsp;[`nodemon`][nodemon] for development to auto-restart when your files change.
- 🛠 &nbsp;&nbsp;[`koa-respond`][respond] for helper functions on the context.
- 📄 &nbsp;&nbsp;&nbsp;[`yenv`][yenv] for environment variable management.
- 💉 &nbsp;&nbsp;&nbsp;[`awilix`][awilix] for dependency injection / IoC.
- ⚠️ &nbsp;&nbsp;&nbsp;[`fejl`][fejl] for assertions and errors.

## `npm run` scripts

There are a few defined run scripts, here's a list of them with a description of what they do. To run them, simply execute `npm run <script name>` - e.g. `npm run dev`

- `start`: Used by the production environment to start the app. This will run a compiled version, so you need to execute `build` first.
- `build`: Runs the `babel` CLI to compile the app. Files are emitted to `dist/`.
- `dev`: Runs the app in development mode - uses `babel-node` to compile on-the-fly. Also uses `nodemon` to automatically restart when stuff changes.
- `test`: Runs tests.
- `cover`: Runs tests and collects coverage.
- `lint`: Lints + formats the code.

**Tip**: to pass additional arguments to the actual CLI's being called, do it like in this example:

**For npm:**

```bash
# Note the `--` before the actual arguments.
npm run test -- --debug
```

**For yarn:**

```bash
# Yarn does not need the `--` before the actual arguments.
yarn test --debug
```

## `docker-compose up` scripts

**For running dev:**

```bash
# Note: use --build only when you want to build. Usually when you change packages.json
docker-compose up --build
```

**For running test:**

```bash
docker-compose -f docker-compose.test.yml up
```


## Directory structure

The repository root contains auxiliary files like `package.json`, `.gitignore`, etc.

- `src`: the actual source for the app goes here. Duh.
  - `__tests__`: In the source root folder, contains integration tests.
  - `routes`: API endpoints go here, and are automatically loaded at startup. Please see the section about API endpoints for details.
  - `bin`: files that are usually executed by `npm run` scripts, e.g. starting the server.
  - `lib`: stuff that helps the app start up, e.g. environment, logger, the container configuration, etc.
  - `middleware`: custom app middleware.
  - `services`: application services, this is just to illustrate the dynamic discovery of stuff as described in the Dependency injection section.
    - `__tests__`: Unit tests for files in the `services` directory.
  - `[your directory]`: you can plop anything else here, too.
    - `__tests__`: Unit tests for files in your directory.

## Testing

To recap the previous section, `src/__tests__` are for integration tests, and any `__tests__` folder under `src/<folder>` are unit tests.

Test files must end with `.test.js`.

There is a [`src/__tests__/api-helper.js`][api-helper] that makes writing integration tests way easier. Simply replace the example functions with ones matching your own API. The created server instance is closed whenever all tests are done as to not leak resources. This is why it's **important to close network connections in the [`close`][close-event] event!**

## Environment variables

The environment variables can be reached by importing `lib/env`.

```
import { env } from '../lib/env'
```

Additionally, all environment variables you'd usually find on `process.env` will be available on this object.

When attempting to access a key (`env.PORT` for example), if the key does not exist an error is thrown and the process terminated.

In the repository root, you will find a `env.yaml`, which is where you can set up environment variables so you won't have to do it from your shell. This also makes it more platform-agnostic.

The top-level nodes in the YAML-file contain a set of environment variables.
`yenv` will load the set that matches whatever `NODE_ENV` says.

I've set it up so anything in `tests` will override anything in `development` when running tests.

_Actual environment variables will take precedence over the `env.yaml` file!_

See the [`yenv` docs](https://github.com/jeffijoe/yenv) for more info.

## API endpoints

Each file in `/routes` exports a "controller" that `awilix-koa` will use for routing. Please see [`awilix-koa`](https://github.com/jeffijoe/awilix-koa#awesome-usage) docs for more information.

## Dependency injection

This boilerplate uses the [`Awilix`](https://github.com/jeffijoe/awilix) container for managing dependencies - please check out the Awilix documentation
for details. The container is configured in `lib/container.js`.

## Middleware

Middleware is located in the `middleware` folder and is _not_ automatically loaded - they should be installed in `lib/server`.

# Author

- Jeff Hansen - [@Jeffijoe](https://twitter.com/Jeffijoe)

# License

MIT.

[api-helper]: /src/__tests__/api-helper.js
[close-event]: /src/lib/server.js#L58
[standard]: http://standardjs.com/
[koa-router]: https://github.com/alexmingoia/koa-router
[babel]: https://github.com/babel/babel
[jest]: https://github.com/facebook/jest
[koa-bodyparser]: https://github.com/koajs/bodyparser
[eslint]: https://github.com/eslint/eslint
[prettier]: https://github.com/prettier/prettier
[husky]: https://github.com/typicode/husky
[lint-staged]: https://github.com/okonet/lint-staged
[cors]: https://github.com/koajs/cors
[nodemon]: https://github.com/remy/nodemon
[respond]: https://github.com/jeffijoe/koa-respond
[yenv]: https://github.com/jeffijoe/yenv
[awilix]: https://github.com/jeffijoe/awilix
[awilix-koa]: https://github.com/jeffijoe/awilix-koa
[smid]: https://github.com/jeffijoe/smid
[fejl]: https://github.com/jeffijoe/fejl
