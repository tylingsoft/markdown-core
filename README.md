# Markdown Core

An extensible markdown engine used in the [Markdown Plus](https://github.com/tylingsoft/markdown-plus) project.


## Installation

```
yarn add markdown-core
```


## Usage

### Node.js

```javascript
import mdc from 'markdown-core'
const html = mdc.render('# hello world')
```

### Browser

Please refer to [the example](./public).


## Development

### Build

```
yarn build
```

### Verify

Host and open `public/index.html` in browser


## License

MIT


## Todo

1. PPT
1. Extensions: easy to add and configure extensions. by default only core markdown features.
    1. create a class named Extension
1. Create a website for this project
    1. GitHub pages
1. `mdc.math_block` => `math_block`
1. make `fence` and `code_block` plugins
1. move generate assets to public/assets folder
1. use markdown-it provided code highlight
