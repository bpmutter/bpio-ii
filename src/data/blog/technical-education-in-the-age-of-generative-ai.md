---
title: "Technical Education in the Age of Generative AI"
author: Ben Perlmutter
pubDatetime: 2024-03-18T00:00:00.000Z
slug: technical-education-in-the-age-of-generative-ai
featured: false
draft: false
tags:
  - generative-ai
description: "Examining how emerging generative AI technologies facilitate a future of bespoke technical educational experiences."
---
- [OpenAI Unveils A.I. That Instantly Generates Eye-Popping Videos](https://www.nytimes.com/2024/02/15/technology/openai-sora-videos.html) - Feb 15, 2024
- [Google unveils Gemini 1.5, a next-gen AI model with million-token context window](https://venturebeat.com/ai/google-unveils-gemini-1-5-a-next-gen-ai-model-with-million-token-context-window/) - Feb 15, 2024
- [The Mind-Blowing Experience of a Chatbot That Answers Instantly](https://www.wired.com/story/plaintext-groq-mindblowing-chatbot-answers-instantly/) - Mar 1, 2024
- [Anthropic's Claude 3 causes stir by seeming to realize when it was being tested](https://arstechnica.com/information-technology/2024/03/claude-3-seems-to-detect-when-it-is-being-tested-sparking-ai-buzz-online/) - Mar 5, 2024

These headlines are just some of the developments in the generative AI space in the past month. You could compile a similarly compelling list for many months of the past year and change.

It's becoming ever more clear that we are entering the generative AI era, and that this technology will cause a phase shift in how we interact with computers and the world.

Given the rapid rate of change, it is difficult if not impossible to predict the specific ways that generative AI will reshape any given sector let alone the world (at least until we get AGI to do it for us). While it's challenging to predict the exact impact of generative AI on various sectors, we can forecast some overarching trends based on recent developments. From these trends, we can consider how to adapt to them.

In this post, I explore how generative AI is poised to upend technical education, the field where I've spent most of my career working. I've also spent the past year and a half working at the intersection of generative AI and education, building the [MongoDB AI Chatbot](https://ben.perlmutter.io/blog/taking-rag-to-production-with-the-mongodb-documentation-ai-chatbot) and the [MongoDB Chatbot Framework](https://ben.perlmutter.io/blog/build-a-production-ready-intelligent-chatbot-with-the-mongodb-chatbot). Compounding these experiences with semi-obsessively following the generative AI space, I have the following predictions for how generative AI will affect technical education:

1. Generative AI will transform technical education from its current status quo grounded in static content to one of **bespoke content** tailored to a given learner.
2. There is a set of concrete actions that technical educators can take today to prepare their content for the emerging generative AI future.

## Disclaimer: This Post Does Not Discuss Using Generative AI to Help Author Content

In this blog post, I look at how generative AI will impact the _consumption_ of technical content, not the _creation_ of it.

Exploring how generative AI will impact technical content creation may be the subject for another blog post, another day.

## The Current State of Generative AI for Technical Education

In these early days of the generative AI age, the principal form factor for interacting with AI models has been chat. In my blog post [Why Chat is the Best Interface for LLMs (for now?)](https://ben.perlmutter.io/blog/why-chat-is-the-best-interface-for-llms-for-now), I discuss some reasons why I think this is the case.

In the technical education context, I've seen generative AI chatbots prove useful primarily for two purposes:

1.Retrieval-Augmented Generation (RAG) chatbots on a company's website to act as a sort of site search++ that not only finds the relevant content in the documentation but summarizes it to answer a user-specific question. 2. Using tools like ChatGPT to help with the content authoring process, serving as a brainstorming partner and source of technical knowledge.

I only see these use cases continuing to get better and become more popular.
I also suspect that completely novel forms of technical content will emerge as generative AI's capabilities increase. This is especially true as the foundational models like GPT-4 and Gemini that power generative AI get more powerful and the developer community builds new ways to harness the power of these models.

## Generative AI Is Getting a Lot Better, Quickly

Generative AI technologies are rapidly getting better in a variety of ways that are poised to have a transformative impact on technical education.

This section explores some of the trends in generative AI that I think will be most important for technical education.

### Better Reasoning

Models are also improving their reasoning ability on a variety of complex tasks. Once you use a frontier model like GPT-4, it's hard to use a less capable model for most tasks.

We've yet to see a model exceed GPT-4/Gemini Ultra on complex reasoning, but given the vast amount of human and financial capital going into these models, it's only a matter of time until something better comes out.

Then there's also emerging prompting best practices that can dramatically improve model output. For example, [chain of thought](https://www.promptingguide.ai/techniques/cot) and [few-shot](https://www.promptingguide.ai/techniques/fewshot) prompting yield dramatically better outputs on many reasoning tasks.

Again, given the vast amount of human and financial capital going into prompting these models, prompting techniques are bound to continue improving as well.

Superior reasoning skills mean that these models will be able to perform more complex categories of tasks with higher-quality output.

In the technical education context, this means more types of content with richer detail and higher quality. Better reasoning ability is to generative AIsomething like MSG is to food--it makes everything taste better.

We are also likely to see new emergent capabilities with these better models. As language models have improved, [we have already seen many emergent abilities](https://www.assemblyai.com/blog/emergent-abilities-of-large-language-models/), such as performing arithmetic, answering questions, and summarizing passages. just as we have in previous models, which could allow whole new sets of technical education use cases.

I don't have any particular thoughts on what capabilities might emerge with better models, but I look forward to seeing what they might be.

### Longer Context Windows

Context window size limits how much content a model can process per inference. The original [ChatGPT API using the `gpt-3.5-turbo` model came out in March 2023](https://openai.com/blog/introducing-chatgpt-and-whisper-apis). It had a context window of ~4,000 tokens. Now, OpenAI's `gpt-4-turbo` model is not only significantly better but can process 128,000 tokens per inference. In February 2024, [Google released the Gemini 1.5 Pro model](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/#context-window) with a context window of 1 million tokens. In closed research, Google has said that the model can even effectively reason over 10 million tokens.

From the original `gpt-3.5-turbo`'s 400 tokens to Gemini 1.5 Pro's 1 million tokens, context window lengths have seen a 375x increase in less than 1 year. That's an astonishing >2 orders of magnitude increase. We've gone from context windows that can fit a few pages of text to the entirety of the _Lord of the Rings_ trilogy. (Note: these models use different tokenizers so a strict comparison isn't possible, but the rough scale holds correct.)

This astonishing rate of increase presumably won't continue for much longer. Otherwise, we'd see models that can fit more tokens in the context window than there is memory in a GPU in a few years.

With larger context windows, we can jam a whole lot more content in one inference run to generate responses. This will have a variety of transformational effects on using AI for education. A few impacts I can think of include:

- Removing the need for RAG over relatively small data sets.
- Allowing RAG to retrieve a much larger set of context information to generate responses off of.
- Including detailed instructions and many examples to help the model generate outputs that follow a specific and complex format.

### Agentic Systems

As a consequence of better reasoning ability, LLMs will be able to autonomously perform more complex tasks with less human supervision.

Agentic workflows are one meta-category of tasks that holds the most promise for generative models.

"Agent" in the context of AI has become a fairly watered-down term, so I'll define how I'm using it here. When I refer to AI agents, I mean a language model taking a series of actions to accomplish a broadly defined task. Agentic tasks can be pretty much anything that we use a computer to do today, like doing research, writing code, booking a flight, or creating a presentation.

At the time of writing in March 2024, AI agents are more of a tantalizing promise just over the horizon than our present-day reality. There are some interesting projects like [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) where folks are trying to build agentic frameworks.

I think the most functional class of agentic applications to date is the "copilot". In a copilot application, the user remains firmly in the pilot seat, asking the AI to perform tasks on their behalf using predefined tools, usually through a chat interface.

However, I suspect that in the not-too-distant future, we will see more autonomous agents that can execute more complex tasks with minimal user oversight.

Top AI labs have identified agentic systems as a top priority for the next phase of LLM development.

Dario Amodei, CEO of Anthropic, [said in a recent episode of the Dwarkesh Patel podcast](https://open.substack.com/pub/dwarkesh/p/dario-amodei?selection=48165e0d-5ac1-4fa1-999c-c3a998fd75d2&utm_campaign=post-share-selection&utm_medium=web) that a major factor limiting the current generation of language models' ability to reason through complex tasks could be that they are not trained on sufficient data about accomplishing more complex tasks.
If this is true, then getting better agents could largely be a matter of better unsupervised training or fine-tuning on agentic data sets (perhaps generated with the current set of language models).

In his keynote at OpenAI Dev Day, CEO [Sam Altman introduced the Assistants API](https://hackernoon.com/transcript-openai-devday-keynote-by-sam-altman-and-romain-huet-about-assistants-api-and-custom-models) as the "first steps towards AI agents", implying that agentic behavior is an important behavior in which he sees LLMs developing. Given OpenAI's leadership in the current generative AI wave, we should expect Sam's commentary about agents as an indication of where OpenAI is going, and where the rest of the industry is following close on OpenAI's heels.

When better agentic systems arrive, I see them having two main impacts on the technical education space: better research and more complex outputs.

Agents will be able to conduct complex research tasks on a user's behalf. Current AI systems are pretty good at using RAG to answer user questions where the answer already exists in a single or few pieces of data. Future systems will be able to search and analyze much larger information spaces to produce higher-quality outputs.

Agentic systems will also be able to present generated content in more complex interfaces. Currently, generative AI systems mostly output chat messages. Agentic systems could output much more elaborate content. This could include multimedia reports and web pages.

### Cheaper Models

The impact of the above-discussed improvements to generative AI systems will be amplified by the fact that these systems are getting way cheaper.

While I don't see generative AI systems matching the zero-marginal cost of traditional software anytime soon, the price is decreasing at a remarkable rate.

On price, the ChatGPT API using `gpt-3.5-turbo` has gone down 4x from March 2023 to March 2024., from $0.002/thousand tokens to $0.0005/thousand tokens. That March 2023 baseline was already 10x cheaper than the previous non-chat GPT 3.5 model. That's a 40x decrease in a bit over a year, while GPT 3.5 has concurrently gotten better.

There are open-source models like Mistral 7x8b that achieve similar performance to GPT 3.5 that you can run for even cheaper.

Frontier models like GPT-4 remain significantly more expensive, but they will presumably follow the same cost curves, even if starting from a higher baseline. Now that there are more GPT-4-level models out in the world like Gemini Ultra and Claude 3 Opus, with presumably others to come, I think we can expect the cost of these models to drop rapidly.

With cheaper high-quality models, it'll become economically feasible to embed more generative AI in more parts of the educational experience without breaking the bank.

Already, you can accomplish some pretty remarkable things with GPT-4-tier models. The greatest impediment to their adoption is the cost of running them. This is especially true for long-context window prompts. Right now, these frontier models are best suited for internal tasks where cost is less of a factor and for paying customers.

In the near future, we will be able to use these models and better ones for a fraction of the price.

### Faster Inference

Models are getting faster. Technologies and methods are emerging that let you get high-quality outputs in significantly less time than you previously could.

The most remarkable recent example of models speeding up is Groq, [which can process 300 tokens/second using the llama-2 70b model](https://wow.groq.com/groq-sets-new-large-language-model-performance-record-of-300-tokens-per-second-per-user-on-meta-ai-foundational-llm-llama-2-70b/).

In a technical education context, we will be able to generate content in less time than it takes for a learner to lose attention and context switch, which is a significant issue with the current generation of models.
We will be able to get near-instant feedback to single prompts and quickly chain prompts together to create complex outputs.

We will also be able to create chat experiences where users can iterate through multiple prompts more quickly to efficiently achieve their learning objective.

### Multi-Modal Models

Multi-modal AI models that can process and generate images, video, and other media in addition to text have been making impressive strides lately. For example, OpenAI recently unveiled Sora, a model capable of generating high-quality videos from text prompts almost instantly.

While these multi-modal capabilities are undoubtedly cool and will have important applications, I don't think they will be particularly transformative for technical education in the near term. The ability to ingest images or videos as input could be useful in some corner cases, like allowing a learner to share a screenshot and ask the AI for help. But I see this more as an incremental improvement rather than fundamentally changing how we learn technical topics.

Looking further out, I could imagine multi-modal AI enabling entirely new educational experiences. For instance, learners may one day be able to share their screen with an AI assistant that guides them through troubleshooting or mastering a new skill in real time.

However, I have yet to see any real compelling hints that we'll arrive at a future where multi-modal models will be a transformational force in the technical education context any time soon. Then again, at the rate things are moving, maybe those compelling multi-modal use cases will arrive any day and make me revisit this belief.

### Fine Tuning

Fine-tuning involves training a pre-trained model on a smaller dataset to adapt it for a specific task or domain. This can result in better performance and more tailored outputs compared to using the base model.

Fine-tuning large language models is the area of the generative AI ecosystem covered in this post that I'm least familiar with. I've never fine-tuned a model myself. The remainder of this section is based on my fairly limited knowledge of the space and should be taken with a few grains of salt.

In the past, fine-tuning has required significant compute resources and technical expertise. However, new techniques are emerging that make the process easier and more efficient. One promising approach is [Reinforcement Learning from AI Feedback (RLAIF)](https://towardsdatascience.com/rlaif-reinforcement-learning-from-ai-feedback-d7dbdae8f093). With RLAIF, an AI model provides feedback and rewards to guide the fine-tuning process, rather than relying on human feedback which can be time-consuming and expensive to collect at scale. This AI-guided fine-tuning can produce comparable results to human-guided approaches like RLHF (Reinforcement Learning from Human Feedback) while being much more scalable.

I could see [knowledge distillation](https://en.wikipedia.org/wiki/Knowledge_distillation), where a large model is used to train a smaller, more efficient model, could yield some interesting benefits. For instance, I could see a GPT-5 level model being used to fine-tune a GPT 3.5-level model to perform similarly to GPT-4 on a specific domain.

For technical education specifically, I believe fine-tuning will have somewhat narrow but still valuable applications. Fine-tuned models could be useful in cases where you want the AI's outputs to follow a very specific format or adhere to certain stylistic conventions, and you want to minimize the prompt engineering required to achieve this on a vanilla model (which can add latency and cost).

However, I suspect that for many technical education use cases, fine-tuning won't be necessary. The base models are already so capable that you can get great results with thoughtful prompting. Techniques like chain-of-thought prompting and leveraging longer context windows can achieve highly tailored outputs without the need for fine-tuning.

So while I believe fine-tuning will have a place in the AI-powered technical education toolkit, I don't see it being essential for most applications. The rapid progress in base model capabilities, cost reduction, prompt engineering techniques, and performance optimizations will likely be sufficient to power the majority of technical education use cases. But fine-tuning will be a valuable tool to have for those cases where you need maximum control over the model's output format and style or minimize cost.

## Bespoke is the New Static

The above improvements will allow generative AI experiences that are far superior to what is conceivable today.

Models will be able to work with much larger data sets of more diverse types of data. Models will be able to reason over that data better. Models will be better able to take agentic action on users' behalf. Models will be able to process larger and larger amounts of diverse data formats. Models will be able to do all this faster and cheaper than what is possible today.

I don't have the slightest idea what the summation of these improvements will yield. Just considering the above factors, it's so much, moving so quickly. And that's before taking into account unknown unknowns like model architecture breakthroughs.

However, I am confident that these improvements will have a massive impact on how technical education operates.

I also think we can project some general patterns of what future technical education will look like. It will become possible to have high-quality and affordable educational experiences generated to meet individual users' use cases, knowledge levels, and learning styles.

I anticipate chatbots remain a dominant interface given 1) the inertia of existing chatbot tools and 2) humans are conversational.

Better, cheaper, agentic systems also offer a tantalizing set of previously inconceivable education experiences. A few somewhat outlandish ideas that could become possible in the next few years with these new generative AI capabilities:

1. A liberal arts-style advanced seminar on the topic with a room full of AI agents in the metaverse.
2. Video courses with exams generated off a single prompt.
3. An AI-generated podcast where an AI version of your favorite podcast host speaks with an AI version of an imagined subject matter expert of the topic.

While it's impossible to know what forms these learning interfaces will take, there are some concrete steps that technical educators can take now to prepare their content for the generative AI future.

### Make Your Content Ridiculously Easy for a LLM to Retrieve

Make it ridiculously easy for AI systems to do complex RAG with your content. This includes both initial retrieval of relevant content and attribution to where that content came from.

Just as websites and search bars facilitate human users' learning and discovery, we should create new content interfaces optimized for AI agents generating content on behalf of users.

Both external generative AI systems and internally developed ones should be able to consume this content. Many users will likely interact with your educational content through centralized platforms like ChatGPT or Google ~~Bard~~ Gemini. Others will likely come through self-hosted experiences, like on-domain chatbots.

All these systems should be able to work with your content.

### AI-Friendly Content

One way to optimize content for AI retrieval is to keep it fairly straightforward and text-based.

Complex visual elements can confuse AI systems (although this will probably diminish as models advance). Also, learning experiences that depend on control flow like nested tabs or forms, will be harder for AI systems to parse.

On websites, any content that requires running JavaScript to interact with will likely be hard for AI systems to use as well. The AI parsing your content probably will not be able to execute JavaScript to engage with the experience.

I don't think this means that content authors have to avoid these rich educational experiences. But I do think it means that these rich experiences should only exist as a supplement to plain ol' text-based content. You could even include hidden HTML that has the content of the interactive experiences that's only intended for the LLM, not the human user.

This is particularly relevant for technical content with code examples, which often include code in interactive REPLs. I don't think the rise of LLMs as content consumers means that we need to do away with these, but rather exclusively use them as a supplement to in-line markup.

### Content APIs

To help agentic systems work with content, you can create content APIs intended specifically for AI systems to use. You can give AI agents the API specification, and they can use their reasoning ability to use the API to accomplish tasks for users.

[ChatGPT's custom actions](https://platform.openai.com/docs/plugins/introduction) present an early glimpse of what content APIs can look like. You can give a custom GPT access to a RESTful API that it calls in response to user queries. For now, a custom GPT can only call one endpoint per user message. This somewhat limits the complexity of the actions that they can perform but serves as a template for the general architecture of a generative AI system decoupled from the API-defined content interfaces.

Here's a sketch of what a RESTful content API to be consumed by generative AI agents could look like.

```yaml
openapi: 3.0.0
info:
  title: Example Content API
  description: An example of what a content API for LLM usage could look like.
  version: 0.1.9
servers:
  - url: http://content.example.com/api/v1
paths:
  /meta:
    get:
      summary: Get information about what the content API can do, including this API specification (meta!). The language model can use the meta-endpoint.

  /pages/{pageId}:
    get:
      # query params to paginate through a given page
      summary: Get data for a page.

  /search:
    get:
      # query params that allow filtering on data source
      # and content type
      summary: Get chunks of relevant data

  /data-sources:
    get:
      summary: Get information about available data sources
      # ...

  /data-sources/{sourceId}:
    get:
      summary: Get information about a given data source.
      # ...
```

We could even add endpoints that allow the client AI to talk to our own AI:

```yaml
/ask:
  get:
    summary: Ask a question and get an AI-generated response. Include references to where the AI can learn more.
/conversations:
  post:
    summary: Create a new conversation.
    # ...
/conversations/{conversationId}:
  post:
    summary: Add a new client message to the conversation. Get a response from the AI.
    # ...
  get:
    summary: Get a conversation.
    # ...
/conversations/{conversationId}/rate/{messageId}:
  post:
    summary: Add a rating and/or comment to the message.
    # ...
```

### Feed the Models

Content APIs are great for giving language models a real-time look into your product documentation, but we can also further enhance the educational experience by _training_ models on our content.

A language model can reason with your content better if it already has a good idea of the subject embedded into its weights.

Take the MongoDB AI Chatbot that I work on as an example. The OpenAI language models we use have already been trained on MongoDB content. This means the models are already pretty good at generating correct answers to complex questions without depending on external content. It knows what things like aggregation pipelines are, and how to construct them. Any generative AI product that MongoDB _the company_ builds to teach users about using MongoDB _products_ benefits from this latent knowledge in the model's weights.

### Make Your Content "Scrapeable"

Since many language models are trained on data scraped from the web, publishing AI-friendly content to your website will over the long term help models be better at using your content.

All of the same AI content optimizations discussed in the previous [AI-Friendly Content](#ai-friendly-content) section also apply here.

### Publish Datasets

Additionally, you can maintain datasets of content that you can use to fine-tune your own model or even share with others developing their own models. These datasets can include things like the following:

- Copies of your website content to use in models' unsupervised pre-training.
- Additional content to feed the model for unsupervised pre-training, like your code repository.
  - You could even pre-process this content (with another language model?) to annotate it before feeding it to the model to provide additional context.
- Exemplar input/output pairs to fine-tune the model on.

I'm not aware of any standardized format or repository for content to train language models on, but I wouldn't be surprised if one emerges. For now, publishing any data you want publicly accessible to a public [HuggingFace Dataset](https://huggingface.co/docs/datasets/en/index) is probably a good place to start. For internal data, collect it and put it somewhere that everyone who might use can access it.

### Text is King

Text content is the most useful form of data for most generative AI use cases for the foreseeable future. This holds true even as models become multi-modal. Text has a much higher density of information per token than video, images, or audio.

For instance, the recently unveiled [Gemini Pro 1.5 model can process 1 million input tokens](https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/#context-window) in one inference. This amount of tokens corresponds to the entire text of Lord of the Rings trilogy or 1 hour of video. (The runtime of the LOTR movie trilogy was a bit over 9 hours for reference, and that's with Tom Bombadil cut out.)

Unless the topic you are working with is highly visual, sticking to text will likely yield better, more cost-effective outputs.

## Navigating the Risks and Challenges of Generative AI in Technical Education

While generative AI holds immense potential to personalize and enhance technical education, it also comes with notable risks that educators and institutions must proactively address.

Some of these potential risks are:

- **Biased and harmful content**: Generative AI models can reflect societal biases present in their training data and generate content that is biased, inaccurate, or even harmful. I see this as less of an issue in the technical education context than in traditional academic settings, but it is still a concern worth highlighting.
- **Over-reliance and loss of skills**: If learners become overly dependent on AI tools, it could lead to a degradation in core competencies like research, analysis, and original thought. The ease of informational access could reduce the need for subject matter mastery, which in turn could reduce learners' ability to problem solve through complex scenarios where the models themselves struggle.
- **Amplifying inequity**: Wealthier learners may have greater access to powerful AI tools, potentially widening achievement gaps. Marginalized learners could also face greater harm from biased AI systems.

To mitigate these risks, technical educators can take the following actions:

- Red-team and evaluate generative AI tools to look for biased and harmful outputs. Refactor these systems as necessary if biased or harmful results are found.
- Maintain non-generative AI content that users can use as an "escape hatch" if the generative AI is not serving their use case. Including links to where content came from in generated output can be a helpful starting point for this.
- Be mindful of the potential for AI tools to amplify inequities, and work to ensure equitable access and safeguards against bias for all learners, especially those from marginalized groups.

While the rise of generative AI presents exciting opportunities to transform technical education, it also carries risks that must be proactively addressed. By taking steps to mitigate bias, maintain core skills, and promote equitable access, educators can harness the power of this technology while upholding ethical standards and protecting the interests of all learners.

## Preparing Your Technical Content for the Generative AI Era

As the generative AI landscape continues to evolve, technical education must adapt to leverage this technology. Here are some actionable steps you can undertake now to help your content remain relevant and impactful in this new era.

### 1. Experiment with a Documentation Chatbot

Start by developing a documentation chatbot for your content. Even if what you build doesn't make it to production, it's a learning experience that can provide insight into how to bring your content into a generative AI interface and what challenges might arise. (There will be hallucinations, but there will also be ways to mitigate them.)

A variety of tools already exist for you to build documentation chatbots requiring differing technical know-how. To name a few:

1. **No Code**: Upload your docs to a ChatGPT custom GPT's knowledge feature ([docs](https://help.openai.com/en/articles/8843948-knowledge-in-gpts)). There's little customizability to custom GPTs, and the implementation is something of a black box, but you can get started in minutes.
2. **Low Code**: Use a managed documentation chat platform like DocsGPT ([docs](https://docs.docsgpt.co.uk/)). With DocsGPT, you have a limited set of controls you can optimize and it's open source, so you have a better insight into what's going on, even if you can't customize it much without forking.
3. **Code, code, code**: Use a customizable framework like the MongoDB Chatbot Framework ([docs](https://mongodb.github.io/chatbot/)). It'll take more time to set up, but you have a lot more options for optimizing your chatbot to your use case. You could also build your own docs chatbot from scratch using a library like [Langchain](https://www.langchain.com/) or [LlamaIndex](https://www.llamaindex.ai/). All these options are open source, with all the benefits that bring as well.

### 2. Audit and Index Your Content

Take a thorough look at your existing content to evaluate its accessibility for AI consumption. This process involves indexing and auditing your material to ensure it's well-organized, easily retrievable, and comprehensible for language models. Consider even creating the initial dataset of your content to feed to AI models.

### 3. Explore the Concept of a Content API

Consider what a content API would look like for your organization. While it might be premature to start building one right now, given that AI agents are still nascent, it's prudent to plan ahead.

Address critical questions about data access, public vs. private API endpoints, and potential integrations with external systems. For instance, how might you want a custom GPT to interact with your content API? Understanding the scope and structure of your content API now will position you better as AI agents become more prevalent.

### 4. Embrace the Shift Toward Central Learning Interfaces

Centralized interfaces like ChatGPT will continue to play a major if not the leading part of the generative AI landscape.

Think about how you can prepare your content and content strategy for a world where fewer users will visit your website because they will get their answers from tools like ChatGPT. It seems clear that web traffic will be a less relevant metric than it used to be, but it is still up in the air what the replacement metrics could be.

## Conclusion

As we navigate the rapidly evolving landscape of generative AI, technical educators must adapt to meet the users in the interfaces they use. By leveraging the advancements in generative AI, we can transform technical education into more personalized, interactive, and effective experiences. Embracing these changes while remaining cognizant of the challenges the technology brings will enhance users' learning experience and ensure that content remains relevant and impactful in the generative AI era.
