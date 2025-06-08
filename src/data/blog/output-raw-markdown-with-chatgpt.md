---
title: "Output Raw Markdown with ChatGPT"
author: Ben Perlmutter
pubDatetime: 2023-05-26T01:00:00.000Z
slug: output-raw-markdown-with-chatgpt
featured: false
draft: false
tags:
  - generative-ai
description: "How you can use ChatGPT to output raw, unformatted Markdown"
---
As a technical writer, I am often writing in Markdown. It’s a wonderful little Markup language that makes it easy to write for the web.

In fact, it’s so wonderful that ChatGPT (and many other tools) format their output using Markdown, and then use frontend JavaScript to convert the Markdown to HTML.

This leads to some lovely looking answers from ChatGPT with headers, bold, lists, and code blocks. But it also means that it is hard to get ChatGPT to output Markdown since it takes the raw Markdown output and transforms it to HTML.

As of yesterday, I have found a hack around this. One feature of Markdown ([Github Flavored Markdown](https://github.github.com/gfm/) specifically) is that you can nest code blocks. You do this with ` ```` `. For example:  

`````
````md
# Title

Here's some text.

```js
const foo = "bar";
```
````
`````

We can use this Markdown feature to tell ChatGPT to format the answers in a raw Markdown code block. In my experience, this works best with a prompt including an example template.

For example, you could give ChatGPT the following prompt:

````
write a paragraph about setting up an eslint file with a basic configuration. include a code example of the .eslintrc.js file. 

format the answer in Markdown. 

wrap the answer in the following:

```md
YOUR ANSWER HERE
```
````

This outputs a Markdown code block with the following results:

````
Setting up an ESLint file with a basic configuration involves creating a `.eslintrc.js` file and defining the desired rules and settings. This file serves as the configuration file for ESLint, which is a popular linter tool for JavaScript code. To get started, create a `.eslintrc.js` file in the root directory of your project. Here's an example of a basic configuration:

```javascript
module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  extends: ['eslint:recommended'],
  rules: {
    // Add your rules here
  },
};
```
````

I’ve found this works with both GPT-3.5 and GPT-4 versions of ChatGPT.

## Prompt Template

Here’s a generalizable prompt template you can use to make ChatGPT write raw Markdown:

````
{ADD WHATEVER YOU WANT CHATGPT TO OUTPUT HERE}

format the answer in Markdown. 

wrap the answer in the following:

```md
YOUR ANSWER HERE
```
````