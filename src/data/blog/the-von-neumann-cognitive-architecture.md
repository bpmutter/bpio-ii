---
title: "The Von Neumann Cognitive Architecture"
author: Ben Perlmutter
pubDatetime: 2024-04-10T00:00:00.000Z
slug: the-von-neumann-cognitive-architecture
featured: false
draft: false
tags:
  - generative-ai
description: "A base architecture for building cognitive apps"
---
I recently read the book [The MANIAC by Benjamin Labatut](https://www.amazon.com/MANIAC-Benjamin-Labatut/dp/0593654471), which explores the life and work of John von Neumann. It's a great book that does an excellent job exploring the genius of von Neumann's many achievements in addition to his less exemplary personal life. 

Much of the book's discussion of Von Neumann's contributions to quantum physics and theoretical mechanics has gone right over my head. When the book discussed the Von Neumann Architecture for computers, it did stick. I had already learned about the Von Neumann Architecture back in comp sci 101 over a decade(!) ago.

Somewhere in the recesses of my own neutral network, reading about Von Neumann and the computer architecture named after him connected with a subject that I have been thinking about a lot over the past year, building **cognitive apps** with large language models (LLMs).

I believe that the Von Neumann Architecture for computers is also applicable as a base architecture for cognitive apps powered by large language models.

## Cognitive Apps

Before applying the Von Neumann Architecture to cognitive apps, we must first define what a cognitive app is.

A cognitive app, as defined by LangChain's Harrison Chase in the blog post [OpenAI's Bet on a Cognitive Architecture](https://blog.langchain.dev/openais-bet-on-a-cognitive-architecture/) can be defined as, "the orchestration of an LLM application". A cognitive app is an application built around an LLM, including:

- Calling the LLM
- Managing the LLM context
- Getting input from users or other systems
- Returning output from LLMs
- Reasoning about what action to take next

In Harrison's blog post, he describes a couple of different architectures for cognitive apps, with various levels of application code in the loop:

![Pasted image 20231204210814.png](https://blog.langchain.dev/content/images/size/w1600/2023/11/Screenshot-2023-11-27-at-8.22.59-PM.png)

The post then goes on to focus on what OpenAI is doing to create "Agent" type cognitive apps, where the LLM is doing most of the heavy lifting, with a light layer of glue code. 

In my post, however, I want to focus on the definition of a cognitive architecture, and how we can apply concepts from the Von Neumann Architecture for computers to create an architectural definition for cognitive apps.

## The Von Neumann Architecture for Computers

Here's a brief overview of the core components of the Von Neumann Architecture for computers. A computer built with the Von Neumann Architecture has the following components:

|Component|Description|
|---|---|
|Processing Unit (CPU)|The brain of the computer where calculations and logical operations are performed. The CPU contains the arithmetic logic unit and control unit for performing operations. |
|Memory|Stores both data and instructions for the CPU. In von Neumann architecture, program instructions and data share the same memory space.<br><br>A very important part of the memory component of Von Neumann architected computers is that instructions for computations are stored in memory alongside the data. This means the computer can be reprogrammed for different tasks without physical modifications.|
|Input|Allow the computer to communicate with the external world, receiving input from devices like keyboards.|
|Output|Allow the computer to communicate with the external world, sending output to displays or other devices.|
|Bus System|This is a communication system that transfers data between the CPU, memory, and input/output devices. It ensures that the various parts of the computer can communicate effectively.|

Diagram of the Von Neumann Architecture:

![von neumann architecture diagram](@/assets/images/Screenshot_2024-04-10_at_4.01.08_PM.png)

There's *a lot* of info around the web (and in the weights of your LLM of choice) about the Von Neumann architecture, so I won't go into much detail here or risk saying something incorrect about it. (It has been 10 years since I studied the Von Neumann architecture formally, after all.)

## Mapping the Von Neumann Architecture to Cognitive Apps

We can use the same general architecture to design LLM-powered cognitive apps. Any cognitive app can have the following structure:

|LLM Agent<br/>Component|Von Neumann<br>Component|Description|
|---|---|---|
|Reasoning Engine(LLM)|Processing Unit (CPU)|The brain of the app where responses, logical operations, and tool calls are performed. Currently, large language models serve as the reasoning engine of apps.|
|Context Window|Memory|Stores both data and instructions for the LLM. In the cognitive app architecture, program instructions and data share the same context window.|
|Input|Input|Allow the external world to communicate with the app, receiving input like images or text. This input is used to generate context for the LLM.|
|Output|Output|Allow the cognitive app to communicate with the external world, sending output to displays or other devices. Currently, LLMs only output text. Any other form of output would need to be mapped from text using application logic. |
|Application Logic|Bus System|Standard application code (JavaScript, Python, etc.) that transfers data between the reasoning engine, context window, and model input/outputs. The application logic also can execute logic corresponding to a tool call. The application logic ensures that the various parts of the cognitive app communicate effectively.|

Diagram of the Von Neumann Cognitive Architecture: 

![von neumann cognitive architecture diagram](@/assets/images/Screenshot_2024-04-10_at_4.02.40_PM.png)

## Extending the Von Neumann Cognitive Architecture

Starting from this base metaphor of applying the Von Neumann architecture to cognitive apps, we can extend it to think about building more complex cognitive apps. A lot of the same concepts that make computers modeled on the Von Neumann Architecture so powerful can also be extended to cognitive apps. 

In the video [Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g), Andrej Karpathy discusses what he calls the "LLM OS": 

![karpathy llm os](@/assets/images/IMG_1756.png)

In this model, the LLM acts as an orchestrator, generating responses and calling tools like web browsing and image generation, in response to input. 

We can map ideas used to improve computers using the Von Neumann architecture to cognitive apps, including:

- Instruction sets and programming languages: Developing standard instruction sets and prompt formats that LLMs are optimized to perform well with. 
- Resource management: Systems to move information into and out of the context window.
- Parallel processing: Have LLM execute multiple requests in parallel to derive an outcome.

The potential conceptual mapping from traditional Von Neumann-architected computers to cognitive apps could go on and on, taking advantage of the last 75 years of developments in computing system design. 

We're in the earliest days of Von Neumann cognitive apps and there remains so much to be discovered. However, the immense potential is clear. 

Just as the Von Neumann architecture provided the conceptual framework for the computing revolution of the 20th century, the Von Neumann-inspired cognitive architecture can serve as a foundational paradigm for the next generation of AI-powered cognitive applications.
