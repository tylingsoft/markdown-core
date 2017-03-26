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

Please refer to [the example](./dist).


## Development

### Build

```
yarn build
```

### Verify

Host and open `dist/index.html` in browser


## License

MIT


## Todo

- PPT
- Create a website for this project
    - GitHub pages
- `mdc.math_block` => `math_block`
- setup Travis CI and coveralls.io, add badges
- move all the features into markdown-it plugin
- Reduce global varaibles (`window.xxx =` )
