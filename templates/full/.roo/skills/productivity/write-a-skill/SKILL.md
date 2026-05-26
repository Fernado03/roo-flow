---
name: write-a-skill
description: Create new agent skills with proper structure, progressive disclosure, and bundled resources. Use when user wants to create, write, or build a new skill.
---

# Write A Skill

## Process

1. Gather: task/domain; use cases/triggers; scripts needed; references.
2. Draft: concise `SKILL.md`; reference files if `SKILL.md` >100 lines or distinct domains; scripts for deterministic repeated ops.
3. Review with user.
4. Revise.

## Structure

```text
skill-name/
├── SKILL.md
├── REFERENCE.md
├── EXAMPLES.md
└── scripts/
    └── helper.js
```

## Frontmatter

```md
---
name: skill-name
description: Brief description. Use when [specific triggers].
---
```

Description rules:
- Max 1024 chars.
- Third person.
- First sentence = capability.
- Second sentence = `Use when ...` triggers.

## Scripts

Add when: deterministic op; repeated code; explicit error handling needed.

## Review checklist

- [ ] Description has triggers.
- [ ] `SKILL.md` under 100 lines.
- [ ] No time-sensitive info.
- [ ] Terminology consistent.
- [ ] Examples concrete.
- [ ] References one level deep.
