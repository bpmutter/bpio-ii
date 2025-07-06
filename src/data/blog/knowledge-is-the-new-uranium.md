---
title: "Knowledge Is the New Uranium"
author: Ben Perlmutter
pubDatetime: 2024-06-26T00:00:00.000Z
slug: knowledge-is-the-new-uranium
featured: false
draft: false
tags:
  - generative-ai
description: "Exploring how knowledge resources have become the most powerful fuel for generative AI applications, from RAG chatbots to model training datasets."
---

> *This post is based on a conference talk I gave at the AI Engineer World's Fair in June 2024. Find more details about the talk [here](./knowledge-is-the-new-uranium-talk.md).*

It's long been said that "data is the new oil". Data has become one of the most useful commodities driving the modern economy, like how oil fueled industry throughout the 20th century. Data, when properly refined, can provide insights and enable new technologies that create lots of value.

Just as uranium later emerged as an even more powerful fuel source than fossil fuels, we are witnessing a new more powerful resource than data, knowledge.

What exactly do I mean by knowledge in this context? Instead of a dictionary definition, here's how the good Claude 3 Opus defines "knowledge":

> Knowledge refers to information that has been processed, organized, and understood in a way that makes it useful for decision making, problem solving, or enabling intelligent action. It goes beyond raw data to include meaning, context and applicability.
> 
>- *Claude 3 Opus*

In contrast to raw data that consists of unprocessed if organized collections of strings and numbers, knowledge is data that has been curated and contextualized to facilitate intelligent decision-making.

Some practical examples of knowledge resources include public and internal documentation, source code repositories, customer feedback data, reports from analysts, memos, product descriptions, and technical specifications.

The rise of large language models (LLMs) and their ability to understand and reason over vast amounts of information has made knowledge an extraordinarily valuable asset in the generative AI era. LLMs can use knowledge resources to generate intelligent outputs, make decisions, take actions, and produce more knowledge resources.

For many organizations,retrieval-augmented generation (RAG) chatbots have been the first generative AI use case to leverage their knowledge resources like documentation and code repositories. I've focused on for the past year and change on the RAG chatbot space, working on projects like the [MongoDB Docs Chatbot](./taking-rag-to-production-with-the-mongodb-documentation-ai-chatbot.md) and the [MongoDB Chatbot Framework](./build-a-production-ready-intelligent-chatbot-with-the-mongodb-chatbot.md).

