---
description: "Explore unfamiliar code before /feature, /refactor, or /fix. Produces written map."
argument-hint: <feature or folder to map>
mode: system-architect
---
EXECUTION RULES:
1. READ: `CONTEXT.md`, `CONTEXT-MAP.md`, `docs/adr/`, `FLOW.md`, `ARCHITECTURE.md`, `APP_MAP.md` in target area.
2. RUN skill: `.roo/skills/engineering/zoom-out/SKILL.md`.
3. OUTPUT MAP: Create markdown with sections: Domain language, Modules, Data flow, Seams/callers, ADRs, Open questions.
4. NEXT STEPS: Suggest `/grill-with-docs`, `/feature`, `/refactor`, or `/fix`. DO NOT auto-launch.
5. SAVE (Optional): Ask to save map to .scratch/explorations/<date>/explore-<slug>.md.

$ARGUMENTS
