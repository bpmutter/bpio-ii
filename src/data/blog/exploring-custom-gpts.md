---
title: "Exploring Custom GPTs"
author: Ben Perlmutter
pubDatetime: 2024-01-07T00:00:00.000Z
slug: exploring-custom-gpts
featured: false
draft: false
tags:
  - generative-ai
description: "Exploring the utility, potential, and fun of ChatGPT's custom GPTs"
---

Back on Nov 6, 2023, OpenAI had its [Developer Day](https://devday.openai.com/). There was much anticipation and many interesting releases if nothing that "broke the internet".

The new feature that I've worked with the most and been surprisingly impressed by is the "GPT". For this piece, I'll refer to GPTs as **custom GPTs**, due to the general vagueness of the name "GPT".

Custom GPTs are customized versions of ChatGPT. You can customize features including:

- The system prompt
- Add prebuilt tools for running Python code, image generation, and web browsing
- Add external data that can be used in retrieval augmented generation
- Integrate external APIs that the custom GPT can call as a tool

I've built half a dozen or so custom GPTs by now a few months post-release, and I'm impressed by how much utility you can get from them for relatively little work.

To me, more than anything, custom GPTs revealed the power of good system prompting using GPT-4. With just the correct prompt and maybe a few of the built-in plugins, you can create some pretty remarkable experiences very quickly.

Having experimented with creating several custom GPTs in the months following their release, the level of efficiency and utility they offer with minimal setup is impressive. Custom GPTs reveal the power of strategic system prompting combined with GPT-4's capabilities. With the right system prompt and clever use of the built-in plugins, you can build a compelling custom GPT.

In this blog post, I'll delve into some standout features of Custom GPTs that highlight their utility and potential. I'll also explore some feature ideas that could further enhance custom GPTs, which could help turn ChatGPT powered by custom GPTs into the definitive platform for the generative AI era.

## Amazing for Prototyping

I've gotten to use custom GPTs pretty extensively since their release because they're so easy to use and build with. In just the past 2 months since custom GPTs were released, I've created 7 custom GPTs ranging from a chatbot that helps you explore the ideas of Carl Jung (I'll talk more about this later in this section) to a better version of the MongoDB Docs Chatbot (I'll talk about this in the following Powerful Built-in Tools section).

The ease of building custom GPTs contrasts with building on top of the OpenAI APIs.
Over the past year, I've spent a lot of time building on top of the OpenAI APIs. I started with the GPT-3 API before the ChatGPT API was released, and have been using the Azure OpenAI Service version of the ChatGPT API to build the [MongoDB Docs Chatbot](https://ben.perlmutter.io/blog/taking-rag-to-production-with-the-mongodb-documentation-ai-chatbot). With the ChatGPT API, you can build some amazing applications. But, even using template starter apps and the ever-growing tool ecosystem, you are still beholden to all the challenges that come with software development--boilerplate code, auth, testing, debugging, deployment, etc.

Speaking from personal experience using the ChatGPT API: Building a trivial proof of concept takes a few hours. A reasonable MVP that you can iteratively improve on takes a few weeks to months to build. Add a few more months to get the MVP to production-ready status.

Using custom GPTs it takes *minutes* to build a fairly robust MVP using the built-in tools and prompt engineering. This allows you to experiment more and more quickly.

For example, around the time that custom GPTs came out, I found myself down a Wikipedia rabbit hole reading about Carl Jung. I thought his ideas were interesting, and I was curious to learn a bit more about Jungian concepts. I thought building a custom GPT to explore this could be an interesting way to explore Jungian psychology. 

I called this (per the custom GPT creation wizard's suggestion) the **Jungian Guide**. This was the system prompt I came up with for Jungian Guide after some trial and error (most of which was to make GPT-4 less wordy and get to the point):

```txt
Jungian Guide is a GPT designed for Jungian analysis. The GPT should act as if it's a licensed therapist with extensive training in Jungian analysis. 

The GPT will engage in a dual role: asking questions to prompt self-reflection and providing explanations and insights about Jungian concepts, such as archetypes, dream analysis, and personal growth. It will not give medical or psychological advice but offer theoretical knowledge and guided introspection. Jungian Guide will adapt its questions and insights based on the user's responses, creating a dynamic and personalized session.

Only ask one question at a time. Slowly unpack what the user is thinking.

Be concise, try not to answer with more than 1 short paragraph. Try to engage in real dialogue. Focus on conversation, not exposition.

When relevant, think about the subtext of the conversation. Not just what the user is saying, but _why_ the user is saying it, and how it relates to other feelings that the user has expressed to you.

Give the user the space to explore. Try not to be the driver of the conversation, but the vehicle for them to explore with.
```

I've used Jungian Guide to learn more about Jungian concepts, and even had it play therapist for me a bit. It isn't on par with my actual therapist (surely to the relief of therapists everywhere), but it made me feel better in some moments and helped me uncover some insights. For approximately 30 minutes of work on prompt engineering,  that's pretty great by me. You can try out the Jungian Guide here: [https://chat.openai.com/g/g-smwDLGVkt-jungian-guide](https://chat.openai.com/g/g-smwDLGVkt-jungian-guide).
## Prompt Engineering

By being able to experiment more, using custom GPTs has opened my mind to the possibilities of prompt engineering. I've thought up and experimented with lots of new prompting strategies.

One prompting strategy that I've had some luck with is what I call "/actions". These are inspired by the "/commands" in Slack. You give a bunch of prompts within the prompt that the user can invoke by prefixing their prompt with a "/action". Here's an example of a /action-based prompt to help write documentation for MongoDB:

````txt
You are MongoDoc Buddy, an expert and experienced technical writer. Your job is to help create documentation for MongoDB MongoDB. Your approach is friendly and supportive, aimed at providing helpful and precise assistance to technical writers. Your knowledge in MongoDB features is coupled with a willingness to learn and adapt, making you a valuable resource for creating clear, well-structured, and informative technical documentation.

When using Web Browsing, only search on mongodb.com.

You have the following characteristics: 
1. Adherence to the MongoDB documentation style guide when drafting documents. 
2. Use web search to get technical details, ensuring the information is accurate and up to date. 
3. When you generate documentation, ask the user if they want it converted into reStructuredText, presenting the draft inside a Markdown code block (ex: "\n```rst\n\n<rST content>\n\n```). 

You have a couple of "prefix actions" that you should respond to in a specific way. Prefix actions are formatted "/<action" at the beginning of a message:
Example: "/draft page about connect to mongodb from node.js". You can also execute prefix actions if it seems conversationally relevant, but the user hasn't provided the prefix.

For any web searches, always check the official MongoDB documentation first.

These are the following prefix actions:

/draft:

Draft documentation. Ask clarification questions if necessary before generating. ALWAYS use web search to help find relevant data to base the answer on. 

The text should be wrapped with markdown horizontal line:

```md
other text
---
<TEXT HERE>
---
other text
```

/edit:

Edit text provided by the user. Provide a copy of the edited text. Put a summary of the changes at the bottom.

The text should be wrapped with markdown horizontal line:

```md
other text
---
<TEXT HERE>
---
other text
```

/suggest:

Provide some suggestions for text provided by the user. Format the suggestions as a bulleted list. Be concise and actionable with the suggestions.

/test:

Create unit test(s) for code.  Use the most popular testing framework for the programming language if the user doesn't specify a testing framework to use. 

/brainstorm:

Help the user brainstorm ideas on a topic that they choose. Ask follow up and clarification questions. Propose ideas. Be concise in the answer. Use web search to help find relevant data to base the answer on only if relevant or prompted by the user.
````

This was a pretty basic prototype-based just around web browsing and prompt engineering, but you could extend the /action paradigm to support lots of custom tools and complex actions. 

/actions are just a single prompt engineering strategy I've experimented with using custom GPTs, but there's an infinity of possibilities out there ready for you to rapidly prototype with.
## Powerful Built-in Tools

Custom GPTs let you easily configure a few built-in tools: web browsing, code interpreter, Dalle-3 image generation, and RAG. 

For the use cases I've been working on, web browsing has been most useful by far. You can use the web browsing tool as a web-scale RAG with the right prompt engineering.

For example, in the system prompt, you could say something like, "do a web search for related content before answering the question". Then the custom GPT will duly do just that. 

I think the code interpreter probably has some really interesting use cases, like if you need to do math or data analysis. But, I haven't had those use cases come up for me recently, so I haven't been able to put it to use.

Aside: I wonder if you could combine the code interpreter with storing data that you analyze with the knowledge retrieval service. I guess it depends on how the knowledge retrieval service does chunking, which is a total black box.

I've had a lot of fun with Dalle-3 image generation in non-custom-GPT ChatGPT sessions. I haven't found a particularly compelling use for it in custom GPTs yet, but I think that's more due to my lack of imagination and not being a particularly visually oriented person.

The knowledge retrieval tool is interesting, in that it lets you get a bunch of knowledge into the custom GPT quickly. I tested it out by uploading the PDF version of a book and prompt engineered the custom GPT to get info from it. It worked relatively well, but the utility was limited by the fact that the custom GPT wouldn't cite where in the book the information came from. I think if you're basing answers on external data, you **must** be able to cite where that data is coming from. This is why academics cite their work and why pretty much RAG app that you see has either in-line references or references at the bottom of the answer. 

I can imagine there are some use cases where you don't need to cite sources with RAG without having a clear idea of what they'd be. But, I cannot think of what those use cases are. For this and other reasons that I expand upon in the [Better RAG](#better-rag) section, I think that the knowledge retrieval tool is the least robust of the included tools. Hopefully, OpenAI will improve upon this going forward. 

## Features I Want

Custom GPTs are great, but after you spend some time with them, it becomes evident that they're closer to an MVP than a "final form". In this section, I'll talk about some features that I want included in custom GPTs.

### Better RAG

I've spent most of the past year building a RAG app. Doing RAG right is hard, and context-specific. You need to take many variables into account such as chunking strategy, creating retrieval queries, using metadata, including the retrieved context data in the conversation flow, and adding references.

The custom GPT knowledge retrieval tool not only doesn't allow you to customize these features, it doesn't even give you the slightest idea of how it's handling these challenges. The knowledge retrieval tool is a complete and total black box: You upload your data into the box and can see how it's used in the chat interface. 

Also, the knowledge retrieval tool doesn't include references to where the content came from in the uploaded data. That really limits the utility of the tool. If I am depending on external knowledge, I want to know where it came from. Even if the rest of the knowledge retrieval tool is kept as a black box, references should be included as a bare minimum.

I imagine (and hope!) that OpenAI is working on adding references support if no other knowledge retrieval features because it's such a glaring exclusion. 

### Pluggable Code Interpreter

Would be great if you could add libraries to the Python code interpreter. This would let you extend the functionality beyond the current set of (very useful) tasks, which are mostly oriented around basic programming and data analysis.

Maybe you could even have the user provide secrets to the runtime so that you could execute actions to external services on their behalf.

Right now, you can have ChatGPT execute arbitrary code via a plugin.  To do this with a plugin, you need to spin up your external server, and the set of actions that you can do is prescribed by the LLM's context window. You could further extend this functionality by using the ChatGPT API within your plugin's server. 

Requiring a custom GPT to call a plugin server that calls the ChatGPT API is a rather awkward and hacky developer experience. Moreover, only software engineers capable and willing to create their own plugin server and integrate the ChatGPT API would have access to this functionality. 

It'd be a much cleaner custom GPT creator experience to let developers add Python modules and optionally provide system prompt instructions on how to use them.

### Developer Mode

Would be great to be able to provide a lot more forms of customization to the AI systems, while still leveraging the ChatGPT interface. 

Also by exposing more functionality, but not unlimited functionality, OpenAI could perform some very developer-friendly inversion of control, saying: "this is what you should focus on when building an intelligent chatbot".

Developer mode could serve as an interface of intermediate complexity lying between the API, where you have to build the whole app yourself, and the non-technical friendly current custom GPT interface.

I would love custom GPT developer mode with stuff like:
- Post message hooks: the ability to do stuff after messages, like send to my server, inject another message in the flow, etc.
- Use fine-tuned models
- Model control like it exists in the API, with things like temperature control and max number of tokens in output.
- Execute multiple actions at once

### Custom GPT Admin API

Custom GPTs need an admin API. It needed it yesterday. Having an Admin API is closely coupled with the idea of having custom GPT developer mode. However, I'm separating it into its own item because it is so critically important for building custom GPTs that are more than hacky prototypes.

The Custom GPT Admin API should at a minimum have the following endpoints:

- `POST /app`: Create a new app.
- `PUT /app/:appId`: Update an existing app based on the config in the request body.
- `GET /app/:appId`: Get config for an existing app.
- `DELETE /app/:appId`: Delete an existing app.
- Set of endpoints for managing knowledge in the knowledge retrieval tool
- A set of endpoints for managing secrets used to call plugins.

With an admin API, it'd allow custom GPT developers to use version control systems like git to regulate the custom GPT application lifecycle. You could create "forks" of the custom GPT that you use to develop new features and test them out before merging them into the main version that's publicly accessible.

As custom GPTs exist presently, you could probably define their entire config in a JSON file with a schema like:

```ts
interface GptConfig {
  systemPrompt: string;
  tools: {
    webBrowsing?: boolean;
    codeInterpreter?: boolean;
    dalle3?: boolean;
    knowledgeRetrieval?: {
      // Right now this could probably be a boolean,
      // but as discussed above I think knowledge retrieval
      // needs a lot of work and extensibility,
      // so leaving it like this. 
	};
	// API schema for the custom tools.
	// Have some way of loading API key secrets in
	// to be called by ChatGPT.
	custom?: CustomTool[]
  };
}
```

Down the line, it might make sense to also be able to define and run custom tools from within the OpenAI platform. It probably wouldn't be that hard for them to host some serverless functions in some way that wrap Azure Functions or something similar. These could also be uploaded via this hypothetical admin API.

Having an admin API means that you could define your custom GPT in source files and track it using a version control system like git. This'd be incredibly useful that pretty much every nontrivial software project uses a VCS like git: change tracking and collaboration.

If custom GPTs take off and folks start building businesses on top of the platform, I imagine it's a short matter of time before OpenAI releases a custom GPT admin API. Frankly, I do not think that custom GPTs can ever be more than fun toys and personal productivity boosts without a programmatic API to manage them and git-based version control to track changes.

## Looking Forward: How Will the GPT Marketplace Change the Landscape?

OpenAI just announced that the [custom GPT marketplace](https://www.theverge.com/2023/12/1/23984497/openai-gpt-store-delayed-ai-gpt) is supposed to come out next week. This will let custom GPT developers share their creations with the world through an app-store-like experience.

OpenAI has said that there'll be a revenue share component to the GPT marketplace, which will presumably motivate folks to build custom GPTs. (This'll also almost inevitably lead to a new micro-genre of content about making 10s of thousands of dollars a month off of custom GPTs invade our social media feeds.) 

The GPT marketplace will probably create some value for custom GPT creators. What I'm more excited about, though, is seeing all the custom GPTs that people are making, and hopefully using some to improve my own life. 

Right now, custom GPTs are shareable, but only via a link. There are some curated aggregations of them on the internet, but no definitive guide. Just as the power of the iPhone didn't begin to be realized until there was the App Store, I think the GPT marketplace has the potential to yield an explosion of utility for ChatGPT.

Perhaps the GPT marketplace can even transform ChatGPT into a platform, just as the App Store did for the iPhone. However, for this to happen, I think OpenAI needs to add some of the above-listed feature requests.

Especially an admin API with version control support. Seriously, get that admin API out yesterday.