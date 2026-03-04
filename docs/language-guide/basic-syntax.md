---
sidebar_position: 1
title: Basic syntax
---

# Basic syntax

## About ***plain programming language

***plain is a novel programming language that helps abstracting away complexity of using large language models for code generation.

***plain specification is rendered to software code that can be executed. You can therefore think of ***plain as *executable specification*.

## Syntax

***plain language is structured English based on markdown syntax.

Here's an example of a "hello, world" program in ***plain.

```plain
***implementation reqs***

- :Implementation: should be in Python.

***functional specs***

- Display "hello, world"
```

## Specifications

There are four types of specifications:

- `***definitions***`
- `***implementation reqs***`
- `***test reqs***`
- `***functional specs***`

Every plain source file requires at least one functional spec and an associated implementation req.

Functional specs must reside in leaf sections while other specifications can be placed also in non-leaf sections. Specifications in non-leaf sections apply not just to the section itself but to all of its subsections.

### Definitions

The `***definitions***` specification is a list of definitions of new concepts.

Here's an example of a simple definiton.

```plain
- :App: implements a task manager application.
```

In this case, the concept name is `:App:`. Concepts are important for refering to definitions in the rest of the specification.

See [Definitons](./definitons.md) for more information.

### Implementation Reqs

The `***implementation reqs***` specification is a list of instructions that steer software code implementation and provide details of execution environment.

Here's an example of a simple instruction specifying only that the ***plain specification should be rendered to Python software code.

```plain
- :Implementation: should be in Python.
```

The instructions should be provided in natural language. There are no restrictions on the form or the complexity of the instruction except that they need to be given as a markdown list.

Here's an example of more complex instructions.

```plain
- :Implementation: of :App: should be in Python.

- :Implementation: should include unit tests using Unittest framework.

- The main executable file of :App: should be called hello_world.py
```

### Test Reqs

The `***test reqs***` specification is a list of instructions that steer implementation of conformance tests and provide details of testing environment.

**Conformance tests** is the generated code used to verify that the functional spec is implemented according to the specification.

Here's an example specification of test reqs.

```plain
- :ConformanceTests: of :App: should be implemented in Python using Unittest framework.
```

### Functional Specs

The `***functional specs***` specification provides a description of functionality that should be rendered to software code. The descriptions should be provided in natural language as a markdown list.

Here's an example of a simple description of the functionality of the "hello, world" application.

```plain
- Display "hello, world"
```

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

Functional specs are rendered incrementally one by one. Consequently earlier functional specs cannot reference later functional specs.

### Acceptance Tests

Acceptance tests can be used to further refine the functional spec and especially to incorporate constraints on the implementation.

Acceptance tests are specified with a keyword `***acceptance tests***` as a subsection within `***functional specs***` section. Each acceptance tests must be an item in a list.

Here's an example of a "Hello, World" application with one acceptance test.

```plain
***functional specs***

- Display "hello, world"

  ***acceptance tests***

  - :App: shouldn't show logging output in the console output (neither in stdout nor stderr).
```

Acceptance tests extend **conformance tests**. The acceptance tests are implemented according to the ***test reqs*** specification (see below).
