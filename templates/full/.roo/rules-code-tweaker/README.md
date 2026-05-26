# `code-tweaker` mode rules

Auto-loaded rules scoped to the **⚡ Code Tweaker** mode.

Files placed in this directory are loaded by Roo Code on every turn **only when
the active mode is `code-tweaker`**. Use this for always-on guidance the
tweaker needs while doing direct implementations, CSS changes, TDD loops,
doc updates, or other "I already know the solution, just apply it" work.

## What belongs here

- Standing implementation conventions (formatting, import order, test layout).
- Repo-specific quick-reference rules the tweaker should never forget
  (e.g. "always run the project's lint + tests after edits").
- Pointers to the project's style guide, lint config, or CI expectations.

## What does NOT belong here

- **On-demand skills.** Those live under `.roo/skills/` and are loaded
  explicitly by slash commands, not auto-loaded every turn.
- Workspace-wide always-on rules that apply to every mode — those stay in
  `.roo/rules/`.
- Architectural / planning guidance — put that in `.roo/rules-system-architect/`
  instead.

## Related directories

- `.roo/rules/` — always-on rules for **all** modes.
- `.roo/skills/` — on-demand skills, invoked by slash commands.
- `.roo/commands/` — slash command definitions (e.g. `/tweak`, `/tdd`).
- `.roo/rules-system-architect/` — sibling rules for the System Architect mode.
