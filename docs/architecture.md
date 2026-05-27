# Architecture

Zoo Flow ships three custom modes, a fixed routing matrix, a small set of
always-on rules, and a directory layout for slash commands and on-demand
skills. This document explains what each piece does and why it is shaped
the way it is.

## Components

```
templates/full/
├── .roomodes                       # minimal: slug, groups, short pointers
└── .roo/
    ├── rules/                      # always-on, every mode, every turn
    │   ├── 00-paths.md
    │   ├── 01-command-protocol.md
    │   ├── 02-three-failure-rule.md
    │   ├── 03-manual-reply-protocol.md
    │   └── 04-context-economy.md
    ├── rules-custom-orchestrator/  # mode-scoped, orchestrator only
    │   ├── 00-routing.md
    │   └── 01-delegation-message.md
    ├── rules-system-architect/     # mode-scoped, architect only
    │   ├── 00-scope.md
    │   ├── 01-feature-prototype.md
    │   └── 02-completion.md
    ├── rules-code-tweaker/         # mode-scoped, tweaker only
    │   ├── 00-scope.md
    │   └── 01-completion.md
    ├── commands/                   # slash commands (the public API)
    └── skills/                     # on-demand skills, loaded by commands
        ├── engineering/
        ├── productivity/
        ├── misc/
        ├── personal/
        └── in-progress/
```

`.roomodes` is intentionally minimal. It declares each mode's slug,
role, tool groups, and a short `customInstructions` block that points
at the matching `.roo/rules-{modeSlug}/` folder. All detailed mode
behavior lives in the rule files inside that folder. See
[`mode-rules.md`](mode-rules.md) for the full layout rationale.

> Zoo Flow uses the preferred `.roo/rules-{modeSlug}/` directory form
> only. Legacy single-file fallbacks such as `.roorules-{modeSlug}` and
> `.clinerules-{modeSlug}` are not used by this template.

## Modes

### `custom-orchestrator`

Defined in `templates/full/.roomodes`. Tool groups: **none**. Detailed
behavior lives in
[`.roo/rules-custom-orchestrator/`](../templates/full/.roo/rules-custom-orchestrator/)
(`00-routing.md`, `01-delegation-message.md`).

The orchestrator cannot read, edit, run commands, or call MCP tools. It
exists to do exactly four things:

1. Read the user request.
2. Map it to a command using the routing matrix in its
   `customInstructions`.
3. Either delegate via `new_task` (when the user supplied an explicit
   slash command) or offer 1-2 numbered workflow choices and halt
   (when they did not).
4. Summarize the subtask result and halt again.

It never uses `switch_mode`. If `new_task` is unavailable, it stops and
reports — it does not try to do the work itself.

### `system-architect`

Tool groups: `command`, `mcp`, `read`, and a constrained `edit` that only
matches Markdown files, `.scratch/`, and `docs/`. The `fileRegex` lives in
`.roomodes`:

```json
{ "fileRegex": "(.*\\.md$|^\\.scratch/.*|^docs/.*)" }
```

Detailed behavior lives in
[`.roo/rules-system-architect/`](../templates/full/.roo/rules-system-architect/)
(`00-scope.md`, `01-feature-prototype.md`, `02-completion.md`).

The architect plans, diagnoses, refactors, explores, and triages. It cannot
edit application source code. When implementation is needed, it
`switch_mode`s to `code-tweaker` inside the same task window.

Hard stops are baked in:

- 3-strike rule on diagnosis: after three failed attempts, halt and ask
  the user.
- HITL stop before testing a hypothesis, finalizing a plan, publishing
  issues, or making any irreversible decision.
- During `/feature`, never run a prototype directly. Summarize and
  switch to the tweaker.

### `code-tweaker`

Tool groups: `read`, `edit`, `command`, `mcp`. Full repo access within the
assigned command. Detailed behavior lives in
[`.roo/rules-code-tweaker/`](../templates/full/.roo/rules-code-tweaker/)
(`00-scope.md`, `01-completion.md`).

The tweaker implements, runs tests, updates docs, builds prototypes, and
prepares commits.

Hard stops:

- Auto-escalate to the architect on the **same task window** if the work
  needs major architecture decisions or the same approach fails three times.
- Git stop: never run `git commit` or `git push` without explicit user
  approval. Pushes only happen when the user asks.
- If created by the orchestrator via `new_task`, finish with
  `attempt_completion`, never with `switch_mode`.

## Command protocol

The protocol is in
[`templates/full/.roo/rules/01-command-protocol.md`](../templates/full/.roo/rules/01-command-protocol.md).
It is loaded on every turn for every mode.

When a mode is assigned a slash command:

1. **Normalize.** `/fix` becomes `fix`.
2. **Prefer `run_slash_command`.** Pass the normalized name as `command`
   and the full task context as `args`.
3. **Fall back to the file.** If `run_slash_command` is unavailable,
   disabled, or fails, read `templates/full/.roo/commands/{command}.md`
   and execute its instructions.
4. **Resolve skills via the file.** If the command references a skill,
   read the exact `.roo/skills/...` path the command provides. Do not
   compute paths from anywhere else.
5. **Do not chain.** A command suggested inside a subtask summary is
   *not* authorization to run that command. Only the human or the
   orchestrator's routing may launch a new command.

The protocol exists to make slash commands work the same way whether the
host UI exposes a native command runner or only file reads.

### Command types

Zoo Flow supports two command types:

1. **Skill-wrapper commands.** The command file declares a skill via a
   line like:

   ```md
   Skill: `.roo/skills/engineering/tdd/SKILL.md`
   ```

   The worker loads and follows that skill.

