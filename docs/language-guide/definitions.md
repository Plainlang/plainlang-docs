---
sidebar_position: 2
title: Definitions
---

# Definitions

The `***definitions***` specification is a list of definitions of new concepts.

Here's an example of a simple definiton.

```plain
- :App: implements a task manager application.
```

In this case, the concept name is `:App:`. Concepts are important for refering to definitions in the rest of the specification.

## Rules Governing Definitions

While providing definitions, you should adhere to the following 4 rules:

- Every definition must start with the name of the concept you are defining.
- Each concept name must be enclosed in colons (`:`) at both the beginning and end.
  - Valid characters for concept name include: Plus sign (`+`), Minus sign (`-`), Dot sign (`.`), Digits (`0`-`9`), Uppercase letters (`A`-`Z`), Underscore (`_`), Lowercase letters (`a`-`z`)
  - Examples: `:App:`, `:Tasks:`, `:ListOfUsers:`, `:CLI:`.
- Concept names must be globally unique (meaning, you cannot provide two definitions with the same concept name).
- When referencing concepts in ***test reqs***, ***functional specs***, ***implementation reqs*** and ***acceptance tests***, the concept name must exist in the ***definitions*** section.

## Reserved Concetps

Furthermore, there are special concepts that are already defined and are ready to use. They should not be redefined but they can be used in user's specs:

- `:plainDefinitions:` - These are the definitions and descriptions of the concepts that are important for the system's functionality. The definitions are specified in `definition` specification section.
- `:plainImplementationReqs:` - These are the implementation requirements of the system that describe the system's behavior and constraints but do not describe the system's functionality. The implementation requirements are specified in `implementation reqs` specification section.
- `:plainTestReqs:` - These are the test requirements that `:ConformanceTests:` must adhere to. The test requirements are specified in `implementation reqs` specification section.
- `:plainFunctionality:` - These are the functionalities of the system that are or should be implemented in the code. The functionality is specified in `functional specs` specification section.

- `:plainImplementationCode:` - This is the implementation code of the system that should implement `:plainFunctionality:`.
- `:UnitTests:` - These are the unit tests that evaluate individual functionalities of the `:plainImplementationCode:`. They are automatically generated alongside the implementation code if technology used to implement unittests is provided in `implementation reqs` specification section.
- `:ConformanceTests:` - The conformance tests evaluate conformance of `:plainImplementationCode:` with `:plainFunctionality:` specifications. They are automatically generated from the specs if technology and approach used to implement conformance test is provided in `test reqs` specification section.
- `:AcceptanceTest:` - The text of the acceptance test provides specific instructions how some aspect of `:plainImplementationCode:` should be verified if it conforms to `:plainFunctionality:` specifications. The technology used to implement acceptance tests is provided in `test reqs` specification section.
- `:AcceptanceTests:` - These are a collection of `:AcceptanceTest:` instances that validate `:plainImplementationCode:`.

## Examples 

Definitions are the mechanism for definining data structures in ***plain. Here's an example of two definitions.

```plain
- :User: is a person who uses the application.

- :Task: describes an activity that needs to be done by :User:. :Task: has the following attributes:
  - Name - a short description of :Task:. This is a required attribute. The name must be at least 3 characters long.
  - Notes - additional details about :Task:
  - Due Date - optional date by which :User: is supposed to complete :Task:.
```