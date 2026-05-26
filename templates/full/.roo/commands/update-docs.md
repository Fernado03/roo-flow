---
description: "Update repo documentation so it matches the current code."
argument-hint: <doc or area to update>
mode: code-tweaker
---

Update repo documentation so it matches the current code. Surgical edits only — read existing docs first, verify claims against code, never rewrite wholesale unless the existing doc is unsalvageable. Follow the skill exactly.

Skill: `.roo/skills/engineering/update-docs/SKILL.md`

Do NOT use this for:

- Domain glossary terms — use `/grill-with-docs`
- ADRs — use `/grill-with-docs` or `/refactor`
- Local commit journal entries — use `/commit-and-document`
- Read-only understanding — use `/explore`

If `$ARGUMENTS` is empty, ask once: "Which documentation file or area should I update?"

$ARGUMENTS
