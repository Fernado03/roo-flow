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
- Include domain terms only; exclude generic programming terms.
- Group under headings when useful.

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

## Companion docs

Canonical names for code-explanation docs (read by `/explore`, edited by `/update-docs`):

- `FLOW.md` — subsystem flow / data path; lives next to the code it describes.
- `APP_MAP.md` — app-wide module/navigation map; root-level.
- `ARCHITECTURE.md` — system-level structure, constraints, seams; root-level.
- `README.md` — setup and usage; root-level.

Use these names when creating new docs of these kinds. A subsystem may have its own `FLOW.md`; `APP_MAP.md` and `ARCHITECTURE.md` are typically singular per repo.
