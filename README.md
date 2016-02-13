# Markdown Core

Markdown engine based on [markdown-it](https://github.com/markdown-it/markdown-it)
and used in the [Markdown Plus](https://github.com/tylingsoft/markdown-plus) project.


## Installation

`npm install --save markdown-core`


## Usage

### Node.js

```javascript
var mdc = require('markdown-core/markdown-core-node');
var html = mdc.render('# hello world');
```

### Browser

Please refer to `index.html` and `index.js`.


## License

MIT


## todo

1. echarts: http://www.oschina.net/news/68671/echarts-3-beta
    1. this is the selling point
1. bug: resetIds doesn't work
    1. https://github.com/MoOx/markdown-it-toc-and-anchor/issues/8
