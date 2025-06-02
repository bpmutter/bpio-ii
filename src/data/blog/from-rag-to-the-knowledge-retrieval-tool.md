---
title: "From RAG to the Knowledge Retrieval Tool"
author: Ben Perlmutter
pubDatetime: 2023-12-26T00:00:00.000Z
slug: from-rag-to-the-knowledge-retrieval-tool
featured: false
draft: false
tags:
  - generative-ai
description: "Fitting retrieval augmented generation (RAG) into LLM tool calling"
---
The large language model (LLM) space is moving fast, real fast. One of the new popular ideas that started going big in summer '23 is retrieval augmented generation, usually acronym-ized as RAG.

Also during summer '23, [OpenAI added function calling to the Chat Completions API](https://openai.com/blog/function-calling-and-other-api-updates). Function calling was subsequently rebranded to 'tools' in the Assistants API, released in November '23.

Tool calling lets you as a developer to programmatically call other code in response to LLM output. In effect, tools give LLMs access to external data and interact with the world.

Based on the vibe on HackerNews and the generative AI segment of the noosphere, tool calling took a little while to integrate itself into the collective consciousness. Maybe folks were too busy wrapping their minds around the deluge of other libraries, frameworks, prompting techniques, and models flooding the space. 

I would say that it wasn't until a few months ago, mid-fall '23 perhaps, when the power of giving LLMs tools started to resonate with the LLM development community.

The rise of LLM tools doesn't mean that RAG is going away. Rather, we can think of RAG as a tool in the utility belt of an LLM-powered app.

The rest of this post discusses why you should think of RAG as an LLM tool, and how to integrate a RAG tool into an LLM app.

## Giving Tools to LLMs

I strongly suspect that the next round of LLM apps will be based on using tools. The ability to have an LLM interact with the world via tools is extremely powerful.

Without tools, LLMs are pseudo-omniscient, sometimes hallucinatory text generators.  LLMs remain trapped relaying between the fever dream of collective human knowledge that lies in their weights and inferencing outputs based on the context window. This is incredibly useful, but fundamentally limited.

By connecting to external systems using tools, the number of things that an LLM can do increases dramatically. You can basically do anything with an LLM that you can do with code, and you can do a lot of things with code.

A couple of the most popular tools are baked right into ChatGPT: Dalle-3 image generation, Bing web search, and a Python interpreter for running data analysis.

We're definitely not at a state yet where a tailored LLM-powered app can do a specific thing at the level of a human without supervision, what Mustafa Suleyman calls ["Artificial Capable Intelligence"(ACI) ](https://www.technologyreview.com/2023/07/14/1076296/mustafa-suleyman-my-new-turing-test-would-see-if-ai-can-make-1-million/). And adding tools to the current LLMs probably won't get us to ACI (but like maybe it will 🤷), let alone artificial general intelligence (AGI). 

