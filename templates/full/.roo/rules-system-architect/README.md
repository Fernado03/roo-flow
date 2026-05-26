# `system-architect` mode rules

Auto-loaded rules scoped to the **🏗️ System Architect** mode.

Files placed in this directory are loaded by Roo Code on every turn **only when
the active mode is `system-architect`**. Use this for always-on guidance,
checklists, or domain context that the architect needs before planning a fix,
feature, refactor, or exploration.

## What belongs here

- Standing instructions specific to architectural / planning work
  (e.g. "always produce an ADR for cross-cutting changes").
- Pointers into `CONTEXT.md` and `docs/adr/` that should be in context
  before any `/fix`, `/feature`, `/refactor`, or `/explore` invocation.
- Repo-specific conventions the architect must respect when proposing plans.

## What does NOT belong here

- **On-demand skills.** Those live under `.roo/skills/` and are loaded
  explicitly by slash commands, not auto-loaded every turn.
- Workspace-wide always-on rules that apply to every mode — those stay in
  `.roo/rules/`.
- Mode-agnostic implementation guidance — put that in `.roo/rules-code/`
  or `.roo/rules-code-tweaker/` instead.

## Related directories

- `.roo/rules/` — always-on rules for **all** modes.
- `.roo/skills/` — on-demand skills, invoked by slash commands.
- `.roo/commands/` — slash command definitions (e.g. `/fix`, `/feature`).
- `.roo/rules-code-tweaker/` — sibling rules for the Code Tweaker mode.
