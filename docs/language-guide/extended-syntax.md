---
sidebar_position: 3
title: Extended syntax
---

# Extended Syntax

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

If you include a link using the markdown syntax, the linked resource will be passed along with the ***plain specification to the renderer.

Here's an example of a linked resource (see Task manager example application for the full specification).

```plain
- Show :Task: List. The details of the user interface are provided in the file [task_list_ui_specification.yaml](task_list_ui_specification.yaml).
```

**Important Notes:**
- Only links to files in the same folder (and its subfolders) as the ***plain specification are supported. Links to external resources are not supported.
- File paths are resolved relative to the location of the ***plain specification file.
- All types are supported, except binary files.

## Liquid templates

***plain supports Liquid templates. Liquid is an open-source template language created by Shopify (https://shopify.github.io/liquid/).
