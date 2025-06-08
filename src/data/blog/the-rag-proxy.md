---
title: "The RAG Proxy"
author: Ben Perlmutter
pubDatetime: 2024-06-09T00:00:00.000Z
slug: the-rag-proxy
featured: false
draft: false
tags:
  - generative-ai
description: "Improving LLM performance on domain specific tasks with hidden RAG."
---
During the latest Skunkworks, a MongoDB internal hackathon, I worked on a project to proxy API requests to a large language model (LLM)  through a server that performs retrieval-augmented generation (RAG) under the hood to improve domain-specific performance. The server then responds as if it were just the model even though it's performing RAG.

I call this approach the **RAG proxy**.

I think this is a promising approach for using generative AI for domain-specific tasks. 

In the remainder of this blog post, I explore how a RAG proxy works, its advantages, and the tradeoffs it can produce.

## RAG Proxy Architecture

Here's a high-level architecture of what a RAG proxy looks like:

![RAG proxy diagram](@/assets/images/Screenshot_2024-09-01_at_4.22.49_PM.png)

## It Began with the Knowledge API

Recently, a bunch of internal teams have come to my team looking to use various parts of the tools and data that we've built for the MongoDB Docs Chatbot. Without giving away any Corporate Secrets, these use cases include:

- Other public-facing RAG chatbots
- Internal RAG chatbots
- Model training data
- In-product AI experiences

Each of these use cases has separate but often overlapping requirements. Supporting all these bespoke requests requires more resources than my team has and is bound to create some heavy maintenance burdens over time.

My goal for this Skunkworks was to think about how we can support these use cases and future ones in a maintainable manner. My team's Big Idea for addressing this that we'd been hand-waving about for a while is to create a "Knowledge Service".

The Knowledge Service is an API that supports the following:

- **Retrieval of full content**: Pull content from a centralized database for things like model training, agentic workflows, and building separate databases for RAG (often in the context of a 3rd-party tool).
- **Search Retrieval**: Retrieve relevant chunks of content with search for things like other generative AI apps and plugins to third-party tools.
- **Domain-specific generative AI**: Have some form of generative AI service that's optimized for answering questions about MongoDB. 

Creating the API endpoints for full content retrieval was super straightforward. Just pull content we'd already curated from the DB and return it to the client.
Search retrieval is a much harder problem, but we'd already done the work on this for the docs chatbot, so I just needed to wrap the chatbot's retrieval system in an API endpoint. I implemented hackathon-sufficient MVPs of both the content and search Knowledge API endpoints in a day.

However, I was struggling to come up with a satisfactory approach to the domain-specific generative AI functionality. My initial thoughts were to have a suite of endpoints for different styles of RAG-based conversations and 1-off answer generation. One set of conversation endpoints for the docs chatbot, another for one on the marketing website, etc.

Multiple sets of conversation and answer generation endpoints *could* work, but it would *centralize* the complexity of maintaining different AI experiences in the Knowledge API rather than *reduce* that complexity. Centralization of generative AI responsibility would still overburden our team, even if in a more maintainable architecture. We needed more flexible generative AI functionality that could support different use cases while reducing complexity.

By Thursday afternoon, with the clock ticking for the hackathon's very strict Friday 6:00 PM EST submission deadline, I still wasn't satisfied with where the knowledge service was at for its generative AI functionality.

And then, *inspiration struck*!

To create a single flexible generative AI interface, we could hide the RAG functionality behind a standard LLM interface. The consumers of the service can use the LLM interface with hidden RAG as they would any LLM. They can add their prompting strategy and function calling. They could even add additional layers of RAG. I call this approach the **RAG proxy**.

## The "MongoDB in the Middle" RAG Proxy

