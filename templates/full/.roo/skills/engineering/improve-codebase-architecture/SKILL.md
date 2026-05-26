---
name: improve-codebase-architecture
description: Find deepening opportunities in a codebase, informed by the domain language in CONTEXT.md and the decisions in docs/adr/. Use when the user wants to improve architecture, find refactoring opportunities, consolidate tightly-coupled modules, or make a codebase more testable and AI-navigable.
---

# Improve Codebase Architecture

RULE: Use `LANGUAGE.md` terms. Use glossary. Respect ADRs; surface only reopen-worthy conflicts.

## Explore

1. Read relevant `CONTEXT.md`/`CONTEXT-MAP.md`.
2. Read relevant ADRs.
3. Explore code organically.
4. Find friction:
   - Concept requires many-module bouncing.
   - Module shallow: interface ≈ implementation.
   - Pure fns exist only for tests; no locality.
   - Tight modules leak across seams.
   - Tests absent/hard through current interface.
5. Apply deletion test.
6. Keep candidates where deepening improves leverage/locality/testability.

## Report

1. Temp dir: `$TMPDIR` else `/tmp` (Windows `%TEMP%`).
2. Write fresh `{tmpdir}/architecture-review-{timestamp}.html`.
3. Use Tailwind CDN + Mermaid CDN.
4. Include candidate cards with before/after visuals.
5. Per candidate include: files/modules; problem; solution; locality/leverage/testing benefits; diagram; strength `Strong`/`Worth exploring`/`Speculative`; ADR conflict only if real.
6. Include Top recommendation.
7. Open file: Linux `xdg-open {path}`, macOS `open {path}`, Windows `start {path}`.
8. Tell user absolute path.
9. DO NOT propose interfaces yet.
10. Ask: `Which of these would you like to explore?`

## After candidate chosen

1. Walk constraints/deps/seam/hidden implementation/surviving tests.
2. If module name introduces unresolved domain term, update `CONTEXT.md` lazily.
3. If term sharpened, update `CONTEXT.md` immediately.
4. Durable rejected reason useful later → offer ADR.
5. Interface options requested → run `INTERFACE-DESIGN.md`.
