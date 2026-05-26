---
description: "Fix bugs/regressions. Chains diagnose -> tweak -> post-mortem."
argument-hint: <describe the bug or error>
mode: system-architect
---
EXECUTION RULES:
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
