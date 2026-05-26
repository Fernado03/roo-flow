---
description: "Improve working code. Chains improve-codebase-architecture -> tdd."
argument-hint: <area to refactor>
mode: system-architect
---
EXECUTION RULES:
1. FIND (Architect): Run skill `.roo/skills/engineering/improve-codebase-architecture/SKILL.md`. List candidates.
   HARD STOP: Ask user which candidate to explore.
2. GRILL (Architect): Run grilling loop. Update CONTEXT/ADRs inline.
   HARD STOP: Summarize plan, get explicit user approval.
3. EXECUTE (Tweaker):
   - Architect summarizes approved plan.
   - Architect MUST `switch_mode` -> `code-tweaker`.
   - Tweaker executes the `/tdd` command workflow (per `.roo/rules/01-command-protocol.md`) — new tests at interface, delete old.
   - Tweaker suggests `/commit-and-document`.

$ARGUMENTS
