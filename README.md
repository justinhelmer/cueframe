# Cueframe
Cueframe [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md) (uses [Lerna](https://github.com/lerna/lerna)).

## Getting started
Assumes lates Node LTS (10.x Dubnium)

Globally install the lerna package:
```
npm i -g lerna
```

Install dependencies, linking any cross-dependencies:
```
lerna bootstrap
```

## Building & serving the application
Lerna allows us to build / serve all packages at once

### for production
Build all packages:
```
lerna run build
```

Start all prod servers in parallel, streaming output of children processes (assumes build step has completed):
```
lerna run start --parallel
```
> The web application will be running on http://localhost:9000/

### for development
The `build` step can be skipped, because the dev server will compile the application in-memory when starting

Start all dev servers in parallel, streaming output of children processes:
```
lerna run dev --parallel
```
> Your default browser will automatically open the web application at http://localhost:3000/

## Tesing the application
Run all test suites across all packages:
```
lerna run test
```

## Additional behaviors
[Lerna](https://github.com/lerna/lerna) is very powerful and has a number of features for maintaining version changes, publishing packages, running scripts across all packages, etc.

Adding a dependency:
```
lerna add [pkg] [matcher]
// lerna add some-package packages/cueframe-web
// lerna add some-package packages/cueframe-*
```

See the [lerna command docs](https://github.com/lerna/lerna/tree/master/commands) for more info on the available commands and what they do.

## Packages
- [cueframe-web](./packages/cueframe-web)



