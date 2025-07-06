---
title: "Knowledge Is the New Uranium"
author: Ben Perlmutter
pubDatetime: 2024-06-26T00:00:00.000Z
slug: knowledge-is-the-new-uranium
featured: false
draft: true
tags:
  - generative-ai
# description: "TODO"
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

For many organizations, [[Retrieval-Augmented Generation|retrieval-augmented generation (RAG)]] chatbots have been the first generative AI use case to leverage their knowledge resources like documentation and code repositories. I've focused on for the past year and change on the RAG chatbot space, working on projects like the [[MongoDB Docs Chatbot]] and the [[MongoDB Chatbot Framework]].

RAG chatbots are great, and [[Why Chat is the Best Interface for LLMs (for now?)|I think they'll continue to be important for the foreseeable future]].  But knowledge resources can fuel so much more than just RAG chatbots.

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

Chatbots seem to be the dominant interface for leveraging knowledge resources with generative AI at the moment. Chatbots are great for providing relatively high value for relatively low effort. In a previous blog post, [[Why Chat is the Best Interface for LLMs (for now?)]], I explored why I think chatbots work so well right now.

With the right chatbot infrastructure, you can probably drive 10s of percents of productivity gain in most knowledge work tasks by giving someone an AI chatbot using a GPT-4+ tier model with a good system prompt and knowledge retrieval system. At MongoDB, we've started using a tool called [Credal.ai](https://www.credal.ai/) for internal chatbot with promising initial results. [[Exploring Custom GPTs|ChatGPT's custom GPTs]] are another tool for quickly spinning up custom LLM chatbots.

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

At MongoDB, we recently conducted a "[[Skunkworks]]" hackathon project to analyze our code examples for various forms of bias, like being Western-centric or perpetuating stereotypes. We used a GPT-3.5 model as a classifier, which allowed us to quickly categorize examples without having to fine-tune a pre-trained model or go through the entire model training process from scratch.

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

AI_TODO: create a section with this content. emulate the style of the previous sections closely.
- Foundational model unsupervised pretraining
	- give it your text
- generate prompt/completions based on your data using an LLM
	- use with LoRA
	- convert raw knowledge text to question and answer pairs that cover the knowledge in that text
	- can use Evol-Instruct-style techniques to create variety of different prompt completions of varying complexity
		- Evol-Instruct technique from the WizardLM paper - https://arxiv.org/abs/2304.12244 (link to this)
	- heard that approx fine-tuning on 1 billion tokens with LoRA can yield meaningful model improvements
		- i don't have a study to cite here. but this was a number that i got from both a Solutions Architect at a very big company and also ML engineer at a company developing and hosting models.

### Evaluation Datasets

