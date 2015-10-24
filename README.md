# Markdown Core


## todo

1. 根据 heading 生成大纲树形结构： http://www.ztree.me/v3/demo.php#_101
    1. 正好 github 也是有 sidebar 的，界面可以继续模仿之。
    1. 会对生成pdf，image之类的造成影响
1. 将这里的核心代码移植到 Markdown Plus， 从而升级 M+
    1. mdp should take advantages of mdc
1. gantt x lables
1. 新的project： markdown-it-icons 支持 emoji，fontawesome, ionicons ...etc.
1. source map feature? 左右同步滚动需要这个
1. merge all the assets into one and host it locally?
    1. there might be some apps to do this
    1. and name it markdown-core.full.js ?
    1. is it possible because some libraries depends on external fonts and images.
1. toc
1. https://www.npmjs.com/browse/keyword/markdown-it-plugin
1. https://www.npmjs.com/browse/keyword/markdown-it
1. 也许这个项目才是快速扩展 markdown-it 的方法: https://github.com/markdown-it/markdown-it-for-inline
    1. 代码短了很多，灵活性也更好。比如它可以直接修改当前token甚至下一个token的内容和属性。
1. https://www.npmjs.com/package/markdown-it-sanitizer
1. this feature is really interesting: https://www.npmjs.com/package/markdown-it-decorate
    1. 这个功能上好像是它的子集： https://www.npmjs.com/package/markdown-it-classy
