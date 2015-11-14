from fabric.api import local


def deploy():
    # copy project to /temp folder
    local('rm -rf /tmp/markdown-core')
    local('cp -r ../markdown-core /tmp/')

    # remove unneeded folders / files
    local('rm -rf /tmp/markdown-core/.bowerrc')
    local('rm -rf /tmp/markdown-core/.git')
    local('rm -rf /tmp/markdown-core/.gitignore')
    local('rm -rf /tmp/markdown-core/bower.json')
    local('rm -rf /tmp/markdown-core/fabfile.py')
    local('rm -rf /tmp/markdown-core/fabfile.pyc')
    local('rm -rf /tmp/markdown-core/index.js')
    local('rm -rf /tmp/markdown-core/README.md')
    local('rm -rf /tmp/markdown-core/sample.md')
    local('rm -rf /tmp/markdown-core/dist')

    # compress and mangle
    local('mv /tmp/markdown-core/markdown-core.js /tmp/markdown-core/markdown-core.js.temp')
    local('uglifyjs /tmp/markdown-core/markdown-core.js.temp -m -c --screw-ie8 -o /tmp/markdown-core/markdown-core.js')
    local('rm -rf /tmp/markdown-core/markdown-core.js.temp')

    # copy file to Markdown Mate project
    local('cp -r /tmp/markdown-core ~/src/swift/Markdown\ Mate/Markdown\ Mate/')


def dist():
    local('cp markdown-core.css dist/')
    local('browserify markdown-core.js -s mdc > dist/markdown-core.js')
    local('uglifyjs dist/markdown-core.js -cmo dist/markdown-core.min.js')
    local('cp markdown-core-browser.js dist/markdown-core-browser.js')
    local('uglifyjs dist/markdown-core-browser.js -cmo dist/markdown-core-browser.min.js')
