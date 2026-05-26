---
name: grill-with-docs
description: Grilling session that challenges your plan against the existing domain model, sharpens terminology, and updates documentation (CONTEXT.md, ADRs) inline as decisions crystallise. Use when user wants to stress-test a plan against their project's language and documented decisions.
---

# Grill With Docs

## Loop

1. Read relevant `CONTEXT.md`/`CONTEXT-MAP.md` + ADRs.
2. Ask one question at a time.
3. Include recommended answer.
4. Inspect code instead of asking when code can answer.
5. Continue until design branches resolved.
6. Update docs inline when terms/decisions crystallise.

## Docs

- Single-context: root `CONTEXT.md`, root `docs/adr/`.
- Multi-context: root `CONTEXT-MAP.md` → per-context `CONTEXT.md` + ADRs.
- Create docs lazily only when recording needed.

## MUST

- Challenge glossary conflicts.
- Sharpen fuzzy/overloaded terms.
- Use scenarios/edge cases.
- Cross-check claims against code.
- Surface code/doc contradictions.
- Update `CONTEXT.md` immediately for resolved terms.
- Keep `CONTEXT.md` glossary-only; no impl/spec notes.
- Offer ADR only when hard to reverse + surprising + real trade-off; use `ADR-FORMAT.md`.