For Skunkworks, I built a RAG proxy project that I called "MongoDB in the Middle". I created an API endpoint using the same schema as the [OpenAI Chat Completions API](https://platform.openai.com/docs/api-reference/chat/create) (`POST https://api.openai.com/v1/chat/completions`). It uses the same source data and retrieval system as the MongoDB Docs Chatbot. 

It's pretty common for other LLM APIs to model the OpenAI API schema. For example, [Radiant AI](https://radiantai.com/) and [Fireworks AI](https://fireworks.ai/) are model hosts that both do this. [LiteLLM](https://github.com/BerriAI/litellm) is an OSS project that lets you work with over 100 LLMs using the OpenAI API schema.

The Perplexity.ai API [`pplx-api`](https://docs.perplexity.ai/docs/getting-started) also roughly uses the OpenAI schema and performs web-scale RAG under the hood in its "online" family of models.

I thought it would be interesting to take the same approach to Perplexity.ai, but rather than use the whole internet as a data source, just use our MongoDB-related content and MongoDB-optimized retrieval system. This would allow you to use the MongoDB RAG proxy instead of an off-the-shelf LLM for better performance on MongoDB-specific tasks.

### Implementation

Building the RAG proxy was quick and easy given the long and challenging work that we've spent building the MongoDB Docs Chatbot and MongoDB Chatbot Framework over the past year.

I pulled up the OpenAI Chat Completions API docs and created an Express.js endpoint that models its request and response format.

The endpoint has the following data flow:
1. The client sends request with system/user/assistant messages to the server.
2. Retrieve relevant content using the retrieval module as the docs chatbot.
3. Inject the retrieved content in a system message before the content of the client's request.
4. Send the client's request + injected content to the LLM for generation.
5. The LLM generates a response based on the client request and injected content. 
6. The server responds to the client with an LLM-generated response.

When a client sends a request to the endpoint, it uses the same retrieval module that we use in the docs chatbot to find relevant content to answer the user's question. Then those retrieved results are injected into the prompt sent to the LLM. The LLM generates a completion based on the combined retrieved results and the content that the user includes in their request.

For this prototype, I included the retrieved results as a system prompt at the top of the messages sent to the LLM. The messages sent to the LLM in the RAG proxy look like:

```js
[
  {
    "role": "system",
    content: `Use the following content to inform the latest message:
${retrievedContent}`
  }
  // Messages sent with the request.
  // System prompt, previous messages, latest user message, etc.
]
```

### Results

The "MongoDB-in-the-middle" RAG proxy worked pretty well! It used system prompt instructions like "talk like a pirate". It also, arguably more importantly, responded more accurately to some prompts than the base LLM. This includes talking about information that is not in the base LLM training data.

For instance, the RAG proxy correctly referred to the MongoDB Kotlin Driver as the best way to use MongoDB from a Kotlin application, whereas GPT-4o does not. This is likely because the Kotlin driver was released relatively recently, in June 2023. Even if GPT-4o has been trained on some information regarding the Kotlin driver, it likely was also trained on more information that discusses previous out-of-date ways to connect to MongoDB from a Kotlin application, like with KMongo or the MongoDB Java driver.

Here are both the "raw" GPT-4o and GPT-4o-with-RAG-proxy responses to the query "how do i use MongoDB from a Kotlin application?"

Raw GPT-4o response:

````md
To use MongoDB from a Kotlin application, you can use the MongoDB Java Driver, which works seamlessly with Kotlin since Kotlin is fully interoperable with Java. Here are the general steps to connect and perform basic CRUD operations in a Kotlin application using MongoDB:

### Step 1: Add Dependencies

First, add the MongoDB driver dependency to your project. If you're using Gradle, add this to your `build.gradle.kts` file:

```kotlin
dependencies { 
	implementation("org.mongodb:mongodb-driver-sync:4.10.0")
}
```

Replace `4.10.0` with the latest version of the MongoDB driver available.

...
````

Interestingly this response includes a version of the MongoDB Java Driver that came out while the official Kotlin driver already existed with documentation on the inter. Perhaps because of previous training data that mentions using the Java driver from Kotlin, the LLM defaults to mentioning the Java driver.

The GPT-4o-with-RAG-proxy response correctly recommends the official Kotlin Coroutine driver:
````md
To use MongoDB from a Kotlin application, you'll need to set up your project with the MongoDB Kotlin driver, which supports both synchronous and asynchronous operations using coroutines. Here’s a basic guide to get you started:

1. **Set Up Your Project**: First, you need to create a Kotlin project using an IDE like IntelliJ IDEA. You can create a new project using Gradle or Maven as the build tool.

2. **Add the Kotlin Driver Dependency**: Add the MongoDB Kotlin driver dependency to your `build.gradle` file. For example:
   ```kotlin
   dependencies {
       implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4")
       implementation("org.mongodb:mongodb-driver-kotlin-coroutine:5.1.2")
   }
   ```
...
````

The response includes the latest version of the driver and recommends the coroutine version of the drive, which is recommended for most Kotlin applications.

Given the last-minute-of-a-hackathon context, I didn't get to do a systematic evaluation of the RAG proxy. I'd love to do an evaluation comparing its performance to the base model on a wide variety of MongoDB-related tasks.
I think it'd be really interesting to benchmark it against various LLMs on MongoDB-related tasks to see how they compare.

### Source Code

You can find the very not clean source code in this pull request - [https://github.com/mongodb/chatbot/pull/417/](https://github.com/mongodb/chatbot/pull/417/).

## Advantages and Disadvantages of the RAG Proxy

Here are some initial thoughts on the advantages and disadvantages of the RAG proxy approach. 

Advantages:

- **Accuracy**: The RAG proxy, like any RAG system, can provide more accurate results than using just an LLM.
- **RAG Centralization**: Consumers of a RAG proxy don't need to think about developing their own RAG systems. They can focus on their application-specific needs, like prompt engineering, evaluation, and integration.
- **Fine-tuning alternative**: In many respects, a RAG proxy occupies the same role as fine-tuning a model, but without the complexities or overhead that fine-tuning entails.

Disadvantages: 

- **Cost**: A RAG Proxy can cost more to call than the base model because it uses more tokens given the injection of retrieved context than using a similar base model would.
- **Speed**: A RAG Proxy responds more slowly than a base model because it needs to perform retrieval before generating. Plus, the generation uses more input tokens which can create a longer time to the first token on the output.
- **Retrieval-introduced inaccuracies**: A RAG Proxy might not retrieve relevant information, yielding a worse response than just calling the base model.

## Looking Towards Building AI Systems

We currently have no plans to further develop the RAG proxy. A need for it hasn't emerged. I wouldn't be surprised if that changes sometime in the next year as the number of RAG projects increases. Time will tell.

In any case, it was a fun project and a novel (at least to me) approach to RAG and LLM development. 