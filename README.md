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
- `mdc.xxx` => `xxx`
- setup Travis CI and coveralls.io, add badges
- move all the features into markdown-it plugin
