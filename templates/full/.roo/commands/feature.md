---
description: "Add new feature. Chains grill-with-docs, prototype, to-prd, to-issues, tdd."
argument-hint: <describe the feature>
mode: system-architect
---
EXECUTION RULES (Run sequentially. Wait for user between phases):
1. SHARPEN (Architect): Run skill `.roo/skills/engineering/grill-with-docs/SKILL.md`. Update docs.
   HARD STOP: Ask user to choose: Prototype OR skip to PRD.
2. PROTOTYPE [Optional]: Follow `.roo/rules-system-architect/01-feature-prototype.md` for the architect→tweaker handoff.
   HARD STOP: Wait for user verdict.
3. PRD (Architect): Run skill `.roo/skills/engineering/to-prd/SKILL.md` using a 3-bullet summary of prior phases.
   HARD STOP: Ask "Ready to slice into issues?". Wait for approval.
4. SLICE (Architect): Run skill `.roo/skills/engineering/to-issues/SKILL.md`.
   HARD STOP: Wait for user to approve issues list.
5. IMPLEMENT (Tweaker):
   - Architect summarizes issues.
   - Architect MUST `switch_mode` -> `code-tweaker`.
   - Tweaker: For each issue, execute the `/tdd` command workflow (per `.roo/rules/01-command-protocol.md`). After each ships, suggest `/commit-and-document`.

$ARGUMENTS
