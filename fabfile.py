from fabric.api import local


def dist():
    local('curl https://cdn.jsdelivr.net/github-markdown-css/2.1.0/github-markdown.css > dist/markdown-core.css')
    local('curl https://cdn.jsdelivr.net/highlight.js/8.9.1/styles/github.min.css >> dist/markdown-core.css')
    local('curl https://cdn.jsdelivr.net/emojione/1.5.2/assets/css/emojione.min.css >> dist/markdown-core.css')
    local('curl https://cdn.jsdelivr.net/mermaid/0.5.5/mermaid.css >> dist/markdown-core.css')
    local('cat markdown-core.css >> dist/markdown-core.css')
    local('browserify markdown-core-node.js -s mdc > dist/markdown-core.js')
    local('curl https://cdn.jsdelivr.net/mermaid/0.5.5/mermaid.min.js >> dist/markdown-core.js')
    local('cat markdown-core-browser.js >> dist/markdown-core.js')
    local('uglifyjs dist/markdown-core.js -cmo dist/markdown-core.min.js')
