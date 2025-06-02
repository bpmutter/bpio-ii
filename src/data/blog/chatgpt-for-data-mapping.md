---
title: "ChatGPT for Data Mapping"
author: Ben Perlmutter
pubDatetime: 2023-05-19T01:00:00.000Z
slug: chatgpt-for-data-mapping
featured: false
draft: false
tags:
  - generative-ai
description: "One of my current favorite use cases for ChatGPT"
---
One high value use case that I’ve found for ChatGPT in my daily workflow is for **data mapping**.

What I mean by data mapping is transforming data from one representation to another. I’be been doing this in 2 main ways:

- Convert data from one representation to another. For example, turning data from a JSON object to a Python map.
- Interpret the schema of data from instances of the data type. For example, creating a JSON schema from an instance or couple of instances of a JSON object.

The rest of this post explains how to do these forms of data mapping and how they’ve been useful to me.

## Interpret the Schema of Data

I’m a technical writer at a database company (MongoDB), where I work on documenting SDKs and drivers. This means I have to take the representation of objects in the database, and then convert them to an SDK/driver, or vice versa.

For example, right now I’m working on a documenting a new Kotlin driver for MongoDB. Often I’ll have to show how to represent a MongoDB database document, which is in a flexible format called BSON (and very similar to JSON), in a Kotlin data class.

Here’s a MongoDB document that I had to map to a Kotlin data class today:

```json
{
  "year" : 2018,
  "type" : "even number but not a leap year",
  "temperatures" : [
    { "month" : "January", "avg" : 9.765 },
    { "month" : "February", "avg" : 9.675 },
    { "month" : "March", "avg" : 10.004 },
    { "month" : "April", "avg" : 9.983 },
    { "month" : "May", "avg" : 9.747 },
    { "month" : "June", "avg" : 9.65 },
    { "month" : "July", "avg" : 9.786 },
    { "month" : "August", "avg" : 9.617 },
    { "month" : "September", "avg" : 9.51 },
    { "month" : "October", "avg" : 10.042 },
    { "month" : "November", "avg" : 9.452 },
    { "month" : "December", "avg" : 9.86 }
  ]
}
```

I didn’t want to think about what the Kotlin data class would be, so I gave ChatGPT the following prompt:

````
take the following JSON object and create the equivalent Kotlin data class:

```json
{
  "year" : 2018,
  "type" : "even number but not a leap year",
  "temperatures" : [
    { "month" : "January", "avg" : 9.765 },
    { "month" : "February", "avg" : 9.675 },
    { "month" : "March", "avg" : 10.004 },
    { "month" : "April", "avg" : 9.983 },
    { "month" : "May", "avg" : 9.747 },
    { "month" : "June", "avg" : 9.65 },
    { "month" : "July", "avg" : 9.786 },
    { "month" : "August", "avg" : 9.617 },
    { "month" : "September", "avg" : 9.51 },
    { "month" : "October", "avg" : 10.042 },
    { "month" : "November", "avg" : 9.452 },
    { "month" : "December", "avg" : 9.86 }
  ]
}
```

create the equivalent kotlin data class:

```kt
ADD_EXAMPLE_HERE
```

CODE ONLY!!
````

ChatGPT gave me an output like:

```kt
data class YearlyTemperature(
  val year: Int,
  val type: String,
  val temperatures: List<MonthlyTemperature>
)

data class MonthlyTemperature(
  val month: String,
  val avg: Double
)
```

This wasn’t exactly what I wanted, but pretty close. I then refactored the ChatGPT output to:

```kt
data class YearlyTemperature(
        @BsonId val id: ObjectId,
        val year: Int,
        val type: String,
        val temperatures: List<MonthlyTemperature>
    ) {
        data class MonthlyTemperature(
            val month: String,
            val avg: Double
        )
    }
```

And just like that, the I had the data class that I needed in just a few minutes.

Now this wasn’t very difficult, and probably wouldn’t have taken me much longer to do manually. But this paradigm saves some drudgery and works well for larger classes or many classes, so can save a fair bit of time and mental overhead.

Other places where this approach could be useful include:

- Generating JSON schema from JSON data
- Generating protobuf equivalents of native data types
- Generating TypeScript types from untyped JavaScript

## Convert Data from One Representation to Another

