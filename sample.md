# Markdown Core

first line  
second line

---

## Github Flavored Markdown

~~strikethrough~~

header 1 | header 2
---|---
row 1 col 1 | row 1 col 2
row 2 col 1 | row 2 col 2

http://example.com

do_this_and_do_that_and_another_thing.


## Emoji :panda_face:

:sparkles: :camel: :boom: :panda_face:


## Task lists

- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> are supported
- [x] list syntax is required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item


## Code blocks

Before inline code `$(function(){ console.log('Hello world') });` after inline code.

```ruby
[1, 2, 3, 4, 5].collect do |item|
  item * 2
end
```

```javascript
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
```

    for i in range(1, 10):
        print 'Hello world {0}'.format(i)

```
for i in range(1, 10):
    print 'Hello world {0}'.format(i)
```

## HTML code

<strong>Hello world</strong>
