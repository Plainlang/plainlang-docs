---
sidebar_position: 6
title: Acceptance Tests
---

# Acceptance Tests

Acceptance tests are nested under individual functional requirements. They specify how to verify that the requirement has been correctly implemented.

**Key Points:**
- Acceptance tests are indented under their parent functional requirement
- Each test should be specific and verifiable
- Tests can reference defined concepts
- Tests should focus on observable behavior
- Acceptance tests extend [conformance tests](./definitions/predefined-concepts). The acceptance tests are implemented according to the [`***test reqs***`](./test-reqs) specification (see below).


## Syntax

```
***functional specs***

- Functional requirement description

  ***acceptance tests***

  - Test criterion 1
  - Test criterion 2
  - Test criterion 3
```

## Example

```
***functional specs***

- Display "hello, world"

  ***acceptance tests***

  - :App: should exit with status code 0 indicating successful execution.
  - :App: should complete execution in under 1 second.
```
