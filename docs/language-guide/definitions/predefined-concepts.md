---
sidebar_position: 2
title: Predefined Concepts
---

# Predefined Concepts

In addition to concepts you define yourself, ***plain provides a set of predefined concepts that are commonly used throughout specifications. These concepts represent core elements of the specification and code generation process.

**Usage Notes:**
- These predefined concepts are available in all specifications without needing to be defined
- They can be referenced in any section of your specification
- They are particularly useful in `***implementation reqs***` and `***test reqs***` sections
- When writing requirements, you can reference these concepts to specify relationships between different parts of your specification

## Core Specification Concepts

- **`:plainDefinitions:`** - The definitions and descriptions of the concepts that are important for the system's functionality. This corresponds to the content in the `***definitions***` section.

- **`:plainImplementationReqs:`** - The implementation requirements of the system that describe the system's behavior and constraints but do not describe the system's functionality. This corresponds to the content in the `***implementation reqs***` section.

- **`:plainFunctionality:`** - The functionalities of the system that are or should be implemented in the code. This corresponds to the content in the `***functional specs***` section.

- **`:plainTestReqs:`** - The test requirements that `:ConformanceTests:` must adhere to. This corresponds to the content in the `***test reqs***` section.

## Implementation and Testing Concepts

- **`:Implementation:`** - The system implementing :plainFunctionality:.

- **`:plainImplementationCode:`** - The implementation code of `:Implementation:`.

- **`:UnitTests:`** - The unit tests that evaluate individual functionalities of the `:plainImplementationCode:`. They are automatically generated alongside the implementation code if technology used to implement unittests is provided in `implementation reqs` specification section.

- **`:ConformanceTests:`** - The conformance tests that evaluate the `:plainImplementationCode:` and its conformance to `:plainFunctionality:` specifications. They are automatically generated from the specs if technology and approach used to implement conformance test is provided in `test reqs` specification section.

## Acceptance Testing Concepts

- **`:AcceptanceTest:`** - A single acceptance test. The text of `:AcceptanceTest:` provides specific instructions on how some aspect of `:plainImplementationCode:` must be verified to confirm it conforms to the specifications. The technology used to implement acceptance tests is provided in `test reqs` specification section.

- **`:AcceptanceTests:`** - A collection of `:AcceptanceTest:` instances that validate `:plainImplementationCode:`.

## Example

```
***implementation reqs***

- :Implementation: should include :UnitTests: using Unittest framework!

***test reqs***

- :ConformanceTests: of :App: should be implemented in Python using Unittest framework.
- :ConformanceTests: must validate that :plainImplementationCode: conforms to :plainFunctionality:.
```

