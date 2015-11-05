# Markdown Core


## todo

1. https://www.npmjs.com/package/markdown-it-sanitizer
    1. 可以修正用户输入的 html 的错误
1. this feature is really interesting: https://www.npmjs.com/package/markdown-it-decorate
    1. 这个功能上好像是它的子集： https://www.npmjs.com/package/markdown-it-classy
    1. 还有个类似的： https://www.npmjs.com/package/markdown-it-attrs
    1. 功能上很激进，是否要支持？
1. 将来也可以考虑这个： https://www.npmjs.com/package/markdown-it-html5-embed
    1. 重用了图片的语法来支持视频嵌入，挺好
1. 控制图片大小，可能可以用到：https://www.npmjs.com/package/markdown-it-imsize
1. 包管理改成 npm + browserify ＋ uglify
    1. http://dontkry.com/posts/code/using-npm-on-the-client-side.html
    1. 一个重要的意义是混淆代码
1. GitHub heading, hover to show quick anchor link
    1. 貌似有第三方的插件可以实现。这个很简单，第三方也应该足够了。
1. 提供labels： http://getbootstrap.com/components/#labels
1. 使用mermaidAPI直接输出结果
    1. mermaid 最新的api貌似被作者改残了： https://github.com/knsv/mermaid/issues/239
1. config code block 用户配置专用。不会输出到页面上。比如修改css文件？
    1. 用这种配置文件的方式来替代界面，也不失为一个好办法。
    1. 参考visual studio code等等的配置文件
1. markdown-it-toc 项目生成的html结构上有问题。 抽空研究下。 挺棘手。
    1. 改成jquery实现也未尝不可。
    1. 此功能暂时移除了。有缺陷的实现，宁可不要。
