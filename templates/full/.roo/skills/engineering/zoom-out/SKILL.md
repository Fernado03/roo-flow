---
name: zoom-out
description: Tell the agent to zoom out and give broader context or a higher-level perspective. Use when you're unfamiliar with a section of code or need to understand how it fits into the bigger picture.
disable-model-invocation: true
---

Zoom out: map relevant modules + callers at higher abstraction. Use glossary vocabulary.

## Context economy

Before broad reads, locate relevant files/symbols with `list_files`, `search_files`, or `codebase_search`.

Prefer targeted `read_file` ranges or indentation/block reads once the relevant area is known.

Read full files only when structure, ordering, or surrounding context is required for correctness.

Do not re-read unchanged files; use prior findings unless the file changed.

Start with `list_files` and `search_files`/`codebase_search`. Read representative files and key entrypoints, not every file in the area.
