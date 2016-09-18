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

1. PPT
1. Fix math font issue:

```math
\frac{{\frac{{1}}{{2}}{\left[{1}-{\left(\frac{{1}}{{2}}\right)}^{{n}}\right]}}}{{{1}-{\left(\frac{{1}}{{2}}\right)}}}={s}_{{n}}
```


```math
\dfrac{ \tfrac{1}{2}[1-(\tfrac{1}{2})^n] }{ 1-\tfrac{1}{2} } = s_n
```

`$\frac{{\frac{{1}}{{2}}{\left[{1}-{\left(\frac{{1}}{{2}}\right)}^{{n}}\right]}}}{{{1}-{\left(\frac{{1}}{{2}}\right)}}}={s}_{{n}}$`

`$\dfrac{ \tfrac{1}{2}[1-(\tfrac{1}{2})^n] }{ 1-\tfrac{1}{2} } = s_n$`