- for testing foundational model and AI system performance
- variety of different techniques possible
- create large set of multiple choice questions
	- again could use Evol-Instruct-style technique to create questions of varying difficulties.
	- Create your own version of multiple-choice based benchmarks like [MMLU](https://paperswithcode.com/dataset/mmlu)
- Create just questions, or questions and model answer/success criterial
	- use Ragas-style evaluation metrics to determine 
		- link to https://docs.ragas.io/en/stable/concepts/metrics/index.html
- use to inform things like:
	- what foundational model to use
	- RAG chatbot performance
		- can be used for fine-tuning as well

### Knowledge Graphs (A  Hand-Wavey Mention)

- TODO: outline
## Knowledge Nukes and Meltdowns: Does the Metaphor Get Scary?
  
- Acknowledge the potential dangers of the uranium metaphor
    - Uranium can be used for destructive purposes, like nuclear weapons
    - Nuclear power plants can have catastrophic meltdowns if not properly managed
    - Similarly, knowledge resources and generative AI could be misused or have unintended consequences

### Knowledge Nukes

- What is a knowledge nuke?
	- using knowledge resources with generative AI for offensive purposes
	- for example, exfiltrate sensitive information from a knowledge repository or using generative ai tools powered by the knowledge resource
	- examples
		- use your knowledge base and LLM to create disinformation related to the subject matter. 
- frankly, right now i think the risk of offensive use of knowledge resources is limited. but that might be a function of:
	- my failure of imagination 
	- generative ai technologies not being powerful enough for major offensive capabilities unlocks for knowledge resources
		- worth monitoring as LLMs and other generative AI technologies become more advanced 

### Knowledge Meltdowns

- What is a knowledge meltdown?
	- unintentional leakage of knowledge resources that have negative consequences
- forms: (one short paragraph for each)
	- direct access to knowledge, say by someone who shouldn't getting access to knowledge repository with sensitive data 
	- accidentally exposing sensitive knowledge to parties who shouldn't receive it through a generative AI interface like a RAG chatbot. 
		- example: an internal HR chatbot exposes all the company's salary information when prompted correctly
	- accidentally including sensitive information in training data for an AI model
		- then if model prompted correctly, could reveal that sensitive knowledge
		- ex: if you included the source code for private repositories in  training data for LLM. then could be revealed with correct end-user prompting. 
	- AI_TODO: wrap up in a short paragraph..~2 sentences
### Secure Use of Knowledge

- Discuss the importance of responsible development and deployment
    - Just as nuclear technology requires strict safety protocols and oversight, generative AI and knowledge management need proper guidelines and governance
    - Organizations must prioritize security, privacy when working with knowledge resources and AI
	    - apply the same information security practices that would to any data plus additional generative AI considerations
		    - for example, have to worry about prompt injection
    - Especially, as we are only entering the generative AI era, we should be mindful with the knowledge resources we expose and utilize. 
- Safest thing you can do is not ingest knowledge that you don't want to be leaked
	- Just as safest thing you can do with uranium is to leave it in the ground

- At my team at MongoDB, we only touch public facing data
	- our team only uses public information, so even our knowledge repository were to be leaked, all you'd get is a cleaner version of that which you can already find in various forms on the web.
	- to be sure, it'd save some labor
		- e.g. wouldn't need to cleanly scrape web pages or transcribe some videos, but that's the extent of it

- Another approach is to just load sensitive data into context at run time.
	- don't store this knowledge in a separate location at rest in an ingested data repository. 
	- less performant, and could limit number of things that you do with the knowledge resource, but that can be a feature not a bug. 
	- for example, say you wanted to learn about an business plan document. you could load that knowledge into a chat interface and chat with it there. 
- a related intermediate approach is to only store metadata about sensitive knowledge  

- Highlight the positive potential of knowledge resources and generative AI
    - Despite the risks, nuclear technology has also brought significant benefits, such as clean energy and medical advances
    - Similarly, knowledge resources and generative AI have the potential to solve complex problems, enhance creativity, and improve people's lives
    - With proper safeguards and responsible development, the benefits can outweigh the risks

## The Knowledge Service

- A service for interacting with knowledge resources 
	- probably can take the form of a RESTful HTTPS APIin most circumstances 
- this idea follows the principles of service-oriented architecture (SOA)
	- the core idea of service oriented architecture, per AWS documentation, is that: "Each service provides a business capability, and services can also communicate with each other across platforms and languages."
	- before the rise of LLMs, there wasn't necessarily a compelling need to consolidate knowledge resources in a service. 
		- who would use it and for what? 
		- knowledge had been primarily a resource for *humans* to consume 
		- but now we have *machine* users
			- LLM powered systems
			- the training of AI models 
		- services helps accommodate the AI-powered machine use cases and facilitate human developers building these systems
			- same idea as how an organization might have a billing service that different teams could use for handling payments for different products
			- now knowledge consumption a use case 
- Knowledge API functionality includes
	- get content from the knowledge service by resource identifiers
		- ex: get all web pages' content by site
		- get single web page content by URL
	- robust search and query functionality 
		- find content even if you don't know where it exists
			- could be used to get chunks / more LLM-actionable forms of knowledge or complete knowledge resources 
	- also could include generative AI functionality within the knowledge service itself. for example, have a chat endpoint that let's users get natural language responses to their queries, perhaps based on RAG or specialized models. 
		- i did a prototype of this for the latest skunkworks hackathon. didn't thoroughly evaluate, but based on trying a few queries, it worked quite well. 
- Secure with API security best practices 
	- role-based access control (RBAC) for any sensitive information
	- prevent abuse with rate limits and authentication 
	- leverage all the other API security techniques and infrastructure that the software industry has developed over the past decades
- AI_TODO: conclusion paragraph. short. ~2 sentences

### Empower Builders

- teams who want to work with the knowledge just need to know the interface and have appropriate access
- then can do as wish, either programmtically or in batches
- building for future where AI deeply integrated in many parts of products and workflows
	- and as more developers have more experience thinking in AI-first way
	- example:
		- content generation scripts that my coworked Nick wrote
			- these scripts create drafts of MongoDB driver documentation for languages where we have less robust documentation, based on languages where we do have more robust documentation. 
				- such as creating a full documentation set for the minimally-documented Java Reactive Streams driver  based on the documentation for the fully-documented Node.js driver.
			- you can access the scripts here - https://github.com/mongodb/chatbot/tree/main/packages/mongodb-artifact-generator 
		- no reason that anyone shouldn't be able to do that
		- while nick a senior software engineer with knowledge of AI tools was able to do, maybe there's a future user who is only minimally technical could work with an LLM-powered system to make
- also use the knowledge service to integrate into 3rd-party AI platforms, like ChatGPT or Github Copilot. 
	- both of these already have support for 3rd-party integrations, [custom GPTs for ChatGPT](https://openai.com/index/introducing-gpts/) and [Extensions for Github Copilot](https://github.blog/2024-05-21-introducing-github-copilot-extensions/).
	- create a light wrapper around a knowledge API to make integration easy and not duplicative across integrations

### Agentic Access

- talk about how agents could access this knowledge to perform tasks
- TODO: flush this out

## Conclusion

AI_TOOD: how to wrap up
tie back to the new uranium idea
