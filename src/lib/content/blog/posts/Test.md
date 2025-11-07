---
title: "Test Blog"
description: "A test blog post for testing my blog"
tags: ["development"]
created: "2024-12-21T15:30Z"
updated: "2024-12-16T02:34Z"
draft: true
banner: "https://cdn.dribbble.com/userupload/11507678/file/original-38d357eb2ae02b62d300c9fdb10769fa.jpg?resize=1600x543&vertical=center"
banner_alt: "Cyber Security"
---

# This is a Heading h1

## this is a Heading h2

### tHis is a Heading h3

#### This is a Heading h4

##### This is a Heading h5

###### This is a Heading h6

A short paragraph

🎉 Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy text.

## Empasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_ or ***Like This***

~one~ or ~~two~~ tildes.

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

- [ ] Hello
- [ ] Hi
    - [x] World

## Images

![This is an alt text.](https://preview.redd.it/gnome-replicating-u-joker-513s-setup-on-linux-d-v0-52uv0wtcp66e1.png?width=1080&crop=smart&auto=webp&s=9e12b8b287b3605535fad59c3caa339e8a5d451a "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

### Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
> > Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

> [!note] This is a note callout
> Some content is displayed directly!

> [!WARNING] This is a warning callout
> Some content is displayed directly!

> [!HINT] This is a hit callout
> Some content is displayed directly!

> [!BUG] This is a bug callout
> Some content is displayed directly!

> [!ERROR] This is a error callout
> Some content is displayed directly!

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|`'Isn't this fun?'`            |'Isn't this fun?'            |
|Quotes          |`"Isn't this fun?"`            |"Isn't this fun?"            |
|Dashes          |`-- is en-dash, --- is em-dash`|-- is en-dash, --- is em-dash|


## Blocks of code

```ts title="example.ts"
// Using 'typeof' to infer types
const person = { name: "Alice", age: 30 };
type PersonType = typeof person;  // { name: string; age: number }

// 'satisfies' to ensure a type matches but allows more specific types
type Animal = { name: string };
const dog = { name: "Buddy", breed: "Golden Retriever" } satisfies Animal;

// Generics with 'extends' and default values
function identity<T extends number | string = string>(arg: T): T {
  return arg;
}

let str = identity();  // Default type is string
let num = identity(42);  // T inferred as number

// 'extends' with interface and class
interface HasLength {
  length: number;
}

function logLength<T extends HasLength = string>(arg: T): void {
  console.log(arg.length);
}

logLength("Hello");    // OK: string has length (default is string)
logLength([1, 2, 3]);  // OK: array has length
// logLength(123);      // Error: number doesn't have length

// 'typeof' with functions
function add(x: number, y: number): number {
  return x + y;
}

type AddFunctionType = typeof add;  // (x: number, y: number) => number

// Generic interfaces with 'extends' and default types
interface Box<T extends object = { message: string }> {
  content: T;
}

let defaultBox: Box = { content: { message: "Hello" } };  // Uses default type
let customBox: Box<{ status: number }> = { content: { status: 200 } };

// Complex example with 'satisfies' and default generics
type Task = {
  title: string;
  description?: string;
  completed: boolean;
};

const myTask = {
  title: "Learn TypeScript",
  completed: false,
  priority: "High",
} satisfies Task;  // Allows priority but ensures Task structure

// Generic function with default type
function wrapInArray<T = string>(value: T): T[] {
  return [value];
}

const stringArray = wrapInArray();  // Default to string
const numberArray = wrapInArray(42);  // T inferred as number

/**
 * Combines two generic types into a tuple.
 *
 * @template T - The first type.
 * @template U - The second type.
 * @param {T} first - The first value.
 * @param {U} second - The second value.
 * @returns {[T, U]} A tuple containing both values.
 */
function combine<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
```

```diff
@@ -1,4 +1,4 @@
-import rehypeKatex from 'rehype-katex'
+import rehypeMathjax from 'rehype-mathjax'
 import rehypeStringify from 'rehype-stringify'
 import remarkMath from 'remark-math'
 import remarkParse from 'remark-parse'
@@ -10,7 +10,7 @@ const file = await unified()
   .use(remarkParse)
   .use(remarkMath)
   .use(remarkRehype)
-  .use(rehypeKatex)
+  .use(rehypeMathjax)
   .use(rehypeStringify)
   .process(await read('example.md'))
```

### Inline code

This web site is using `markedjs/marked`.

## Footnote

A note[^1]

[^1]: Big note.

## KaTeX

You can render LaTeX mathematical expressions using [KaTeX](https://khan.github.io/KaTeX/):

The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral
$\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}$

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

> You can find more information about **LaTeX** mathematical expressions [here](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).
