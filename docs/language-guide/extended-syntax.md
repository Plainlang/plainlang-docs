---
sidebar_position: 7
title: Extended syntax
---

# Extended Syntax

## YAML Frontmatter

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

### `import` Section

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

### `requires` Section

The `requires:` section specifies dependencies on other modules that must be built before this specification. Unlike `import:`, required modules can contain functional specifications and represent complete software modules.

**Example:**
```yaml
requires:
  - authentication-module
  - database-layer
```

Use `requires:` when your specification depends on functionality implemented in other modules that need to be generated first.

## Comments

Lines starting with `>` are ignored when rendering software code.

```plain
> This is an example of a comment in ***plain
```

## Template System

***plain supports template inclusion using the `{% include %}` syntax, which allows you to use predefined templates in your specifications.

```plain
{% include "python-console-app-template.plain", main_executable_file_name: "my_app.py" %}
```
Predefined templates are available for Go console apps, Python console apps, and TypeScript React apps in the [standard template library](https://github.com/Codeplain-ai/codeplain/tree/main/standard_template_library). You can also create your own custom templates.

The template system enables code reuse and standardization across ***plain projects.

## Linked Resources

Specifications can reference external files for detailed UI specifications or other documentation.

Here's an example of a linked resource (see Task manager example application for the full specification).

```
- :User: should be able to add :Task:. The details of the user interface
  are provided in the file [task_modal_specification.yaml](task_modal_specification.yaml).
```

If you include a link using the markdown syntax, the linked resource will be passed along with the ***plain specification to the renderer.

**Important Notes:**
- Only links to files in the same folder (and its subfolders) as the ***plain specification are supported. Links to external resources are not supported.
- File paths are resolved relative to the location of the ***plain specification file.
- All types are supported, except binary files.

## Liquid templates

***plain supports Liquid templates. Liquid is an open-source template language created by Shopify (https://shopify.github.io/liquid/).
