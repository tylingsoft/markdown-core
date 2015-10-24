# Markdown Core


## todo

1. 将这里的核心代码移植到 Markdown Plus， 从而升级 M+
    1. mdp should take advantages of mdc
1. 新的project：markdown-it-icons 支持 emoji，fontawesome, ionicons ...etc.
1. source map feature? 左右同步滚动需要这个
1. 也许这个项目才是快速扩展 markdown-it 的方法: https://github.com/markdown-it/markdown-it-for-inline
    1. 代码短了很多，灵活性也更好。比如它可以直接修改当前token甚至下一个token的内容和属性。
1. https://www.npmjs.com/package/markdown-it-sanitizer
    1. 可以修正用户输入的 html 的错误
1. this feature is really interesting: https://www.npmjs.com/package/markdown-it-decorate
    1. 这个功能上好像是它的子集： https://www.npmjs.com/package/markdown-it-classy
    1. 还有个类似的： https://www.npmjs.com/package/markdown-it-attrs
    1. 功能上很激进，是否要支持？
1. ionicons 托管到 jsdelivr
    1. 已经提交了，等待 merge
1. 将来也可以考虑这个： https://www.npmjs.com/package/markdown-it-html5-embed
    1. 重用了图片的语法来支持视频嵌入，挺好
1. 控制图片大小，可能可以用到：https://www.npmjs.com/package/markdown-it-imsize
1. 包管理改成 npm + browserify ＋ uglify
    1. http://dontkry.com/posts/code/using-npm-on-the-client-side.html