RAG chatbots are great, and [I think they'll continue to be important for the foreseeable future](./why-chat-is-the-best-interface-for-llms-for-now.md).  But knowledge resources can fuel so much more than just RAG chatbots.

This blog post explores the currently possible use cases for knowledge resources, all of which we are currently doing at MongoDB, including:

- Additional RAG chatbots
- In-product learning experiences
- Analytical natural language processing (NLP)
- Creating datasets to train models
- Creating model evaluation datasets

The blog post also speculates on creating a "knowledge service" to centralize the power of knowledge resources. A knowledge service can enable builders, both human and AI, to quickly access and utilize curated knowledge assets for a wide range of uses. This centralized approach can accelerate development by making knowledge more accessible and actionable, following the principles of a [service-oriented architecture](https://aws.amazon.com/what-is/service-oriented-architecture/).

Just as uranium can supply immense amount of power, knowledge resources coupled with generative AI can revolutionize how we operate and deliver value. By harnessing the power of these knowledge assets, we can unlock unprecedented insights, automation, and innovation across their business.

## Ingestion: Mining and Refining Knowledge

Knowledge likely exists in a variety of different forms across an organization - public websites with HTML content, PDFs, Google/Microsoft documents, internal wikis exposed via APIs, markdown files in code repositories like READMEs, and more. To make this raw knowledge usable by AI systems, we must go through a process of extracting, transforming, and loading (ETL) it into a standardized format.

The ideal format allows models to make apples-to-apples comparisons and provides an easier way for humans to work with the data. For text data, this often means converting everything to a uniform markup format like markdown. For other media types like images, it could involve standardizing dimensions, file types, etc. The goal is to have all your knowledge resources normalized into a consistent data structure.

We can also use LLMs to refine less "rawer" forms of knowledge. For example, you could use an LLM to condense a forum thread into a blog post on the topic. 

Once normalized, you can centralize the knowledge into a repository that serves as a single source of truth. Having a centralized knowledge base provides easy access for current use cases while future-proofing your resources as new AI capabilities and applications emerge. 

At MongoDB, we store all our text-based documentation in a single MongoDB collection. We also have a HuggingFace dataset with this information that we share with partners who're interested in using our knowledge data.

With a centralized, standardized knowledge repository in place, organizations can enable a range of generative AI use cases powered by that knowledge.

## Current Use Cases

Next, let's take a look at some ways that you can currently use your knowledge resources with current-generation AI technologies.

### More RAG Chatbots

Chatbots seem to be the dominant interface for leveraging knowledge resources with generative AI at the moment. Chatbots are great for providing relatively high value for relatively low effort. In a previous blog post, [Why Chat is the Best Interface for LLMs (for now?)](./why-chat-is-the-best-interface-for-llms-for-now.md), I explored why I think chatbots work so well right now.

With the right chatbot infrastructure, you can probably drive 10s of percents of productivity gain in most knowledge work tasks by giving someone an AI chatbot using a GPT-4+ tier model with a good system prompt and knowledge retrieval system. At MongoDB, we've started using a tool called [Credal.ai](https://www.credal.ai/) for internal chatbot with promising initial results. [ChatGPT's custom GPTs](./exploring-custom-gpts.md) are another tool for quickly spinning up custom LLM chatbots.

It doesn't really make sense to have a single centralized team create all the chatbots for an organization, given that:

1. With the right infrastructure, chatbots aren't hard to make.
2. Every team or even individual will have their own specific needs that they know better than a centralized team can.

However, it does make sense for there to be a central knowledge store accessible for everyone to use in their RAG chatbots. All chatbots can work off this same knowledge base, even if their retrieval patterns are different.

Some examples of RAG chatbots that teams could create using a centralized knowledge repository include:

- Customer support chatbot that answers questions using knowledge base content
- Sales assistant chatbot that leverages product documentation, case studies, etc. to help close deals and answer prospect questions
- Content authoring assistant that uses existing knowledge to help draft new content more quickly.
- Employee chatbot for HR questions or IT support powered by internal docs

A centralized and standardized knowledge dataset lets these users quickly spin up powerful chatbots tailored to their needs. It provides the foundation for them to plug in an LLM and start realizing productivity gains from generative AI with relatively low start up cost.

### In-Product Experiences

Knowledge resources can also fuel in-product experiences by having an LLM generate an output by combining the knowledge with user input and application context.

Essentially, any user input field presents an opportunity to transform natural language into structured output tailored to the application. One approach is to inject relevant knowledge along with the user's input before generating a response. This knowledge can be static for the input type or dynamically retrieved using RAG-style retrieval based on the specific user query.

A great example of this is the [MongoDB Compass AI Query Builder](https://www.mongodb.com/docs/compass/current/query-with-natural-language/prompt-natural-language-query/). It allows users to create MongoDB queries using natural language prompts. The Query Builder has awareness of users' database schema under the hood which it uses to inform generation. Interestingly, this feature doesn't actually include any additional knowledge beyond the user's database information, their prompt, and an LLM (GPT-3.5 in this case). It leverages the model's inherent understanding of MongoDB to interpret the user's intent.

Some other potential in-product AI experiences powered by knowledge could include:

- Providing explanations or additional context on key terms when the user highlights them, pulling from documentation or other knowledge sources.
- Suggesting relevant docs, tutorials, or help content based on the user's current activity in the product.
- Offering tips on using advanced features when the user exhibits certain beginner usage patterns, with the tips informed by product documentation and user guides.
- Autocompleting complex configuration fields based on user input and best practices codified in knowledge bases.
- Generating sample code or configurations using a combination of user intent, application context, and curated examples in documentation.

All of these are examples of in-product features where combining knowledge with AI can simplify a workflow, provide useful information, or guide users towards a better experience. 

### Analytical NLP

You can also use your knowledge resources for analytical natural language processing (NLP) like classification and sentiment analysis. Many of these analytical NLP tasks were possible before LLMs using traditional AI models and non-AI NLP, but these approaches require more specialized knowledge and development time to perform. LLMs turn these into matters of straightforward prompt engineering. 

At MongoDB, we recently conducted a "Skunkworks" hackathon project to analyze our code examples for various forms of bias, like being Western-centric or perpetuating stereotypes. We used a GPT-3.5 model as a classifier, which allowed us to quickly categorize examples without having to fine-tune a pre-trained model or go through the entire model training process from scratch.

Unfortunately, I cannot share the source code as it's in a private repo.  On a high level, the approach was to create a few-shot, chain-of-thought classifier function.

This project stands in stark contrast to a similar effort undertaken by one of our team members last year. They spent a week manually classifying code examples in a spreadsheet, and that was just for a single site.

With our new LLM-powered approach, we wrote a script that classified every code example across all our properties in about a day. The process could be even faster with more AI compute resources or further optimization. Importantly, this classification is now repeatable with minimal human input, allowing us to focus more on refining the categories and analyzing the results rather than the tedious classification work.

If we were to have trained a classifier model, even just[ fine-tuning a classifier like BERT](https://www.philschmid.de/bert-text-classification-in-a-different-language), it would have been a much more time and effort intensive process that required a deeper knowledge of ML than anyone on the team (myself included) possessed. Realistically, we never would have even undertaken this project if we didn't have LLMs to make it accessible to us. 

Some other potential applications of analytical NLP on knowledge resources include:

- Identify common customer pain points or feature requests from support tickets and feedback forums.
- Detect sensitive information like credentials or personal data in code repositories to prevent leaks.
- Analyze sentiment around product and feature names to inform branding decisions.
- Automatically tag and categorize content based on metadata like topic, audience,  and reading level.

By applying LLMs to these analytical tasks, organizations can extract valuable insights from their knowledge resources more easily than ever before. This allows teams to spend more time acting on the insights rather than wrangling the data or developing custom models.

### Model Training Datasets

You can also transform your knowledge resources into datasets for training and fine-tuning AI models. This goes beyond simply feeding raw text to models. You can use LLMs themselves to create synthetic training datasets from your existing knowledge.

#### Foundational Model Pretraining

The most straightforward approach is to include your curated knowledge text in the unsupervised pretraining of foundational models. This involves feeding your normalized, cleaned knowledge directly to the model during training, allowing it to learn patterns and information specific to your domain.

At MongoDB, we've shared our documentation dataset on HuggingFace specifically so that model developers can include it in their training pipelines. This means future models will have better inherent understanding of MongoDB concepts and terminology.

#### Generated Prompt-Completion Pairs

More sophisticated approaches involve using LLMs to generate structured training data from your knowledge resources. Instead of just dumping raw text into a model, you can convert knowledge into question-answer pairs, tutorials, code examples, and other formats that models can learn from more effectively.

The process works by taking chunks of your knowledge and using an LLM to generate various prompt-completion pairs that cover the material. For example, you might take a technical documentation page and generate:
- Questions about the concepts with detailed answers
- Code examples with explanations
- Troubleshooting scenarios with solutions
- Comparison prompts highlighting differences between related topics

You can use techniques like [Evol-Instruct](https://arxiv.org/abs/2304.12244) from the WizardLM paper to create prompt completions of varying complexity. This technique systematically makes prompts more challenging by adding constraints, requiring multi-step reasoning, or incorporating edge cases.

This generated data works particularly well with LoRA (Low-Rank Adaptation) fine-tuning, which lets you efficiently adapt large models to your specific domain without the computational cost of full fine-tuning. From conversations with folks working in the space, I've heard that fine-tuning on approximately 1 billion tokens with LoRA can yield meaningful model improvements, though this obviously depends on your specific use case and data quality.

The beauty of this approach is that once you've built the pipeline to generate training data from your knowledge, you can easily scale it up or refresh it as your knowledge base evolves.

### Evaluation Datasets

Knowledge resources are also incredibly valuable for creating evaluation datasets to test foundational model and AI system performance. Rather than relying solely on generic benchmarks, you can create domain-specific evaluations that directly measure how well AI systems understand and work with your specific knowledge.

#### Custom Multiple-Choice Benchmarks

One approach is to generate large sets of multiple-choice questions from your knowledge base. You can create your own version of well-known benchmarks like [MMLU](https://paperswithcode.com/dataset/mmlu), but tailored to your domain. 

For example, at MongoDB, we could create a comprehensive evaluation set covering database concepts, query syntax, best practices, and troubleshooting scenarios. Using the same Evol-Instruct-style techniques mentioned earlier, you can create questions of varying difficulties - from basic concept recognition to complex multi-step reasoning problems.

#### Open-Ended Question Evaluation

Beyond multiple choice, you can generate open-ended questions paired with success criteria or reference answers. This allows for more nuanced evaluation of model reasoning and explanation capabilities.

You can use evaluation frameworks like [Ragas](https://docs.ragas.io/en/stable/concepts/metrics/index.html) to automatically assess the quality of responses along multiple dimensions like faithfulness, relevance, and completeness. This approach works particularly well for evaluating RAG systems, since you can measure both retrieval quality and generation quality.

**Practical Applications**

These domain-specific evaluation datasets serve multiple purposes:

- **Model selection**: Compare how different foundational models perform on your specific use cases before committing to one
- **RAG system optimization**: Systematically test different retrieval strategies, prompt engineering approaches, and model configurations
- **Fine-tuning guidance**: Use evaluation results to inform what areas need improvement through additional training
- **Production monitoring**: Continuously assess system performance as your knowledge base and use cases evolve

The key advantage of knowledge-derived evaluation datasets is that they test what actually matters for your use case, rather than generic capabilities that may not translate to your specific domain. This gives you much more confidence that improvements on the benchmark will translate to real-world performance gains.

### Knowledge Graphs (A Hand-Wavey Mention)

I'd be remiss if I didn't mention knowledge graphs as another way to leverage your knowledge resources, though I'll admit this is the area I'm least familiar with in practice.

Knowledge graphs represent information as interconnected entities and relationships, allowing AI systems to understand not just individual pieces of knowledge but how they relate to each other. Instead of treating your documentation as isolated chunks of text, you can extract entities (like "MongoDB", "aggregation pipeline", "index") and their relationships ("uses", "requires", "optimizes") to create a structured representation of your knowledge.

This structured approach can enhance RAG systems by providing more contextual retrieval. Instead of just finding documents that mention "aggregation pipelines," you could retrieve related concepts like "indexes that optimize aggregation performance" or "common aggregation patterns for time-series data."

LLMs can actually help you create knowledge graphs by extracting entities and relationships from your existing documentation, though the quality and consistency of extraction remains a challenge. Some organizations are experimenting with hybrid approaches that combine knowledge graphs with 'traditional RAG' (in as much a technique so new can be considered *traditional*), to get both structured relationship understanding and flexible text-based retrieval.

While knowledge graphs represent an interesting direction for knowledge utilization, I suspect most organizations will see more immediate value from the other approaches covered in this post. Knowledge graphs require additional infrastructure and expertise that may not be justified unless you have very complex, highly interconnected knowledge domains.

## Knowledge Nukes and Meltdowns: Does the Metaphor Get Scary?

If we're going to stick with the uranium metaphor, we should acknowledge that uranium can be dangerous. It can power nuclear weapons and nuclear power plants can have catastrophic meltdowns if not properly managed. Similarly, knowledge resources combined with generative AI could be misused or lead to unintended consequences.

### Knowledge Nukes

What would a "knowledge nuke" look like? This would involve using knowledge resources with generative AI for offensive purposes - essentially weaponizing your knowledge infrastructure.

One example might be using your knowledge base and LLM to create sophisticated disinformation related to your subject matter. If you have a comprehensive medical knowledge base, for instance, a bad actor could potentially use it to generate convincing but false medical advice or conspiracy theories.

Frankly, I think the current risk of offensive use of knowledge resources is relatively limited. This might be due to my failure of imagination, or it could be that generative AI technologies aren't yet powerful enough to unlock major offensive capabilities from knowledge resources. But this is definitely worth monitoring as LLMs and other generative AI technologies become more advanced and capable.

### Knowledge Meltdowns

A "knowledge meltdown" would be the unintentional leakage of knowledge resources that leads to negative consequences. This can happen in several ways:

1. **Direct access breaches** occur when someone who shouldn't have access gains entry to your knowledge repository containing sensitive data. This is the traditional information security concern, but centralized knowledge repositories can make the blast radius larger.
2. **Accidental exposure through AI interfaces** is a newer concern. For example, an internal HR chatbot might expose all the company's salary information when prompted correctly, or a customer support bot might leak competitive intelligence when cleverly questioned.
3. **Training data contamination** happens when sensitive information accidentally gets included in training data for an AI model. If you included source code from private repositories in training data for an LLM, that code could potentially be revealed through the right end-user prompting techniques.

These risks are real but manageable with proper security practices. The key is being intentional about what knowledge you centralize and expose to AI systems.

### Secure Use of Knowledge

Just as nuclear technology requires strict safety protocols and oversight, generative AI and knowledge management need proper guidelines and governance. Organizations must prioritize security and privacy when working with knowledge resources and AI.

This means applying the same information security practices you'd use for any sensitive data, plus additional generative AI considerations like prompt injection attacks. Since we're only entering the generative AI era, we should be particularly mindful about which knowledge resources we expose and utilize.

Just as the safest thing to do with uranium is to leave it in the ground, it is safest to not ingest knowledge that you don't want to be leaked.

At my team at MongoDB, we only work with public-facing data. Even if our knowledge repository were to be completely compromised, all you'd get is a cleaner version of information you can already find on the web in various forms. Sure, it'd save some labor (you wouldn't need to scrape web pages or transcribe videos), but that's the extent of the damage.

Another approach for sensitive data is to load it into context at runtime rather than storing it in a permanent knowledge repository. This is less performant and limits what you can do with the knowledge resource, but that constraint can be a feature rather than a bug. For example, if you want to analyze a confidential business plan document, you could load it into a chat interface temporarily rather than permanently ingesting it.

A related intermediate approach is to store only metadata about sensitive knowledge - enough to know it exists and how to retrieve it, but not the actual content.

Despite these risks, we shouldn't lose sight of the tremendous positive potential. Nuclear technology, despite its dangers, has brought significant benefits like clean energy and medical advances. Similarly, knowledge resources and generative AI have the potential to solve complex problems, enhance creativity, and improve people's lives. With proper safeguards and responsible development, the benefits outweigh the risks.

## The Knowledge Service

All of the use cases we've discussed point toward a logical conclusion: creating a centralized knowledge service for your organization. This would be a service specifically designed for interacting with knowledge resources. It would probably take the form of a RESTful HTTPS API in most circumstances.

This idea follows the principles of service-oriented architecture (SOA), applied to this new domain of LLMs and knowledge resources. According to the [AWS documentation](https://aws.amazon.com/what-is/service-oriented-architecture/), the core idea of SOA is that "each service provides a business capability, and services can also communicate with each other across platforms and languages."

Before the rise of LLMs, there wasn't necessarily a compelling need to consolidate knowledge resources in a service. Who would use it and for what? Knowledge had been primarily a resource for *humans* to consume through websites and documentation portals.

But now we have *machine* users in the form of LLM-powered systems and AI model training pipelines. A knowledge service helps accommodate these AI-powered use cases while facilitating human developers to build on top of these systems. It's the same idea as how an organization might have a billing service that different teams use for handling payments across different products. Now knowledge consumption is a similar cross-cutting concern.

**Core Knowledge API Functionality**

A knowledge service should include several key capabilities:

1. **Resource retrieval** by identifiers (get all web pages' content by site, get single web page content by URL)
2. **Robust search and query functionality** to find content even when you don't know exactly where it exists. This could return either chunks optimized for LLM consumption or complete knowledge resources
3. **Generative AI endpoints** built into the service itself, like a chat endpoint that provides natural language responses to queries using RAG or specialized models (I prototyped this for our latest skunkworks hackathon and it worked quite well, though I didn't evaluate it thoroughly)

You'd secure this with standard API security best practices: role-based access control (RBAC) for sensitive information, rate limits and authentication to prevent abuse, and all the other API security techniques the software industry has developed over the past decades.

A centralized knowledge service could become the foundation for all knowledge-powered AI initiatives across an organization, avoiding duplication and ensuring consistency.

### Empower Builders

The power of a knowledge service is that teams who want to work with knowledge only need to understand the interface and have appropriate access. This approach prepares us for a future where AI is deeply integrated into many parts of products and workflows, and where more developers have experience thinking in an AI-first way.

A great example is the content generation scripts that my coworker Nick wrote. These scripts create drafts of MongoDB driver documentation for languages where we have less robust documentation, based on languages where we do have comprehensive docs. For instance, creating a full documentation set for the minimally-documented Java Reactive Streams driver based on the fully-documented Node.js driver. You can see the [scripts here](https://github.com/mongodb/chatbot/tree/main/packages/mongodb-artifact-generator).

There's no reason anyone shouldn't be able to do similar work. While Nick is a senior software engineer with knowledge of AI tools, perhaps in the future a less technical user could work with an LLM-powered system to accomplish similar tasks.

You can also use the knowledge service to integrate into third-party AI platforms like ChatGPT or GitHub Copilot. Both already support third-party integrations through [custom GPTs for ChatGPT](https://openai.com/index/introducing-gpts/) and [Extensions for GitHub Copilot](https://github.blog/2024-05-21-introducing-github-copilot-extensions/). You could create a light wrapper around your knowledge API to make these integrations easy and avoid duplicating work across different platforms.

### Agentic Access

Looking forward, AI agents will likely become major consumers of knowledge services. As agents become more sophisticated, they'll need access to up-to-date, authoritative information to perform complex tasks on users' behalf.

Imagine an AI agent helping with customer onboarding that can access your product documentation, troubleshooting guides, and best practices to provide comprehensive support. Or a development agent that can reference your internal architecture decisions, coding standards, and past incident reports to make better recommendations.

As agentic capabilities improve, your knowledge infrastructure is already positioned to support these new use cases without requiring major architectural changes.

## Conclusion

Just as uranium unlocked unprecedented energy potential in the 20th century, knowledge resources are poised to fuel the AI-powered innovations of the 21st century. We're witnessing the early stages of this transformation, where curated, contextualized knowledge becomes increasingly valuable.

The use cases covered in this blog post--from RAG chatbots and in-product experiences to model training datasets and analytical NLP--represent just the beginning of a new paradigm. As AI capabilities continue advancing, the organizations that have invested in properly mining, refining, and centralizing their knowledge resources will have a significant competitive advantage.

The path forward requires both ambition and caution. Start by experimenting with knowledge-powered AI applications in low-risk environments. Build the infrastructure to centralize and standardize your knowledge resources. Create the security practices and governance frameworks to handle knowledge responsibly. And design systems with service-oriented architecture principles that can scale as AI capabilities mature.

Most importantly, begin treating knowledge resources as a strategic asset. In the generative AI era, knowledge is the new uranium. It is a resource so powerful it can transform entire industries, but one that demands careful handling and thoughtful application.