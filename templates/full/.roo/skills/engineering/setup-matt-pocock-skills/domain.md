# Domain Docs

## Read before work

If present:
1. Root `CONTEXT.md`, or root `CONTEXT-MAP.md` then relevant context docs.
2. Relevant root `docs/adr/` ADRs.
3. If multi-context, relevant `src/{context}/docs/adr/`.

If missing, proceed silently.

## Layouts

Single-context:

```text
/CONTEXT.md
/docs/adr/
/src/
```

Multi-context:

```text
/CONTEXT-MAP.md
/docs/adr/
/src/{context}/CONTEXT.md
/src/{context}/docs/adr/
```

## Rules

- Use glossary vocabulary in outputs/tests/issues/hypotheses.
- Avoid `_Avoid_` synonyms.
- If term missing, reconsider wording or note `/grill-with-docs` gap.
- If output contradicts ADR, surface conflict.