2. **Direct workflow commands.** The command file contains the
   procedure directly (no `Skill:` line). The worker executes those
   steps directly and must not invent a skill path.

This prevents redundant loading and avoids hallucinated skill paths.

## Path safety

The path-safety contract is in
[`templates/full/.roo/rules/00-paths.md`](../templates/full/.roo/rules/00-paths.md).
Two rules:

- Skills are at workspace-root paths under `.roo/skills/{bucket}/{skill}/SKILL.md`.
- Commands are at workspace-root paths under `.roo/commands/{name}.md`.

The forbidden form is anything under `.roo/rules/skills/...` or
`.roo/rules/commands/...`. Modes that try to load skills relative to a
`rules/` file have produced the most common failure in practice
(`ENOENT: .roo/rules/skills/...`). The rule blocks it before it happens.

## Slash commands

Each command is a Markdown file with a YAML front matter and a body. The
front matter declares the target mode and the argument hint:

```markdown
---
description: "Direct implementation mode for small, known fixes or UI updates."
argument-hint: <what to change>
mode: code-tweaker
---

Skill: `.roo/skills/engineering/tweak/SKILL.md`

$ARGUMENTS
```

The body is the actual instruction set. Some commands invoke a single
skill (`/tweak`, `/prototype`). Others orchestrate a multi-phase chain
across modes (`/fix`, `/feature`, `/refactor`).

A command can:

- Reference a skill by its exact `.roo/skills/...` path.
- Spell out HITL stops between phases.
- Direct a mode to `switch_mode` to another mode at a specific phase.
- Substitute `$ARGUMENTS` with the user / delegated context.

A command must not:

- Compute skill paths dynamically.
- Bypass the orchestrator when handing the human a choice.
- Auto-launch a follow-up command from a subtask summary.

### Core vs. helper commands

The orchestrator's **routing matrix** intentionally only routes a small
set of core workflow commands:

- `/tweak`, `/tdd`, `/update-docs`, `/commit-and-document`, `/prototype`
  → `code-tweaker`
- `/fix`, `/feature`, `/refactor`, `/explore`, `/triage`
  → `system-architect`

Every other command in `templates/full/.roo/commands/` is a **helper**.
Helpers are real, working commands. They are run directly inside the
appropriate mode rather than delegated by the orchestrator. This keeps
the orchestrator's routing matrix small and predictable, while leaving
the broader command library available when you want it.

If a helper command starts being used often enough to deserve
delegation, promote it to the routing matrix in `.roomodes` and add it
to the routed table in [`README.md`](../README.md#commands).

## Skills

Skills live under `templates/full/.roo/skills/`. Each skill is a folder
with a `SKILL.md` and any supporting files (templates, scripts, sub-docs).
They are organized into buckets:

- `engineering/` — code work.
- `productivity/` — non-code workflow.
- `misc/` — kept around but rarely used.
- `personal/` — tied to a maintainer's setup, not promoted.
- `in-progress/` — drafts, not ready to ship.

Skills are loaded **only** through commands. There is no "skill autoloader"
that pulls them on every turn. The orchestrator does not see skills at all;
it only sees commands.

The skills index lives in [`docs/skills-index.md`](skills-index.md).
It is human-facing reference documentation, intentionally kept outside
`.roo/rules/` because `.roo/rules/` is injected on every turn. Commands
load skills directly from explicit `.roo/skills/.../SKILL.md` paths, so
the index is not required for runtime execution.

## Same-window `switch_mode`

Used inside a single task window when one mode needs the other for a phase
of the same workflow. Examples:

- `/fix` going architect (diagnose) → tweaker (implement) → architect
  (post-mortem).
- `/feature` going architect (sharpen) → tweaker (prototype) → architect
  (PRD).
- `code-tweaker` auto-escalating after a 3-strike test failure.

`switch_mode` preserves context. The receiving mode reads the same task
window and continues. Use it for tight loops where the cost of losing
context outweighs the benefit of a clean boundary.

## Delegated `new_task`

Used by the orchestrator only. The orchestrator does not implement
anything; it hands work off to the architect or the tweaker via
`new_task`. The delegated message must include:

- The slash command, including the leading slash.
- The user context.
- A proceed policy. One of: `Proceed automatically after audit if
  clean`, `Ask user before implementation`, or `Stop and report only`.
- A reminder to follow `.roo/rules/01-command-protocol.md`.
- A reminder that skills live under `.roo/skills/...`.
- A completion rule: finish with `attempt_completion` containing summary,
  files inspected/changed, commands/tests run, blockers, and a
  recommended next command.

`new_task` opens a fresh subtask window. The boundary is the point.
Mode-internal context, scratch work, and false starts stay in the
subtask.

## Proceed policy

Zoo Flow delegated tasks include a proceed policy so workers know when
to continue and when to ask the user.

Policies:

- `Proceed automatically after audit if clean`
- `Ask user before implementation`
- `Stop and report only`

This prevents unnecessary questions during well-specified subtasks,
while preserving approval gates for hypotheses, architecture decisions,
commits, issue changes, and irreversible actions.

## `attempt_completion`

Used at the end of a delegated subtask. It is **not** an escape hatch.
Specifically, the architect must not use `attempt_completion` to skip
required implementation work — if the work belongs to the tweaker, the
architect uses `switch_mode` first.

`attempt_completion` returns to the orchestrator with a structured summary.
The orchestrator then summarizes for the user and halts. It never
auto-launches the next subtask, even if the summary suggests one.

## Context economy

Zoo Flow avoids unnecessary token use by asking agents to search or list before broad reads, use targeted line ranges when possible, and avoid re-reading unchanged files.

Full-file reads are still allowed when correctness requires complete context.
