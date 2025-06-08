---
title: "LangChain as Docs for the LLM Ecosystem"
author: Ben Perlmutter
pubDatetime: 2023-06-25T00:00:00.000Z
slug: langchain-as-docs-for-the-llm-ecosystem
featured: false
draft: false
tags:
  - generative-ai
description: "*And why ~I don't care for~ have mixed opinions on their libraries*"
---
*Originally published 2023-26-05, last updated 2023-10-29*

I was recently looking at the [LangChain python documentation](https://python.langchain.com/en/latest/) website when I was doing some research on architecting a vector search/LLM chatbot. (something like [this](https://medium.com/@abonia/document-based-llm-powered-chatbot-bb316009de93)).

LangChain has been on my radar since I started riding the LLM wave back in late 2022. It has a compelling idea: a library that you can use to build apps with LLMs. Seems nice and useful!

However, since I started looking at it back then, I’ve been really underwhelmed by the quality of the documentation. There’s a lot of Jupyter Notebooks with code examples of using some features of the library and poorly-annotated generated reference docs. Not great DX.

The documentation has certainly gotten _bigger_ as they add lots of new features, but I don't think it's gotten too much better. Still lots of code examples with minimal explanation of how to use the thing. 

This lackluster DX, plus a general aversion to writing Python, kept me from using LangChain in a previous vector search/LLM project. But now LangChain has a JS version (hat tip to [Mr. Atwood](https://en.wikipedia.org/wiki/Jeff_Atwood#:~:text=In%202007%2C%20Jeff%20Atwood%20made,question%2Dand%2Danswer%20website.)), a [chunk of funding](https://www.crunchbase.com/organization/langchain), and a few more months to figure there docs out and grow. I figured it was worth another look.

## LangChain Revisited (June 2023)

Revisiting LangChain certainly was worth it, but for reasons that surprised me. The docs are still mostly a collection of Jupyter notebooks and don’t compel me to use the project.

One notable diff between when I was last exploring LangChain early this year and now is the vast increase in integrations with external tools and libraries. You can check them out in the [Indexes](https://python.langchain.com/en/latest/modules/indexes.html) section of the docs.

All of the LangChain-library specific stuff seemed like boiled-down light wrappers around other libraries. As those other libraries presumably are both better documented and with more functionality, I think it’d probably be easier to just use them.

Another aspect of LangChain that didn’t exist last time I was looking at it is the large set of [Agents](https://python.langchain.com/en/latest/modules/agents/agents.html) documentation. This stuff seems more useful as library features since they have some useful abstractions like `Tool`. But again docs kinda suck here. I’d be hesitant to use the library itself because it seems so unpleasant to work with. [LangChainHub](https://github.com/hwchase17/langchain-hub) also has a bunch of useful sample LLM use cases.

## LangChain as Ecosystem Docs

Rather, than use the LangChain library directly, I’m much more inclined to borrow some of their templates, patterns, and libraries they incorporate in my code.

For me and my purposes, LangChain serves as an amazing index of all the neat innovations going on in the LLM and vector search ecosystem.

The space is moving so quickly that it’s exhausting to keep up with all the new tools and ideas coming out on your own.

LangChain seems to be doing a pretty great job of this though. This speaks to the knowledge of their team, and the power of the community behind them.

For now, I think my general approach to LLM and vector search-related development will be check what LangChain is wrapping, and then use it directly.

One day, LangChain might get better docs, and I might feel better about using it. But til then, I think I’ll just be using LangChain as an index of useful knowledge and tools in the LLM and vector search ecosystem.

### Other Takes

For many more negative takes on Langchain, see https://news.ycombinator.com/item?id=36645575.

## Re-Revisiting Langchain (October 10, 2023)

Adding some more thoughts on Langchain now that the project has had some more time to mature, and I've worked on deployed to prod a full stack RAG app, the [MongoDB docs chatbot](https://github.com/mongodb/chatbot). 

Generally, I still hold all of the above thoughts, with a couple of additional ones. 

### Langchain provides some abstractions that could be useful

Langchain has some conceptual abstractions that could be useful for building composable applications. You might want to experiment with different implementations of these abstractions while developing your application.

For example, you might want to change [vector stores](https://python.langchain.com/docs/modules/data_connection/vectorstores/) to take into account working with a different vector store (like say changing from Chroma to MongoDB).

This seems particularly useful for swapping between 3rd-party integrations, like changing between LLMs or vector embeddings. 

### Langchain is a library, not a framework

I notice that [Langchain bills itself](https://python.langchain.com/docs/get_started/introduction) as a "framework for developing applications powered by language models". Frankly, I think it's disingenuous for Langchain to call itself a "framework". For me, it's functionality is too low level to be a "framework". Rather, I consider it a "library". 

I think it's actually really important to draw the difference here because, for me, when I hear "application framework", I think batteries included, handles design decisions, and--most importantly--has some form of **inversion of control**. A framework with inversion of control let's you plug your custom application logic into its structure. 

Generally speaking, Langchain does not have the inversion of control principle. Rather, it provides some building blocks that you have to glue together, and then wrap in a control flow that you define.

I've noticed this to be particularly true for the [Retrievers modules](https://python.langchain.com/docs/modules/data_connection/), which is most relevant to the RAG stuff I've been working on. There is nothing to direct the flow of your retrieval. You need to make that yourself, wrapping the Langchain modules.

With this being said, I think there's space for building framework(s) that wrap the Langchain modules. For example, you could build something similar to the [docs chatbotbot ingest CLI](https://github.com/mongodb/chatbot/tree/main/ingest) that is configurable using Langchain's abstractions as it's building blocks. In the CLI, you could swap out one Langchain vector store for another with minimal code changes.

### There are some very useful modules

In the Langchain library, there are some useful modules! One that we've found particularly useful is the [RecursiveCharacterTextSplitter](https://python.langchain.com/docs/modules/data_connection/document_transformers/text_splitters/recursive_text_splitter). 

I imagine there's a bunch more modules that could be useful, particularly for more advanced LLM app features, like Agents and memory. I haven't had the opportunity to explore these in detail yet.

### But also some stuff is pretty half-baked

Some stuff in LangChain simply doesn't work very well.

A few examples:

- We had to stop using the [Github loader](https://js.langchain.com/docs/modules/data_connection/document_loaders/integrations/web_loaders/github) because it was confusing, took too longer, and _very_ quickly hit Github API request limits.

- When recently looking at the [OpenAPI toolkit], it seemed to not quite meet the needs that I had for a chat-as-API-interface project that I am exploring, while also over-consuming LLM resources. It provided some great inspiration, but ultimately doesn't seem quite usable.

### Langchain is still great ecosystem documentation

See above **LangChain as Ecosystem Docs** section. Opinion still holds. I still consult LangChain when I'm trying to think through adding new functionality or looking to explore the latest developments in the LLM-driven development space. Also some good content on [their blog](https://blog.langchain.dev/).

### tl;dr

Ramble complete. To summarize:

1. LangChain has some useful abstractions that could make it relatively easy to plug in different integrations.
2. LangChain is a library, not a framework. There's opportunity to build framework(s) that wrap the modules of the LangChain libraries.
3. The libraries haves some useful implementation modules.
4. Some implementation modules are also pretty half baked.
5. LangChain's docs and blogs are a great index of the latest in the LLM application ecosystem.

## Quick Update (October 29, 2023)

This seems to at least somewhat address the "LangChain is a library, not a framework" point for serving requests - https://github.com/langchain-ai/langserve#features

I am a little confused as to how the server persists state though. Like where are conversations saved? How do you set that up yourself? or is this only for stateless LLM req chains? (if so, less useful)