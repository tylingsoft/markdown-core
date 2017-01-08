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
yarn run build
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
1. Extract source map as a plugin
