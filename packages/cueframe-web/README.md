# cueframe-web
The Cueframe web application. Built using [React](https://reactjs.org/).

## Getting started
This is a child project of a monorepo. Check out the [Cueframe readme](#../../README.md) for help getting the project set up.

## Building & serving the application
Outlines the steps to build and/or serve this specific package for development or production. However, the backend systems need to be running locally as well for the application to fully function.

Check out the [Cueframe readme](#../../README.md) if trying build/serve all applications together.

If only interested in building/serving this single package (i.e. in the case of development/debugging), the various available commands are outlined below.

### for production
Build web application:
```
npm run build
```

Start prod server: (assumes build step has completed):
```
npm run start
```
> The web application will be running on http://localhost:9000/

### for development
The `build` step can be skipped, because the dev server will compile the application in-memory when starting.

Start the dev server (and app server), compiling the application in-memory:
```
npm run dev
```
> Your default browser will automatically open the web application at http://localhost:3000/

For the application to work in development mode when using [create-react-app](https://github.com/facebook/create-react-app), an app server is spun up to make all server routes available. The `dev` command will run this process [concurrently](https://www.npmjs.com/package/concurrently) (on port `9000`), and configure the dev server to [proxy](https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development) unknown requests to this running process.
> It's important to note that the development server will **only** attempt to send requests without text/html in its `Accept` header to the proxy.

When running, the dev server will enable [HMR](https://webpack.js.org/concepts/hot-module-replacement/) in order to reflect code changes without rebundling. In addition, the application server will use [chokidar](https://www.npmjs.com/package/chokidar) to watch for changes in express routers, and delete the require cache so that changes are reflected on subsequent requests (without the need to relaunch the server).
> Everything in the `server/app/*` folder will be watched

## Tesing the application
Run all test suites:
```
npm run test
```

A watch mode is also available, which will only run tests that did not previously pass, and re-trigger tests that need to run after making changes:
```
npm run test:watch
```
> See the [create-react-app docs](https://facebook.github.io/create-react-app/docs/running-tests) on running tests for more information on this behavior.

## User Session
Currently, an in-memory session will be generated using [express-session](https://www.npmjs.com/package/express-session). This is not production-ready; it is only used for testing user flows. Eventually, it will connect to a backend session store.

The test credentials are as follows:

**email:** test@test.com
**password:** test

## Known limitations
- The user session management only works with a supplied user
- There is no registration form
- Drag-and-drop currently only works with folders. Does not work with single files or sets of files
- Drag-and-drop does not restrict by file type, or handle error scenarios / rejected files