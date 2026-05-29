---
description: "Fix bugs/regressions. Chains diagnose -> tweak -> post-mortem."
argument-hint: <describe the bug or error>
mode: system-architect
---
EXECUTION RULES:
0. TRACK: At start, write a phase checklist to `.scratch/fix-<slug>.md` (phases 1-5, each unchecked). Before any `switch_mode` or `attempt_completion`, update it. Do NOT `attempt_completion` while any phase is unchecked — `switch_mode` to the phase's owner instead.
1. DIAGNOSE (Architect): Run skill `.roo/skills/engineering/diagnose/SKILL.md`. Run phases 1-3.
   HARD STOP: Present hypotheses. Wait for user selection. Ignore internal AFK rules.
2. INSTRUMENT (Architect): Run phase 4 on chosen hypothesis. Find root cause.
3. IMPLEMENT (Tweaker):
   - Architect summarizes fix.
   - Architect MUST `switch_mode` -> `code-tweaker`.
   - Tweaker executes phase 5 (Fix + test).
   - Tweaker MUST `switch_mode` -> `system-architect`.
4. POST-MORTEM (Architect): Execute Phase 6. If architectural rot, suggest `/refactor`.
   - Architect MUST `switch_mode` -> `code-tweaker`.
5. COMMIT (Tweaker): Suggest `/commit-and-document`.

$ARGUMENTS
