---
title: "Why Chat is the Best Interface for LLMs (for now?)"
author: Ben Perlmutter
pubDatetime: 2023-12-15T00:00:00.000Z
slug: why-chat-is-the-best-interface-for-llms-for-now
featured: false
draft: false
tags:
  - generative-ai
description: "Taking a look at why chatbots have become the best interface for the current generation of LLMs, and what's coming next."
---
I think that chat provides the best user experience for LLM apps. This is something of an accepted truth for now, ever since ChatGPT came out in November 2022. 

In this post I want to briefly talk about *why* it is that chat interfaces work best for LLM powered-apps as they exist in late 2023. 

The short answer: because LLMs aren't good enough and we haven't figured out how to build applications around them that compensate for this.

## Limitations of LLM Apps

LLMs, even the best ones like GPT-4, usually don't do exactly what you want based on a single prompt. This is for two main reasons:

1. Limited reasoning ability
2. Insufficient context

### Limited Reasoning Ability

The largest of the language models, like GPT-4, are pretty incredible tools but often falls short when it comes to complex reasoning. This is especially true when an LLM has to work through a large prompt with lots of details.

LLMs can struggle with understanding and generating nuanced or deeply reasoned responses. They are better at aggregating and rephrasing existing knowledge than at creating new insights or complex reasoning.

LLMs may lose coherence over long texts or intricate prompts with many details. Their performance can degrade as the length and complexity of the task increase.

One inherent limitation of LLMs that has become less of an issue in LLM-powered *systems* is that LLMs do not have real-time awareness or personal experiences. Their responses are based on pre-existing data up to their training cut-off, making them less effective for current events or highly personalized queries. However, this limitation has been ameliorated with giving LLMs access to external knowledge with retrieval augmented generation (RAG) or web browsing.

Until the reasoning ability of LLMs improves, the output of LLMs on the first attempt often fall short of what's desired. 

### Insufficient Context

It can be hard to prompt an LLM to do exactly what you want it to.

Say you give an LLM the prompt: "write me a funny story about a cocker spaniel named Georgie"

There's probably a lot of other contextual information that you'd like the LLM to include that isn't included in the prompt string, such as:
- What type of humor? Sarcastic, silly, sardonic, etc.?
- What type of cocker spaniel? English or American?
- What gender is Georgie? Is this a nickname for Georgia or George?
- What should happen in the story? It goes on a walk in the park, it gets abducted by silly aliens, etc.?

These questions and more could at least partially be baked into the prompt, but it can be hard to know all the details to include in there. 

Therefore, when the LLM takes its best crack at answering your initial generic prompt, it'll probably fall significantly short of your expectations. But, it'll probably get some stuff write that you can further refine in your chat conversation. 

In your follow up messages, you could say things like "make the story more sarcastic" or "make Georgie a girl". 

While LLMs are pretty remarkable at understanding and generating natural language, their performance is still heavily dependent on the quality and specificity of the input they receive. I've yet to see systems that can reliably give LLMs the requisite context that's not stated in the user prompt but should be included in the generated answer.

## Chat as the Interface

The power of the chat interface is that it allows for continuous prompt refinement throughout the conversation to compensate for LLM limitations. 

With back-and-forth dialogue, users can:

- **Refine Their Requests**: Through follow-up questions, users can clarify or adjust their initial queries, helping the LLM to better understand the intent and provide more accurate responses.
- **Provide Incremental Feedback**: Users can guide the LLM by affirming what's correct and revising what's not, effectively prompt engineering the model in real-time to better suit their specific needs.    
- **Adapt to the LLM's Responses**: Users can change their queries based on the LLM's replies, leading to a more dynamic and productive exchange that incrementally homes in on the desired outcome.

While LLM chat apps don't have the same full on sci-fi appeal of being able to tell an autonomous agent to do some abstract task for you, it's still incredibly useful. Say a 30% utility gain instead of 300%. That 30% is a major win, and one that I believe we can optimize current chat-based systems on to get 10s of percent greater utility improvements.

While I haven't been able to find research on the benefits of LLM chatbots specifically, recent data about using generative AI tools backs this up:

