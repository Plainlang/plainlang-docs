---
sidebar_position: 5
title: Functional Specs
---

# Functional Specs

The `***functional specs***` section describes what the functionalities of the software. Each bullet point represents a functionality that will be implemented.

**Key Points:**
- Each bullet point should describe a single piece of functionality
- Use defined concepts (`:ConceptName:`) to maintain consistency
- Keep functional specs clear and testable
- Functional specs can reference external specification files
- Functional specs are rendered incrementally one by one. Consequently earlier functional specs cannot reference later functional specs.
- Each functional spec must be [limited in complexity](#complexity-limit)


## Syntax

```
***functional specs***

- Requirement description using :Concepts: defined above

- Another requirement
```

## Complexity Limit

Each functional spec must be limited in complexity. For example, for the functional spec

```plain
- :App: should implement a task manager application.
```

the renderer of ***plain source to software code should respond with

```
Functional spec too complex!
```

In such case you need to break down the functioanlity into smaller, less-complex functional specs.

Here's an example how to do such a break down in the case of a task manager application.

```plain
- Implement the entry point for :App:.

- Show :Task: List.

- :User: should be able to add :Task:. Only valid :Task: items can be added.

- :User: should be able to delete :Task:.

- :User: should be able to edit :Task:.

- :User: should be able to mark :Task: as completed.
```


## Example

```
***functional specs***

- Display "hello, world"

- :User: should be able to add :Task:. Only valid :Task: items can be added.

- :User: should be able to delete :Task:

- :User: should be able to edit :Task:

- :User: should be able to mark :Task: as completed.

- Show :TaskList:
```