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
1. multiple themes
1. bug: toc doesn't support superscript, subscript, font awesome...etc.
    1. hard, need to learn how markdown-it is implemented.
    1. or it's not necessary?
    1. created issue for the original GitHub project
1. toc and heading anchor must be implemented in separate plugins
    1. necessary?
1. heading anchors scroll with animation: http://stackoverflow.com/questions/7717527/jquery-smooth-scrolling-when-clicking-an-anchor-link
