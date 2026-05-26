# Mode-specific rules

Roo Flow uses three rule scopes, each loaded by Roo Code automatically:

- `.roo/rules/` — loaded for **every** mode, every turn.
- `.roo/rules-{modeSlug}/` — loaded **only** when that mode is active.
- `.roo/skills/` — **on-demand**, loaded by slash commands. Never auto-loaded.

> **Do not use** the legacy `.roorules-{modeSlug}` or `.clinerules-{modeSlug}`
> single-file forms. They are deprecated. Roo Flow targets the
> `.roo/rules-{modeSlug}/` directory form exclusively.

Mode-specific behavior lives in dedicated folders under `.roo/`:

- `.roo/rules-custom-orchestrator/` — routing rules and the delegation
  message contract for the orchestrator.
- `.roo/rules-system-architect/` — scope, feature-prototype handoff, and
  completion rules for the architect.
- `.roo/rules-code-tweaker/` — scope and completion rules for the
  tweaker, including the git hard stop.

Files inside these folders are short on purpose. They are concatenated
into the model's context every turn the matching mode is active, so each
extra paragraph costs tokens for the entire session.

## What belongs in a mode rules folder

- Standing instructions specific to that mode's job (e.g. "the architect
  cannot edit application source").
- Short hard stops (e.g. "halt for explicit user approval before
  publishing issues").
- Pointers to global rules the mode must follow.

## What does NOT belong here

- **On-demand skills.** Those live under `.roo/skills/` and are loaded
  explicitly by slash commands.
- **Workspace-wide always-on rules** that apply to every mode. Those
  stay in `.roo/rules/`.
- **Long policy or knowledge files.** If a policy is long enough to need
  multiple paragraphs of explanation, write it under `docs/` and
  reference it from the rule. The mode rule should be a short reminder,
  not a full essay.
- **Duplicates of the global command protocol or path safety.** Those
  live in `.roo/rules/01-command-protocol.md` and
  `.roo/rules/00-paths.md` respectively.

## Why `.roomodes` is intentionally minimal

Each `customInstructions` block in `.roomodes` is loaded with the mode
metadata. Putting detailed behavior there duplicates what already lives
in `.roo/rules-{modeSlug}/`, costs tokens twice, and creates two places
to keep in sync.

The current `.roomodes` keeps four things per mode:

1. `slug`, `name`, `roleDefinition`, `whenToUse`, `description`,
   `groups` — these can't move.
2. A short `customInstructions` that:
   - points at the matching `.roo/rules-{modeSlug}/` folder,
   - lists the permitted commands (or routing matrix, for the
     orchestrator),
   - references the global rules (`00-paths.md`,
     `01-command-protocol.md`, `03-manual-reply-protocol.md`),
   - says what to do if an unsupported command is assigned.

Everything else lives in the mode rules folder.

## Related directories

- [`.roo/rules/`](../templates/full/.roo/rules/) — always-on rules for **all** modes.
- [`.roo/skills/`](../templates/full/.roo/skills/) — on-demand skills, invoked by slash commands.
- [`.roo/commands/`](../templates/full/.roo/commands/) — slash command definitions
  (e.g. `/tweak`, `/fix`).
- [`.roo/rules-custom-orchestrator/`](../templates/full/.roo/rules-custom-orchestrator/) —
  router-only rules.
- [`.roo/rules-system-architect/`](../templates/full/.roo/rules-system-architect/) —
  architect rules.
- [`.roo/rules-code-tweaker/`](../templates/full/.roo/rules-code-tweaker/) —
  tweaker rules.
