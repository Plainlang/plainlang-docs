---
sidebar_position: 8
title: Best Practices
---

# Best Practices

1. **Start with Imports**: Import relevant templates before defining your own concepts
2. **Define Before Use**: Always define concepts in `***definitions***` before using them
3. **Be Specific**: Write clear, testable requirements in functional specs
4. **Use Acceptance Tests**: Add acceptance tests for requirements that need verification
5. **Leverage Templates**: Use the standard template library for common patterns
6. **Keep It Simple**: Plain specifications should be readable by both humans and AI
7. **Reference Concepts Consistently**: Use [concept notation](./definitions/concept-notation) to disambiguate key concepts

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
