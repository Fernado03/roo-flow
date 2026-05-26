# CONTEXT.md Format

## Shape

```md
# {Context Name}

{1-2 sentences: context purpose.}

## Language

**Order**:
{1-2 sentence definition}
_Avoid_: Purchase, transaction

## Flagged ambiguities

**Account** means Customer here, not User.
```

## Rules

- MUST pick canonical term; aliases under `_Avoid_`.
- MUST flag ambiguity + resolution.
- Define term in 1–2 sentences: what it is, not behavior.
- Include relationships/cardinality when obvious.
- Include domain terms only; exclude generic programming terms.
- Group under headings when useful.
- Include example dialogue.

## Layout

Single-context:
- `CONTEXT.md`
- `docs/adr/`

Multi-context:
- `CONTEXT-MAP.md`
- Per-context `CONTEXT.md` + optional `docs/adr/`

Detection:
1. If `CONTEXT-MAP.md`, read map + relevant contexts.
2. Else if root `CONTEXT.md`, use it.
3. Else create root `CONTEXT.md` lazily on first resolved term.
4. If context ambiguous, ask.
