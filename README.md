# Markdown Core

Markdown engine based on [markdown-it](https://github.com/markdown-it/markdown-it)
and used in the [Markdown Plus](https://github.com/tylingsoft/markdown-plus) project.


## Installation

```
yarn add markdown-core
```


## Usage

### Node.js

```javascript
const mdc = require('markdown-core');
const html = mdc.render('# hello world');
```

### Browser

Please refer to [the example](./test).


## Delopment

### Build

```
yarn run build
```

### Test

Host and open test/index.html in browser


## License

MIT


## todo

1. PPT
1. plugins: easy to add and configure plugins. by default only core markdown features.
    1. create a class named Plugin / Extension
1. get rid of ionicons because this project is not active
