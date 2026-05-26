# Out-of-Scope Knowledge Base

Path: `.out-of-scope/{concept}.md`. One file per rejected enhancement concept.

## File format

```markdown
# Concept Name

Decision summary.

## Why this is out of scope

Durable reason: scope, technical constraint, strategy. Include examples if useful.

## Prior requests

- #42 — "Issue title"
```

## Rules

- Use kebab-case filenames.
- Group same concept across issues.
- Write durable substantive reason.
- DO NOT use temporary capacity as reason.
- Only `wontfix` enhancements go here.
- Bugs do not go here.

## Triage flow

1. Read `.out-of-scope/*.md`.
2. Match by concept similarity, not keyword.
3. Surface possible match.
4. If confirmed: append issue; comment; apply `wontfix`; close.
5. If reconsidered: delete/update file; normal triage.
6. If distinct: normal triage.
