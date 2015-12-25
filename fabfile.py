from fabric.api import local


def update():
    local('ncu -u')
    local('npm install')


def css():
    local('rm -rf dist/css/*.css')
    local('rm -rf dist/css/fonts/*')
    local('rm -rf dist/fonts/*')
    local('curl https://cdn.jsdelivr.net/github-markdown-css/2.1.1/github-markdown.css > dist/css/markdown-core.css')
    local('curl https://cdn.jsdelivr.net/highlight.js/9.0.0/styles/github.min.css >> dist/css/markdown-core.css')
    local('curl https://cdn.jsdelivr.net/emojione/1.5.2/assets/css/emojione.min.css >> dist/css/markdown-core.css')
    local('curl https://cdn.jsdelivr.net/mermaid/0.5.6/mermaid.css >> dist/css/markdown-core.css')
    local('curl https://cdn.jsdelivr.net/fontawesome/4.5.0/css/font-awesome.min.css >> dist/css/markdown-core.css')
    for font in """https://cdn.jsdelivr.net/fontawesome/4.5.0/fonts/FontAwesome.otf
https://cdn.jsdelivr.net/fontawesome/4.5.0/fonts/fontawesome-webfont.eot
https://cdn.jsdelivr.net/fontawesome/4.5.0/fonts/fontawesome-webfont.svg
https://cdn.jsdelivr.net/fontawesome/4.5.0/fonts/fontawesome-webfont.ttf
https://cdn.jsdelivr.net/fontawesome/4.5.0/fonts/fontawesome-webfont.woff
https://cdn.jsdelivr.net/fontawesome/4.5.0/fonts/fontawesome-webfont.woff2""".split('\n'):
        local('cd dist/fonts/ && wget ' + font)
    local('curl https://cdn.jsdelivr.net/ionicons/2.0.1/css/ionicons.min.css >> dist/css/markdown-core.css')
    for font in """https://cdn.jsdelivr.net/ionicons/2.0.1/fonts/ionicons.eot
https://cdn.jsdelivr.net/ionicons/2.0.1/fonts/ionicons.svg
https://cdn.jsdelivr.net/ionicons/2.0.1/fonts/ionicons.ttf
https://cdn.jsdelivr.net/ionicons/2.0.1/fonts/ionicons.woff""".split('\n'):
        local('cd dist/fonts/ && wget ' + font)
    local('curl https://cdn.jsdelivr.net/katex/0.5.1/katex.min.css >> dist/css/markdown-core.css')
    for font in """https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_AMS-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_AMS-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_AMS-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_AMS-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Caligraphic-Bold.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Caligraphic-Bold.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Caligraphic-Bold.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Caligraphic-Bold.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Caligraphic-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Caligraphic-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Caligraphic-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Caligraphic-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Fraktur-Bold.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Fraktur-Bold.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Fraktur-Bold.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Fraktur-Bold.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Fraktur-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Fraktur-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Fraktur-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Fraktur-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Bold.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Bold.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Bold.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Bold.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Italic.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Italic.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Italic.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Italic.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Main-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-BoldItalic.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-BoldItalic.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-BoldItalic.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-BoldItalic.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-Italic.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-Italic.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-Italic.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-Italic.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Math-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Bold.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Bold.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Bold.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Bold.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Italic.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Italic.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Italic.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Italic.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_SansSerif-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Script-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Script-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Script-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Script-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size1-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size1-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size1-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size1-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size2-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size2-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size2-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size2-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size3-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size3-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size3-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size3-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size4-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size4-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size4-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Size4-Regular.woff2
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Typewriter-Regular.eot
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Typewriter-Regular.ttf
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Typewriter-Regular.woff
https://cdn.jsdelivr.net/katex/0.5.1/fonts/KaTeX_Typewriter-Regular.woff2""".split('\n'):
        local('cd dist/css/fonts/ && wget ' + font)
    local('cat markdown-core.css >> dist/css/markdown-core.css')


def js():
    local('rm -rf dist/*.js')
    local('browserify markdown-core-node.js -s mdc > dist/markdown-core.js')
    local('echo "\n" >> dist/markdown-core.js')
    local('curl https://cdn.jsdelivr.net/jquery/2.1.4/jquery.min.js >> dist/markdown-core.js')
    local('echo "\n" >> dist/markdown-core.js')
    local('curl https://cdn.jsdelivr.net/js-cookie/2.0.4/js.cookie.js >> dist/markdown-core.js')
    local('echo "\n" >> dist/markdown-core.js')
    local('curl https://cdn.jsdelivr.net/mermaid/0.5.6/mermaid.min.js >> dist/markdown-core.js')
    local('echo "\n" >> dist/markdown-core.js')
    local('cat markdown-core-browser.js >> dist/markdown-core.js')
    local('uglifyjs dist/markdown-core.js -cmo dist/markdown-core.min.js')
    local('rm dist/markdown-core.js')


def dist():
    local('npm install')
    css()
    js()


def mdm(): # copy dist code to Markdown Mate project
    local('cp -f index.html ~/src/swift/markdown-mate/Markdown\ Mate/markdown-core/')
    local('cp -rf dist ~/src/swift/markdown-mate/Markdown\ Mate/markdown-core/')


def mdp(): # copy dist code to Markdown Plus project
    local('cp -f index.html ~/src/swift/markdown-plus/Markdown\ Plus/markdown-core/')
    local('cp -rf dist ~/src/swift/markdown-plus/Markdown\ Plus/markdown-core/')