Relatedly, once you’ve got the schema for the data in the new format, you can use ChatGPT to convert instances of the data to that new format.

To continue with the above example, I’ve been using this pattern to convert example BSON documents to their Kotlin data class representation to use in code examples.

So, say I have the following BSON document that I want to represent in Kotlin:

```json
{
  "year" : 2018,
  "type" : "even number but not a leap year",
  "temperatures" : [
    { "month" : "January", "avg" : 9.765 },
    { "month" : "February", "avg" : 9.675 },
    { "month" : "March", "avg" : 10.004 },
    { "month" : "April", "avg" : 9.983 },
    { "month" : "May", "avg" : 9.747 },
    { "month" : "June", "avg" : 9.65 },
    { "month" : "July", "avg" : 9.786 },
    { "month" : "August", "avg" : 9.617 },
    { "month" : "September", "avg" : 9.51 },
    { "month" : "October", "avg" : 10.042 },
    { "month" : "November", "avg" : 9.452 },
    { "month" : "December", "avg" : 9.86 }
  ]
}
```

That would be a tedious few minutes to convert to Kotlin manually. Instead, I can use the following ChatGPT prompt:

````
convert the following object to the YearlyTemperature data class:

```json
{
  "year" : 2018,
  "type" : "even number but not a leap year",
  "temperatures" : [
    { "month" : "January", "avg" : 9.765 },
    { "month" : "February", "avg" : 9.675 },
    { "month" : "March", "avg" : 10.004 },
    { "month" : "April", "avg" : 9.983 },
    { "month" : "May", "avg" : 9.747 },
    { "month" : "June", "avg" : 9.65 },
    { "month" : "July", "avg" : 9.786 },
    { "month" : "August", "avg" : 9.617 },
    { "month" : "September", "avg" : 9.51 },
    { "month" : "October", "avg" : 10.042 },
    { "month" : "November", "avg" : 9.452 },
    { "month" : "December", "avg" : 9.86 }
  ]
}
```

kotlin data class:

```kt
data class YearlyTemperature(
        @BsonId val id: ObjectId,
        val year: Int,
        val type: String,
        val temperatures: List<MonthlyTemperature>
    ) {
        data class MonthlyTemperature(
            val month: String,
            val avg: Double
        )
    }
```

CODE ONLY!
````

ChatGPT outputs the following:

```kt
val yearlyTemperature = YearlyTemperature(
    id = ObjectId(),
    year = 2018,
    type = "even number but not a leap year",
    temperatures = listOf(
        YearlyTemperature.MonthlyTemperature("January", 9.765),
        YearlyTemperature.MonthlyTemperature("February", 9.675),
        YearlyTemperature.MonthlyTemperature("March", 10.004),
        YearlyTemperature.MonthlyTemperature("April", 9.983),
        YearlyTemperature.MonthlyTemperature("May", 9.747),
        YearlyTemperature.MonthlyTemperature("June", 9.65),
        YearlyTemperature.MonthlyTemperature("July", 9.786),
        YearlyTemperature.MonthlyTemperature("August", 9.617),
        YearlyTemperature.MonthlyTemperature("September", 9.51),
        YearlyTemperature.MonthlyTemperature("October", 10.042),
        YearlyTemperature.MonthlyTemperature("November", 9.452),
        YearlyTemperature.MonthlyTemperature("December", 9.86)
    )
)
```

Again a few minutes saved! Now, imagine doing that with quite a few documents, and you could have a real productivity win.

## Generalizable Prompt Templates You Can Use

If you want to bring these strategies into your work flow, try out the following prompts.

For schema generation:

````
take the following {{input data}} and create the equivalent {{data schema}}:

{{input data to create schema from}}: 

```{{input data language}}

```

create the equivalent {{output data format}}:

```{{output schema language}}
ADD_EXAMPLE_HERE
```

CODE ONLY!!
````

For conversion:

````
convert the following data to the {{output data format}}:

```
{{ Add data to convert here }}
```

{{output data format}}:

```kt
{{schema for output data format}}
```

CODE ONLY!
````

## Conclusion

That’s all folks. These 2 forms of data mapping with ChatGPT Plus have been saving me a few hours of drudgery each week on my current work. I don’t imagine that every technical writer or software engineer will need to do as much data mapping as I’ve been doing recently, but if you are, you got a real powerful time saver in ChatGPT.