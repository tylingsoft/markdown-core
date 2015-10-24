# Markdown Core

first line  
second line


@[toc](Table of Contents)


## headings
### heading 3
#### 标题 4
##### heading 5
###### heading 6

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


```
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
```


    for i in range(1, 10):
        print 'Hello world {0}'.format(i)


## HTML code

<strong>Hello world</strong>


## Math

Inline math: `$E = mc^2$`, another one: `$\dfrac{ \tfrac{1}{2}[1-(\tfrac{1}{2})^n] }{ 1-\tfrac{1}{2} } = s_n$`.


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


## Subscript: H~2~O


## Superscript: 29^th^


## Footnote

Here is a footnote reference,[^1] and another.[^longnote]

[^1]: Here is the footnote.

[^longnote]: Here's one with multiple blocks.

    Subsequent paragraphs are indented to show that they
belong to the previous footnote.


Here is an inline note.^[Inlines notes are easier to write, since
you don't have to pick an identifier and move down to type the
note.]


## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Start list with offsets

5. line one
1. line two
12. line three


## Custom containers

::: success
success container

paragraph 2
:::

::: info
info container

paragraph 2
:::

::: warning
warning container

paragraph 2
:::

::: danger
danger container

paragraph 2
:::


## Abbreviations

Before the HTML & W3C definition.
*[HTML]: Hyper Text Markup Language
*[W3C]:  World Wide Web Consortium
The HTML specification is maintained by the W3C.


## Definition list

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


## insert

++Inserted text++


## mark

==Marked text==
