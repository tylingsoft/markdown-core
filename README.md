# Markdown Core

Markdown engine based on [markdown-it](https://github.com/markdown-it/markdown-it) and used in the [Markdown Plus](https://github.com/tylingsoft/markdown-plus) project.


## Usage

Please refer to `index.html` and `index.js`.


## License

MIT


## todo

1. echarts: http://www.oschina.net/news/68671/echarts-3-beta
    1. this is the selling point
1. multiple themes
1. toc doesn't support superscript, subscript, font awesome...etc.
    1. hard, need to learn how markdown-it is implemented.
    1. or it's not necessary?
1. make source map configurable, disabed by default
1. toc and heading anchor must be implemented in separate plugins
    1. necessary?


## note

- Upgrade es6-shim from 0.33.13 to 0.34.0 introduced a weird bug: Markdown Plus editor press enter auto insert the last character of previous line.
    - Will take a look later
