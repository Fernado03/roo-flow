---
name: prototype
description: Build a throwaway prototype to flesh out a design before committing to it. Routes between two branches — a runnable terminal app for state/business-logic questions, or several radically different UI variations toggleable from one route. Use when the user wants to prototype, sanity-check a data model or state machine, mock up a UI, explore design options, or says "prototype this", "let me play with it", "try a few designs".
---

# Prototype

RULE: Prototype answers one question. Throw away or absorb after answer.

## Branch

- Logic/state/data-model → `LOGIC.md`.
- Visual/layout/UI → `UI.md`.
- Ambiguous → ask.
- User AFK → infer + state assumption.

## Rules

1. Mark throwaway clearly.
2. Place near real module/page.
3. Follow existing routing/tooling.
4. Provide one run command.
5. Default no persistence; state in memory.
6. Persistence target → scratch DB/file named `PROTOTYPE — wipe me` or equivalent.
7. No polish: no tests, minimal errors, no abstractions.
8. Surface full relevant state after each action/variant switch.
9. Done → capture answer in commit/ADR/issue/`NOTES.md`; delete or fold into real code.
