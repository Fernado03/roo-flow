---
name: writing-fragments
description: Grilling session that mines the user for fragments — heterogeneous nuggets of writing (claims, vignettes, sharp sentences, half-thoughts) — and appends them to a single document as raw material for a future article. Use when the user wants to develop ideas before imposing structure, or mentions "fragments", "ideate", or "raw material" for writing.
---

# Writing Fragments

## Setup

1. Capture fragments from initial prompt onward.
2. If output path missing, ask once.
3. First write: one H1 working title; no metadata/TOC/date.
4. Re-read file before every write.
5. Append only unless user requests specific edit.

## Fragment forms

- Sharp sentence.
- Claim + one-line reason.
- Vignette/scenario/analogy/code snippet.
- Half-thought.
- Quote/dialogue.
- Observation cluster.
- Complaint/confession/punchline.

## File format

```markdown
# Working title

Fragment one.

---

Fragment two.
```

Rules:
- Separate fragments with `---`.
- No body headings/tags.
- Order = capture order.
- Append silently; mention briefly.
- Preserve user edits.
- Support `cut last`, `rewrite`, `merge` immediately.
- DO NOT impose outline/structure.
