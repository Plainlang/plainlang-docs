---
sidebar_position: 1
title: Concept Notation
---

# Concept Notation

Concepts are the [building blocks of plain specifications](/docs/whitepapers/on-the-concept-of-concept). They are written between colons:

```
:ConceptName:
```

## Rules Governing Concepts

- Each concept name must be enclosed in colons (`:`) at both the beginning and end.
- Valid characters for concept name include: Plus sign (`+`), Minus sign (`-`), Dot sign (`.`), Digits (`0`-`9`), Uppercase letters (`A`-`Z`), Underscore (`_`), Lowercase letters (`a`-`z`)
  - Examples: `:App:`, `:Tasks:`, `:ListOfUsers:`, `:CLI:`.
- Concepts can reference other concepts in their definitions

In addition to concepts you define yourself, ***plain provides a set of [predefined concepts](./predefined-concepts) that are commonly used throughout specifications.

## Example usage

```
- :User: should be able to add :Task: to :TaskList:
```
