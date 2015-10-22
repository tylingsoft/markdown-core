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


## Fontawesome: :fa-cab: :fa-flag: :fa-bicycle: :fa-leaf: :fa-heart:


## Ionicons: :ion-printer: :ion-social-tux: :ion-lock-combination: :ion-ios-medkit: :ion-coffee:


## Emoji: :panda_face: :sparkles: :camel: :boom: :pig:


## Task lists

`[ ] inline code`

```
[*] code block
```

[ ] todo item 1 [*] todo item 2

- hello world
- [ ] @mentions, #refs, [links](), **formatting**, and <del>tags</del> are supported
- [x] list syntax is required (any unordered or ordered list supported)

1. [x] this is a complete item
1. [ ] this is an incomplete item


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


## Math

Inline math `$E = mc^2$`, another one: `$\dfrac{ \tfrac{1}{2}[1-(\tfrac{1}{2})^n] }{ 1-\tfrac{1}{2} } = s_n$`.

Invalid math: `$E = mc^^^^2$`

```math
\oint_C x^3\, dx + 4y^2\, dy
  
2 = \left(
 \frac{\left(3-x\right) \times 2}{3-x}
 \right)
  
\sum_{m=1}^\infty\sum_{n=1}^\infty\frac{m^2\,n}
 {3^m\left(m\,3^n+n\,3^m\right)}
  
\phi_n(\kappa) =
 \frac{1}{4\pi^2\kappa^2} \int_0^\infty
 \frac{\sin(\kappa R)}{\kappa R}
 \frac{\partial}{\partial R}
 \left[R^2\frac{\partial D_n(R)}{\partial R}\right]\,dR
```


## Flowcharts

```
graph TD
    A[Hard edge] -->|Link text| B(Round edge)
    B --> C{Decision}
    C -->|One| D[Result one]
    C -->|Two| E[Result two]
```


## Sequence diagrams

```
sequenceDiagram
    Alice->>Bob: Hello Bob, how are you?
    alt is sick
        Bob->>Alice: Not so good :(
    else is well
        Bob->>Alice: Feeling fresh like a daisy
    end
    opt Extra response
        Bob->>Alice: Thanks for asking
    end
```


```
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
```


## Gantt diagrams

```
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1, 20d
    section Another
    Task in sec      :2014-01-12, 12d
    anther task      : 24d
```


## subscript: H~2~O


## superscript: 29^th^
