# 2048

# About Branches

There are two branches, the "build" and the "deploy" branch.

The "build" branch contains everything for creating the web app, for example, the TypeScript files.

The "deploy" branch contains the stuff needed for hosting the app, for example, the JavaScript files and the html file.

# Setup

Copy the `index.html` file from the "deploy" branch into the "build" branches root directory.

Create a virtual environment using `requirements.txt`, instructions can be found [here](https://gist.github.com/Samuel-Risner/2318e00383ebf54dfc96e7a04e691334).

Install the node stuff for compiling the TypeScript files:

```shell
npm install
```

# Build instructions

To build the TypeScript files (using webpack):

```shell
npm run build_wp
```

To watch the TypeScript files (using webpack):

```shell
npm run watch_wp
```

To build TailwindCSS (minified):

```shell
npm run build_tw
```

To watch TailwindCSS:

```shell
npm run watch_tw
```
