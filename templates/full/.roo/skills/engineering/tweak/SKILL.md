---
name: tweak
description: Direct implementation mode for small, known fixes or UI updates. Bypasses heavy diagnosis or PRD creation.
---

# Tweak

Use for small known fixes.

1. Locate target files quickly.
2. Ask only if multiple identical matches.
3. Implement exact requested fix.
4. DO NOT rewrite surrounding logic unless requested.
5. If existing test covers touched area, run it.
6. DO NOT write new tests unless asked.
7. Confirm change.
8. Offer `/commit-and-document` only after user satisfied.

## Context economy

Before broad reads, locate relevant files/symbols with `list_files`, `search_files`, or `codebase_search`.

Prefer targeted `read_file` ranges or indentation/block reads once the relevant area is known.

Read full files only when structure, ordering, or surrounding context is required for correctness.

Do not re-read unchanged files; use prior findings unless the file changed.

For small changes, audit only the named files and nearby call sites. Expand search only if the first audit shows hidden dependencies.
