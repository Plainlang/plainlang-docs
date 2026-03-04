---
sidebar_position: 4
title: Test Reqs
---

# Test Reqs

The test reqs section specifies requirements for conformance testing. This section describes how the generated code should be tested, including test frameworks, execution methods, and testing constraints. 

**Note that `***test reqs***` are only used when writing and fixing conformance tests and do not have an impact on writing and fixing unit tests.**

**Key Points:**
- Specifies how conformance tests should be structured and executed
- Defines the testing framework and conventions
- Often imported from template modules
- Provides context for test execution environment

## Syntax

```
***test reqs***

- Testing requirement or constraint

- Test execution detail
```

## Example

```
***test reqs***

- :ConformanceTests: of :App: should be implemented in Python using Unittest framework.

- :ConformanceTests: will be run using "python -m unittest discover" command.

- :ConformanceTests: must be implemented and executed - do not use unittest.skip().

- The current working directory contains :MainExecutableFile:.

- :App: can be executed using the command "python :MainExecutableFile:".
```

