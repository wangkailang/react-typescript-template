# React typescript template

## Install

### Install React and React DOM

```bash
yarn add react react-dom
```

### Install Webpack, Webpack CLI and Webpack Dev Server

```bash
yarn add --save-dev webpack
yarn add --save-dev webpack-cli
yarn add --save-dev webpack-dev-server
```

### Install Babel

```bash
yarn add --save-dev @babel/core babel-loader
yarn add --save-dev @babel/preset-env @babel/preset-react
```

- `@babel/core` Babel compiler.
- `babel-loader` Babel module loader for webpack.
- `@babel/preset-env` Babel preset for each environment.
- `@babel/preset-react` Babel preset for all React plugins.

### Install Typescript

```bash
yarn add --save-dev typescript
yarn add --save-dev @babel/preset-typescript
yarn add --save-dev @types/react @types/react-dom
```

- `@babel/preset-typescript` Babel preset for TypeScript.

### Else

```bash
yarn add --save-dev @types/webpack-env
yarn add --save-dev react-hot-loader html-webpack-plugin
```

## Configures

### Babel Setting

Create `.babelrc` file and the following configuration:

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```


