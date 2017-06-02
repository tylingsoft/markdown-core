# Markdown Core

[![Code Climate](https://codeclimate.com/github/tylingsoft/markdown-core.png)](https://codeclimate.com/github/tylingsoft/markdown-core)

An extensible markdown engine used in the [Markdown Plus](https://github.com/tylingsoft/markdown-plus) project.


## Installation

```
yarn add markdown-core
```


## Usage

### Node.js

Demo project: https://github.com/tylingsoft/markdown-core-node-demo

### Browser

Please refer to [the example](./dist).


## Development

### Build

```
yarn build
```

Build in realtime:

```
yarn watch
```


### Verify

Host and open `dist/index.html` in browser


## License

MIT


---


## Test

1. Manually review dist/index.html in browser, make sure it look good and everything is fine.
2. In `test/index.js` set `const init = true`.
3. Run `yarn test` to generate fixtures in `test/fixtures`.
4. In `test/index.js` set `const init = false`.
5. Do development, change code.
6. Run `yarn test` to make sure nothing breaks.


## Todo

- PPT
- Create a website for this project
    - GitHub pages
- `mdc.xxx` => `xxx`
- Support mermaid git graph
