---
sidebar_position: 2
---

# ***plain Language Reference

***plain is a specification language designed for writing software requirements in a clear, structured format. This document describes the structure and syntax of `.plain` specification files.

## File Structure

A `.plain` file consists of an optional YAML frontmatter section followed by several standardized sections marked with `***section name***` headers.

### YAML Frontmatter

The frontmatter is enclosed between `---` markers and can contain:

```yaml
---
description: "Optional description of this specification"
import:
  - module-name-1
  - module-name-2
requires:
  - dependency-module-1
  - dependency-module-2
---
```

#### `import:` Section

The `import:` section is used to include definitions, implementation requirements, and test requirements from other modules or templates. Imported modules should **not** contain functional specifications - they only provide reusable definitions and constraints.

**Example:**
```yaml
import:
  - typescript-react-app-template
```

Common use cases:
- Importing language-specific templates (e.g., `python-console-app-template`)
- Importing shared concept definitions
- Importing implementation and testing conventions

#### `requires:` Section

The `requires:` section specifies dependencies on other modules that must be built before this specification. Unlike `import:`, required modules can contain functional specifications and represent complete software modules.

**Example:**
```yaml
requires:
  - authentication-module
  - database-layer
```

Use `requires:` when your specification depends on functionality implemented in other modules that need to be generated first.

## Specification Sections

### `***definitions***`

The definitions section declares concepts that will be used throughout the specification. Concepts are enclosed in colons (`:ConceptName:`). Any concept used in the specifications must be defined in the `***definitions***` section. The definitions from the imported modules are also taken into account.

**Syntax:**
```
***definitions***

- :ConceptName: is a description of the concept.
  - Additional details or attributes can be nested
  - Multiple attributes can be listed

- :AnotherConcept: description with attributes:
  - Attribute 1 - description
  - Attribute 2 - description
```

**Example:**
```
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

**Key Points:**
- Define all concepts before using them in other sections
- Concepts can reference other concepts using the `:ConceptName:` notation
- Attributes and constraints can be specified as nested bullet points
- Imported modules may provide additional definitions.

### `***functional specs***`

The `***functional specs***` section describes what the functionalities of the software. Each bullet point represents a functionality that will be implemented.

**Syntax:**
```
***functional specs***

- Requirement description using :Concepts: defined above

- Another requirement
```

**Example:**
```
***functional specs***

- Display "hello, world"

- :User: should be able to add :Task:. Only valid :Task: items can be added.

- :User: should be able to delete :Task:

- :User: should be able to edit :Task:

- :User: should be able to mark :Task: as completed.

- Show :TaskList:
```

**Key Points:**
- Each bullet point should describe a single piece of functionality
- Use defined concepts (`:ConceptName:`) to maintain consistency
- Keep requirements clear and testable
- Complex requirements can reference external specification files

### `***acceptance tests***`

Acceptance tests are nested under individual functional requirements. They specify how to verify that the requirement has been correctly implemented.

**Syntax:**
```
***functional specs***

- Functional requirement description

  ***acceptance tests***

  - Test criterion 1
  - Test criterion 2
  - Test criterion 3
```

**Example:**
```
***functional specs***

- Display "hello, world"

  ***acceptance tests***

  - :App: should exit with status code 0 indicating successful execution.
  - :App: should complete execution in under 1 second.
```

**Key Points:**
- Acceptance tests are indented under their parent functional requirement
- Each test should be specific and verifiable
- Tests can reference defined concepts
- Tests should focus on observable behavior

### `***implementation reqs***`

The implementation reqs section specifies non-functional requirements about how the software should be implemented. These include technology choices, architectural constraints, coding standards, and other implementation details.

**Syntax:**
```
***implementation reqs***

- Implementation constraint or requirement

- Another implementation detail
```

**Example:**
```
***implementation reqs***

- :Implementation: should be in Python.

- :MainExecutableFile: of :App: should be called "hello_world.py".

- :Implementation: should include :Unittests: using Unittest framework!
```

**Key Points:**
- Specifies HOW to build the software, not WHAT it should do
- Common uses: language choice, framework selection, naming conventions
- Can reference concepts from the definitions section
- Often imported from template modules

### `***test reqs***`

The test reqs section specifies requirements for conformance testing. This section describes how the generated code should be tested, including test frameworks, execution methods, and testing constraints. 

**Note that `***test reqs***` are only used when writing and fixing conformance tests and do not have an impact on writing and fixing unit tests.**

**Syntax:**
```
***test reqs***

- Testing requirement or constraint

- Test execution detail
```

**Example:**
```
***test reqs***

- :ConformanceTests: of :App: should be implemented in Python using Unittest framework.

- :ConformanceTests: will be run using "python -m unittest discover" command.