Rather, we will likely remain in a place where chatbots that you can use to iterate on a conversation with an LLM-powered app are the dominant interface. I wrote more about why I think the chatbot is the best LLM interface in [this blog post](https://ben.perlmutter.io/blog/why-chat-is-the-best-interface-for-llms-for-now).
## The Traditional RAG App

The "traditional" (in as much as anything less than a year old can be traditional) way to perform RAG with a chat-based LLM like the OpenAI ChatCompletions API is as follows:

1. User inputs data
2. Convert user input to vector embedding
3. Vector search for related content similar to the vector embedding
4. Use the related content to answer the user message, usually putting both the content and the user's original input into a single LLM call that looks something like:

```
Use the following data to respond to the users' query:

{CONTEXT DATA FROM VECTOR SEARCH}

User query:
{ORIGINAL USER QUESTION}
```

5. The LLM answers based on the message combining the context data and user question.

This works fairly well. Then, there are lots of way to optimize this process, as I wrote about in the blog post [Taking RAG to Production with the MongoDB Documentation AI Chatbot](https://www.mongodb.com/developer/products/atlas/taking-rag-to-production-documentation-ai-chatbot/).

The traditional approach has a couple of limitations:
1. The user message might not be a great vector search query. For example, say a LLM and a user are conversing about buying a red shirt. A few messages into the conversation, the user says "find large ones". Presumably, they mean "find large red shirts", but "large ones" would not be a good vector search query to find the large red shirts.
2. You have to prompt engineer so that the LLM understands how to talk about the context data and the user message in a coherent message. For example, you wouldn't want it to say, "Based on the context data you provided...", as the user didn't provide that context data themself.
3. You have to know when to do a RAG search and to where before the LLM responds.

These limitations can be solved. You can preprocess user questions through an LLM to decide when to do RAG and give them more semantic meaning and refine your prompt engineering. This approach works but adds significant complexity to an app.

## RAG as a Knowledge Retrieval Tool

Rather than RAG serving as the basis for an app, we can think of RAG as a tool for knowledge retrieval. When conversationally appropriate, the LLM can call the knowledge retrieval tool to fetch relevant information and generate an answer based on it.

### Basic Knowledge Retrieval Tool

This section contains the basics of what a knowledge retrieval tool looks like. The example uses a chatbot to find and buy clothes.

The knowledge retrieval tool is called `find_clothes`. It returns results for clothes that match the user query. `find_clothes` has the following schema:

```yaml
name: find_clothes
description: Get content search results
parameters:
  type: object
  properties:
    query:
      type: string
      description: |
        A query to search for what the user wants.
        Contextualize the query in the conversation.
```

When the LLM calls `find_clothes`, it invokes code that performs a vector search based on the query and returns a message with the following schema:

```yaml
type: array
items:
  type: object
  properties:
    name:
      type: string
    sku: 
	  type: string
	price:
	  type: number
	available_sizes:
	  type: array
	  items:
	    type: string
	description:
	  type: string
```

The chatbot also has access to a `buy_clothes` tool which checks out and buys the clothes:

```yaml
name: buy_clothes
description: Buy clothes for the user
parameters:
  type: array
  properties:
    clothes:
      type: array
      items:
        type: string
        description: SKUs of the items in the order. 
```

Based on the user input and the system prompt, the LLM decides when to call the `find_clothes` tool, the `buy_clothes` tool, or respond without a tool call.

The following  system prompt could direct this flow:

```txt
You are a chatbot that helps users buy clothes.

Use the `find_clothes` tool to search for clothes that match the user query.
Use the `buy_clothes` tool to check out based on the user's selection of what they want to buy.

Before calling `buy_clothes`, always list all the items that the user wants and ask that they confirm they want to buy these clothes.
```

Integrating knowledge retrieval tools like `find_clothes` into LLM-powered chatbot apps provides a variety of advantages over traditional RAG, as discussed in the following section.

### Advantages of a Knowledge Retrieval Tool

Using a knowledge retrieval tool instead of pure RAG has a couple of advantages:

1. A more ergonomic way of interacting with external data than injecting context information into a user message and prompt engineering.
2. Leverage LLMs' reasoning ability to decide when to perform RAG.
3. Use RAG in a knowledge retrieval tool together with other tools in the same abstraction. 

#### Ergonomic Data Interface

The traditional RAG approach often results in a disjointed experience, where the LLM struggles to seamlessly integrate the context data from the RAG search with the user's query into the conversation flow. However, with a knowledge retrieval tool, the LLM can access and utilize external data more naturally.

This approach allows for a smoother conversation flow. The LLM can retrieve and incorporate information in a way that's aligned with the conversation's context rather than shoving the retrieved context data into the user message.

You create a new tool call message with the context data. Then, based on the system prompt, the LLM can know how to use it when responding to the user. 

For example, using the above chatbot to buy clothes example, the message flow would resemble the following:

```js
[
  {
    role: "system",
    content: "<same system prompt as above>"
  },
  {
    role: "user",
    content: "find me red shirts"
  },
  {
    role: "assistant",
    content: null,
    function_call: {
      name: "find_clothes",
      arguments: {
        query: "red shirts"
      }
    }
  },
  {
    role: "function",
    name: "find_clothes",
    content: JSON.stringify([
      {
        name: "Awesome Red Shirt",
        sku: "abc123",
        price: 12.99,
        availableSizes: ["S", "M", "L"],
        description: "The first red shirt..."
      },
      // ...other items
    ])
  },
  {
    role: "assistant",
    content: "The shirt options are: \n\n1. **Awesome Red Shirt** for 12.99 ..."
  }
]
```

The ergonomic data interface provided by knowledge retrieval tools streamlines the interaction between the LLM and external data sources. This integration yields a more coherent response from the LLM.
#### Leverage LLM Reasoning Ability to Invoke RAG

Using a knowledge retrieval tool lets you leverage LLMs' reasoning ability to decide when to perform RAG. You can configure the LLM to decide when to call the knowledge retrieval tool. 

This is helpful if you do not want to perform RAG on every user message or want to include multiple retrieval tools in your chatbot. Using a traditional RAG app, it's hard to decide when to perform RAG versus have the LLM answer without retrieval, let alone use other tools. 

To continue using the clothes shopping chatbot example, you could ask the chatbot for more information on one of the items presented. The chatbot could respond based on information of the `description` property of the `find_clothes` function call without any additional function calls.

#### Use Knowledge Retrieval with Other Tools

One of the key benefits of using knowledge retrieval as a tool is the ability to integrate it with other tools within the same chat interface.

For instance, in our clothes shopping chatbot example, the `find_clothes` and `buy_clothes` tools work together.  You can create more complex and useful chatbot experiences that go beyond basic information retrieval. Here's what a continuation of the example conversation from the previous Ergonomic Data Interface section might look like using multiple tools:

```js
[
  // messages from the previous section about finding a shirt
  {
    role: "user",
    "content": "great, buy me the awesome shirt size L",
  },
  {
    role: "assistant",
    content: "Before I make the order, let me confirm you want to buy 'Awesome Red Shirt', size 'L'"
  },
  {
    role: "user",
    content: "confirmed"
  },
  {
    role: "assistant",
    content: null,
    function_call: {
      name: "buy_clothes",
      arguments: {
        clothes: ["abc123"]
      }
    }
  },
  {
    role: "function",
    name: "buy_clothes",
    content: JSON.stringify({
      status: "success",
      itemsPurchased: [
        {
          sku: "abc123",
          name: "Awesome Red Shirt"
        }
      ],
      orderId: "qwerty456"
    })
  },
  {
    role: "assistant",
    content: "Successfully bought Awesome Red Shirt. Your order ID is 'querty456'."
  }
]
```

By enabling interaction between different tools like `find_clothes` and `buy_clothes` in a single chatbot interface, we can create more sophisticated and useful chatbot experiences. This approach not only simplifies the retrieval and use of external data but also adds a layer of complexity to the chatbot's capabilities.

## Knowledge Retrieval Tools Are Really Useful

I suspect that RAG knowledge retrieval tools will be the most important set of LLM tools for the foreseeable future. This is due to some limitations of current LLMs:

1. Large language models hallucinate, and RAG reduces hallucination by grounding responses in the retrieved context data.
2. It is very hard and expensive to train a large language model on your own source data, especially if that data is changing. RAG gets around this by injecting that data into the LLM context.

Recent features from AI leaders OpenAI and Google indicate that they think RAG is very important to building LLM-powered apps:

- OpenAI included a built-in [knowledge retrieval module in its new Assistant API](https://platform.openai.com/docs/assistants/tools/knowledge-retrieval) and added similar functionality to custom GPTs.
- Google included a [RAG system called the 'semantic retriever' in the new Gemini API](https://ai.google.dev/docs/semantic_retriever).

The fact that the LLM model developers are tightly incorporating knowledge retrieval systems into their products indicates that they don't see the above LLM limitations going away soon, and they see knowledge retrieval as a mitigation if not a solution for these problems.

Interestingly, both Google and OpenAI are promoting their own proprietary RAG tool systems separate from the general tools interface they provide. Deeply integrating tools into their API surely allows for additional feature depth, but it also creates a vendor lock-in effect. Given the dynamism of the LLM space, I personally would avoid using vendors' proprietary RAG tool systems so that my application isn't too tightly coupled to a specific vendor. Personally, I'd avoid these vendor-specific RAG systems for anything beyond a quick prototype and instead use a more flexible knowledge retrieval tool, as described above.

Until LLM developers figure out how to 1) reduce model hallucination and 2) make it easy to fine-tune a model on your own data set, RAG will remain an important part of building LLM-powered apps.

## Integrating RAG as a Tool

To test out integrating RAG as an LLM tool into an app, I built a version of the MongoDB Docs Chatbot with a RAG tool. 

I built it as a custom GPT, the **MongoDbAssistant**, rather than a standalone app to limit the amount of code I had to write. If you have ChatGPT Plus, you can use it here: [https://chat.openai.com/g/g-g4pJBXMe4-mongodbassistant](https://chat.openai.com/g/g-g4pJBXMe4-mongodbassistant). 

You can see the source code and system prompt here: [https://github.com/mongodben/rag-chatgpt-plugin](https://github.com/mongodben/rag-chatgpt-plugin).

It's hard to compare it directly to the MongoDB Docs Chatbot deployed to mongodb.com/docs because the custom GPT uses GPT-4 whereas the one on mongodb.com uses GPT-3.5. However, the custom GPT using a retrieval tool performs significantly better than the one on mongodb.com.

The custom GPT is much less likely to create awkward answers that refer to stuff in the user message that it shouldn't, like section headers or say "according to my knowledge".

At some future point, I'll consider including some side-by-side evals of the two systems here, but for now: "trust me bro", the knowledge retrieval tool works better.

## Unifying the External Data Interface

As we look towards the near future of LLMs and applications build around them, I imagine both RAG and tool calling will be a big part of the story. 

 As discussed above, using a knowledge retrieval tool presents a variety of advantages over traditional RAG apps, including:

1. A more ergonomic way of interacting with external data than injecting context information into a user message and prompt engineering.
2. Leverage LLMs' reasoning ability to decide when to perform RAG.
3. Use RAG in a knowledge retrieval tool together with other tools in the same abstraction. 

A second-order effect of standardizing external data interaction within the tools interface is that it lets us focus on optimizing RAG within the context of the tools interface without having to worry about what the interface should be. We can focus our attention on aspects of RAG like the data ingestion strategy, prompt engineering the knowledge retrieval tool, and testing different AI models. 

Also, by having tools as a standardized interface for external data interaction, we can focus our attention on other areas of building intelligent chatbot apps where a standardized interface doesn't exist. For instance, potential focus areas include managing long-term memory beyond the LLM's context window and incorporating behavior personalized to the specific end-user.

As we continue to explore and refine LLM-powered apps' capabilities, we can expect LLM-powered applications to become increasingly sophisticated and useful. RAG and knowledge retrieval tools will be part of this story for the foreseeable future.