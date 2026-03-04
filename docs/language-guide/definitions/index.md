---
sidebar_position: 2
title: Definitions
---

# Definitions

The definitions section declares [concepts](./concept-notation) that will be used throughout the specification.

Here's an example of a simple definiton.

```plain
- :App: implements a task manager application.
```

In this case, the concept name is `:App:`. Concepts are important for refering to definitions in the rest of the specification.

**Key Points:**
- Define all concepts before using them in other sections
- Concepts can reference other concepts using the [concept notation](./concept-notation)
- Attributes and constraints can be specified as nested bullet points
- Imported modules may provide additional definitions.

In addition to concepts you define yourself, ***plain provides a set of [predefined concepts](./predefined-concepts) that are commonly used throughout specifications.


## Syntax

```
***definitions***

- :ConceptName: is a description of the concept.
  - Additional details or attributes can be nested
  - Multiple attributes can be listed

- :AnotherConcept: description with attributes:
  - Attribute 1 - description
  - Attribute 2 - description
```

## Rules Governing Definitions

While providing definitions, you should adhere to the following 4 rules:

- Every definition must start with the name of the concept you are defining.
- Concept names must be globally unique (meaning, you cannot provide two definitions with the same concept name).
- When referencing concepts in ***test reqs***, ***functional specs***, ***implementation reqs*** and ***acceptance tests***, the concept name must exist in the ***definitions*** section.
- Imported modules may provide additional concept definitions

### Examples 

Definitions are the mechanism for definining data structures in ***plain. Here's an example how concepts could be defined for a task manager application.

```plain
***definitions***

- :App: is a console application.

- :User: is the user of :App:

- :Task: describes an activity that needs to be done by :User:. :Task: has the following attributes:
  - Name - a short description of :Task:. This is a required attribute.
  - Notes - additional details about :Task:
  - Due Date - optional date by which :User: is supposed to complete :Task:.

- :TaskList: is a list of :Task: items.
  - Initially :TaskList: should be empty.
```