- An [MIT Sloan study](https://mitsloan.mit.edu/ideas-made-to-matter/how-generative-ai-can-boost-highly-skilled-workers-productivity) says that generative AI can boost working productivity by 40%.
- [A report on Github Copilot](https://github.blog/2022-09-07-research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/), one of the first generative AI technologies to go mainstream, includes a number of impressive results about the gains of using the tool, from 73% of users saying they are more in flow to completing some tasks in 55% less time.
- [ According to a McKinsey report](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-AI-the-next-productivity-frontier#key-insights:~:text=About%2075%20percent%20of%20the%20value%20that%20generative%20AI%20use%20cases%20could%20deliver%20falls%20across%20four%20areas%3A%20Customer%20operations%2C%20marketing%20and%20sales%2C%20software%20engineering%2C%20and%20R%26D.), 75% of the impact of generative AI will be in 4 sectors: customer operations, marketing and sales, software engineering, and R&D. 

The main conclusion here is that chatbots do not present order of magnitude gains as agents promise, but something tangible and sizable to work with right now.

## Evolving the Chat Experience

Now, let's discuss some ways to achieve these 10s of percent utility gains with generative AI chatbots.

There are a few concrete measures that I believe can significantly improve chatbot performance with currently available technologies and techniques.

These measures are:

- **Domain-specific prompt engineering**: Give the chatbot specific instructions on how you want it to answer. You can already do this with all LLM APIs and most chat interfaces. Custom prompt engineering is probably the most established of the techniques mentioned here. For more on prompt engineering, refer to the [Prompt Engineering Guide](https://www.promptingguide.ai/).
	- Note that fine tuning a model can often achieve some of the functionality of prompt engineering. Fine tuning can often save you the cost of tokens but introduces its own set of complications and costs. For practical purposes, it probably makes sense to start with prompt engineering given that it can be refined by editing strings, and only look into model fine tuning when an application hits a scale such that the cost of additional context tokens is greater than the cost of running and developing the fine tuned model.
- **Connect to Tools**: Give the chatbot tools that they can call. This lets the LLM connect to the outside world. Examples of tools include domain-specific knowledge retrieval for retrieval augmented generation, running small scripts, or drafting content based on templates. Tool calling has been added recently to most of the state-of-the-art LLM APIs (see [OpenAI Assistant API Tools](https://platform.openai.com/docs/assistants/tools), [Anthropic Claude 2.1 Tools](https://docs.anthropic.com/claude/docs/claude-2p1-guide#experimental-tool-use), [Gemini API Tools](https://ai.google.dev/docs/function_calling)).
- **Basic long-term memory management**: Give chatbot memory beyond the context window. This is an evolving space, but best practices are starting to be established, with the [MemGPT](https://memgpt.ai/) project probably serving as the best example. The OpenAI Assistants API and ChatGPT UI also have some form of long-term memory management, but their implementation is a black box.
- **User-directed personalization**: Basic personalization that the user sets up themself or is configured based on account info. This could even be generated using an LLM setup wizard. 

### Custom GPTs

The easiest way to experiment with an evolved chat experience that I've found is [ChatGPT's custom GPTs functionality](https://openai.com/blog/introducing-gpts).

Using GPTs, you can prompt engineer. GPTs even come with a nice chat-based configuration wizard to help you with your prompt engineering.

You can connect to tools. GPTs come with some tools out of the box, including web browsing, knowledge retrieval, and data analysis. You can also add your own custom integrations.

The GPTs also have a mechanism to extend chat memory beyond the context window.

As of now, there's no user-directed personalization. However, you could take a GPT template and customize its system prompt to suit your personal needs.

### Using the 'Copilot' Idea to Scope Chatbots

One question regarding LLM-powered chatbots is how to scope their functionality to maximize utility. Due to the above-mentioned limitations of current LLM technology, chatbots should be scoped to a specific domain to best utilize their limited reasoning abilities and context window.

I can imagine a future where, using some clever context window management technique (like how a computer manages multiple applications in memory), a single chatbot can support an arbitrary number of use cases. I haven't yet seen techniques that can achieve this, though.

For the time being, it makes sense to focus on one specific use case per chatbot. Determining the domain of a chatbot is one of the most important decisions when creating it.

I think using the idea of a 'copilot' can help determine what the scope of a chatbot should be. You want a copilot to help guide you through a specific thing. For example, you probably wouldn't want the same copilot on your plane as your boat.

Microsoft has leaned hard into the idea of the copilot, with CTO Kevin Scott presenting a recent keynote called [The Age of the Copilot](https://www.youtube.com/watch?v=FyY0fEO5jVY). They've rolled out a bunch of copilots to their tools, such as Github Copilot, Bing Copilot, and Office Copilot.

I expect Microsoft to continue leading the space.

## Looking Beyond Chat (to Agents?)

The next evolutionary step for LLM apps beyond the chatbot is the agent. Agents can perform complex tasks autonomously with minimal oversight.

To address the limitations of current LLM apps and pave the way for LLM-powered agents, several improvements are necessary:

- **Improved reasoning**: LLM-powered apps need to get better at reasoning through prompts in a given context window. This could be via better (bigger?) models or better application-level prompting strategies to guide the LLMs through tasks.
- **Dynamic context injection**: In addition to the static system prompt and user input, have some clever ways to *dynamically* inject contextual information, such as user preferences or style into the prompt. Some basic forms of this are emerging with system prompt templates or giving long-term memory (a la [MemGPT](https://github.com/cpacker/MemGPT)), but I suspect that there's much more that can be done at the application level.

There are a lot of people spending a lot of time on a lot of projects for AI agents. To name a few:
- [AutoGPT](https://autogpt.net/)
- [AutoGen](https://microsoft.github.io/autogen/)
- [OpenAGI](https://github.com/agiresearch/OpenAGI)

And then there are the LLM labs working on making the model better.

Once we get to autonomous agents, even if they're only for discrete tasks, it has the potential to completely revolutionize how we use software and interface with the world. Bill Gates expands on this idea in his excellent recent blog post, [AI is about to completely change how you use computers](https://www.gatesnotes.com/AI-agents).

I suspect that before we get to fully autonomous agents, there will be a phase of semi-supervised asynchronous agents. These agents can perform an indeterminate number of actions autonomously and asynchronously but regularly check in with a human for feedback. Think more email back and forth than the current class of chatbot's instant messaging. 

I also suspect that in six months to a year's time, this blog post could look very different. New LLM models and application-level tools could make agent-driven LLM apps much more tangible.

While folks work on building these future classes of technology, we shouldn't lose sight of what we can do with the present set of tools to provide immense utility, the chatbot. 
