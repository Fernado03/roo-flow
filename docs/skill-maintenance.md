# Skill maintenance policy

This is repo-maintenance policy for the bundled skill set. It does not
need to be in the model's context on every turn, so it lives in `docs/`
rather than `.roo/rules/`. The runtime path-safety contract is in
[`templates/full/.roo/rules/00-paths.md`](../templates/full/.roo/rules/00-paths.md).

## Skill bucket layout

Skills are organized into bucket folders under `.roo/skills/`:

- `.roo/skills/engineering/` — daily code work
- `.roo/skills/productivity/` — daily non-code workflow tools
- `.roo/skills/misc/` — kept around but rarely used
- `.roo/skills/personal/` — tied to a maintainer's setup, not promoted
- `.roo/skills/in-progress/` — drafts not yet ready to ship
- `.roo/skills/deprecated/` — no longer used

## Promotion rules

Skills in `.roo/skills/personal/`, `.roo/skills/in-progress/`, and
`.roo/skills/deprecated/` must not appear in the top-level `README.md`
as promoted skills. They may appear in internal indexes only when
clearly marked as personal, in-progress, or deprecated.

Every skill in `.roo/skills/engineering/`, `.roo/skills/productivity/`,
or `.roo/skills/misc/` must have a reference in the top-level
`README.md`.

Each bucket folder has a `README.md` that lists every skill in the
bucket with a one-line description, with the skill name linked to its
`SKILL.md`.