- :ConformanceTests: must be implemented and executed - do not use unittest.skip().

- The current working directory contains :MainExecutableFile:.

- :App: can be executed using the command "python :MainExecutableFile:".
```

**Key Points:**
- Specifies how conformance tests should be structured and executed
- Defines the testing framework and conventions
- Often imported from template modules
- Provides context for test execution environment

## Concept Notation

Concepts are the building blocks of plain specifications. They are written between colons:

```
:ConceptName:
```

**Rules:**
- Concept names should be capitalized (e.g., `:App:`, `:User:`, `:TaskList:`)
- Concepts must be defined in the `***definitions***` section before use
- Concepts can reference other concepts in their definitions
- Imported modules may provide additional concept definitions

**Example usage:**
```
- :User: should be able to add :Task: to :TaskList:
```

## Predefined Concepts

In addition to concepts you define yourself, ***plain provides a set of predefined concepts that are commonly used throughout specifications. These concepts represent core elements of the specification and code generation process.

### Core Specification Concepts

- **`:plainDefinitions:`** - The definitions and descriptions of the concepts that are important for the system's functionality. This corresponds to the content in the `***definitions***` section.

- **`:plainImplementationReqs:`** - The implementation requirements of the system that describe the system's behavior and constraints but do not describe the system's functionality. This corresponds to the content in the `***implementation reqs***` section.

- **`:plainFunctionality:`** - The functionalities of the system that are or should be implemented in the code. This corresponds to the content in the `***functional specs***` section.

- **`:plainTestReqs:`** - The test requirements that `:ConformanceTests:` must adhere to. This corresponds to the content in the `***test reqs***` section.

### Implementation and Testing Concepts

- **`:plainImplementationCode:`** - The implementation code of the system that should implement `:plainFunctionality:`.

- **`:UnitTests:`** - The unit tests that evaluate individual functionalities of the `:plainImplementationCode:`.

- **`:ConformanceTests:`** - The conformance tests that evaluate the `:plainImplementationCode:` and its conformance to `:plainFunctionality:` specifications.

### Acceptance Testing Concepts

- **`:AcceptanceTest:`** - A single acceptance test. The text of `:AcceptanceTest:` provides specific instructions on how some aspect of `:plainImplementationCode:` must be verified to confirm it conforms to the specifications.

- **`:AcceptanceTests:`** - A collection of `:AcceptanceTest:` instances that validate `:plainImplementationCode:`.

**Usage Notes:**
- These predefined concepts are available in all specifications without needing to be defined
- They can be referenced in any section of your specification
- They are particularly useful in `***implementation reqs***` and `***test reqs***` sections
- When writing requirements, you can reference these concepts to specify relationships between different parts of your specification

**Example:**
```
***implementation reqs***

- :Implementation: should include :UnitTests: using Unittest framework!

***test reqs***

- :ConformanceTests: of :App: should be implemented in Python using Unittest framework.
- :ConformanceTests: must validate that :plainImplementationCode: conforms to :plainFunctionality:.
```

## External File References

Specifications can reference external files for detailed UI specifications or other documentation:

```
- :User: should be able to add :Task:. The details of the user interface
  are provided in the file [task_modal_specification.yaml](task_modal_specification.yaml).
```

## Best Practices

1. **Start with Imports**: Import relevant templates before defining your own concepts
2. **Define Before Use**: Always define concepts in `***definitions***` before using them
3. **Be Specific**: Write clear, testable requirements in functional specs
4. **Use Acceptance Tests**: Add acceptance tests for requirements that need verification
5. **Leverage Templates**: Use the standard template library for common patterns
6. **Keep It Simple**: Plain specifications should be readable by both humans and AI
7. **Reference Concepts Consistently**: Use `:ConceptName:` notation throughout

## Complete Example

```plain
---
description: "Task Manager Application"
import:
  - python-console-app-template
---

***definitions***

- :User: is the user of :App:

- :Task: describes an activity that needs to be done by :User:. :Task: has:
  - Name - a short description (minimum 3 characters, required)
  - Notes - additional details (optional)
  - Due Date - completion deadline (optional)

- :TaskList: is a list of :Task: items.
  - Initially :TaskList: should be empty.

***implementation reqs***

- :MainExecutableFile: of :App: should be called "taskmgr.py".

***functional specs***

- :User: should be able to add :Task:. Only valid :Task: items can be added.

- :User: should be able to delete :Task:

- :User: should be able to edit :Task:

- :User: should be able to mark :Task: as completed.

- Show :TaskList:
```

## Additional Resources

- Standard Template Library: https://github.com/Codeplain-ai/codeplain/tree/main/standard_template_library
- Example specifications: See the `examples/` directory in this repository
