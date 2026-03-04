---
sidebar_position: 3
title: Implementation Reqs
---

# Implementation Reqs

The implementation reqs section specifies non-functional requirements about how the software should be implemented. These include technology choices, architectural constraints, coding standards, and other implementation details.

**Key Points:**
- Specifies HOW to build the software, not WHAT it should do
- Common uses: language choice, framework selection, naming conventions
- Can reference concepts from the definitions section
- Often imported from template modules

## Syntax

```
***implementation reqs***

- Implementation constraint or requirement

- Another implementation detail
```

## Example

```
***implementation reqs***

- :Implementation: should be in Python.

- :MainExecutableFile: of :App: should be called "hello_world.py".

- :Implementation: should include :Unittests: using Unittest framework!
```
