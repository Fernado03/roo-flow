# Zoo Flow

> **Workflow control plane for [Zoo Code](https://docs.zoocode.dev/).**

A small, opinionated template that turns Zoo Code into a predictable
mode + command + skill orchestrator. Three modes, a fixed routing
matrix, a command protocol, and path-safety rules. Drop it into a
workspace and your AI assistant stops freelancing.

For the deeper rationale, see [`docs/overview.md`](docs/overview.md)
and [`docs/philosophy.md`](docs/philosophy.md).

## Install

Run this from the root of the project where you use Zoo Code:

```bash
npx @fernado03/zoo-flow@latest init
```

This copies only the runtime template (`.roomodes` and `.roo/`) into
your project. It does not copy this repository's `docs/` folder.

If `.roomodes` or `.roo/` already exist, Zoo Flow stops without
overwriting. To back up and overwrite:

```bash
npx @fernado03/zoo-flow@latest init --force
```

A timestamped backup is always written to `.zoo-flow-backup/` before
overwrite.

After install, reload VS Code (Command Palette → **Developer: Reload
Window**) and open Zoo Code.

> **Note**: `.roomodes`, `.roo/commands/`, and `.roo/rules-{mode-slug}/`
> are kept as-is because they are the official Zoo Code configuration
> paths. Zoo Flow does not introduce a `.zoo/` directory.

### Before using `/triage`, `/to-issues`, or `/to-prd`

Switch to `code-tweaker` and run `/setup-matt-pocock-skills` once per
repo. It seeds an `## Agent skills` block in `AGENTS.md` or
`CLAUDE.md` and a few files under `docs/agents/` so the issue and PRD
skills know your tracker, labels, and domain layout. Skip it if you
only plan to use `/tweak`, `/fix`, `/explore`, `/refactor`,
`/diagnose`, `/prototype`, `/update-docs`, or `/commit-and-document`.

## Using it

Zoo Code switches modes automatically when you type a slash command,
based on the `mode:` field in the command file. That gives you two
ways to drive Zoo Flow, and the choice matters:

- **Free-form request from `custom-orchestrator`** (no leading slash).
  The orchestrator picks a workflow, proposes it as a numbered choice,
  and delegates only after you confirm. Use this when you want the
  router to think first. This is how `custom-orchestrator` is
  designed to work.

  > change a harmless comment in `README`

- **Direct slash command from any mode.** The host switches you to
  the command's configured mode and runs it, bypassing the
  orchestrator entirely. Use this when you already know which
  workflow you want.

  > /tweak fix the typo in `README`

When Zoo Flow asks a workflow question, reply by typing the number,
for example `1`.

Zoo Flow may show numbered options, but those options should be
plain-language choices only. They should not contain slash commands,
mode names, or executable routing text. See
[`docs/troubleshooting.md`](docs/troubleshooting.md#clickable-suggestions-can-route-incorrectly).

## Update

```bash
npx @fernado03/zoo-flow@latest update
```

Backs up your current `.roomodes` and `.roo/` to
`.zoo-flow-backup/<timestamp>/`, then replaces them with the latest
template. Preview with `--dry-run`.

## Context economy

Zoo Flow avoids unnecessary token use by asking agents to search or list before broad reads, use targeted line ranges when possible, and avoid re-reading unchanged files. Full-file reads are still allowed when correctness requires complete context.

## Modes

| Slug                  | Name                  | Role                                                       | Edits allowed                                  | Delegation                                  |
| --------------------- | --------------------- | ---------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| `custom-orchestrator` | 🪃 Custom Orchestrator | Router. Picks workflow, delegates, waits for the user.     | None                                           | `new_task` to architect or tweaker          |
| `system-architect`    | 🏗️ System Architect   | Planning, diagnosis, refactor design, exploration, triage. | Markdown, `.scratch/`, `docs/`                 | `switch_mode` to tweaker in same window     |
| `code-tweaker`        | ⚡ Code Tweaker        | Implementation, TDD, docs updates, prototypes, commits.    | Full repo edits within the assigned command    | `switch_mode` to architect in same window   |

Modes are defined in
[`templates/full/.roomodes`](templates/full/.roomodes). The detailed
behavior lives in `.roo/rules-{modeSlug}/` folders. See
[`docs/mode-rules.md`](docs/mode-rules.md).

## Commands

The orchestrator routes the **core** commands. **Helper** commands are
run directly inside `system-architect` or `code-tweaker` when needed.

### Core (routed by the orchestrator)

| Command                  | Routes to            | What it does                                                |
| ------------------------ | -------------------- | ----------------------------------------------------------- |
| `/tweak`                 | `code-tweaker`       | Direct implementation of small, known changes.              |
| `/tdd`                   | `code-tweaker`       | Test-first implementation loop.                             |
| `/prototype`             | `code-tweaker`       | Throwaway prototype to settle a design uncertainty.         |
| `/update-docs`           | `code-tweaker`       | Reconcile docs with code reality.                           |
| `/commit-and-document`   | `code-tweaker`       | Stage, message, commit, journal — pauses for approval.      |
| `/fix`                   | `system-architect`   | Diagnose → implement → post-mortem chain.                   |
| `/feature`               | `system-architect`   | Sharpen → optional prototype → PRD → issues → TDD chain.    |
| `/refactor`              | `system-architect`   | Plan and stage architecture changes.                        |
| `/explore`               | `system-architect`   | Map unfamiliar code before touching it.                     |
| `/triage`                | `system-architect`   | Clean and prioritize an issue queue.                        |

### Helper (run directly when needed)

| Command                          | Best run in          | What it does                                                |
| -------------------------------- | -------------------- | ----------------------------------------------------------- |
| `/diagnose`                      | `system-architect`   | Standalone diagnosis loop with HITL checkpoints.            |
| `/grill-with-docs`               | `system-architect`   | Sharpen a feature spec via QA against current docs.         |
| `/improve-codebase-architecture` | `system-architect`   | Generate a deep architecture review report.                 |
| `/to-prd`                        | `system-architect`   | Turn sharpened context into a PRD.                          |
| `/to-issues`                     | `system-architect`   | Slice a PRD into issues.                                    |
| `/zoom-out`                      | `system-architect`   | Pull back to architectural altitude.                        |
| `/handoff`                       | either               | Produce a clean handoff package for another agent or human. |
| `/grill-me`                      | either               | Adversarial Q&A to sharpen an idea.                         |
| `/caveman`                       | either               | Ultra-compressed communication mode.                        |
| `/write-a-skill`                 | `code-tweaker`       | Author a new skill following the bucket layout.             |
| `/setup-matt-pocock-skills`      | `code-tweaker`       | One-shot setup helper for the bundled skill set.            |

Command files live in
[`templates/full/.roo/commands/`](templates/full/.roo/commands).

## Worked examples

- [`examples/fix-flow.md`](examples/fix-flow.md)
- [`examples/feature-flow.md`](examples/feature-flow.md)

## How this is different

Zoo Flow is not a methodology and not a giant skills pack. It is a
thin Zoo-native control plane: three modes, a routing matrix, and a
path-safety contract that turn into a predictable workflow. For a
longer comparison with adjacent projects, see
[`docs/comparison.md`](docs/comparison.md).

## Manual install

If you would rather copy the template by hand:

```sh
git clone https://github.com/Fernado03/zoo-flow.git /tmp/zoo-flow
cp /tmp/zoo-flow/templates/full/.roomodes .
cp -R /tmp/zoo-flow/templates/full/.roo .
```

Windows uses `git clone ... C:\Temp\zoo-flow` and `Copy-Item` instead.

## Migration

Zoo Flow started as a Roo Flow template and was renamed for Zoo Code.
The `.roo/` folder names are intentionally preserved because Zoo Code
still uses those paths for project modes, commands, rules, and
skills. Migrating from a Roo Code workspace by copying the same
`.roo/` directory and `.roomodes` file is expected to keep working.

## Inspiration

Inspired by Matt Pocock's agent-skills workflow ideas — small,
composable, task-focused skills for coding agents. Zoo Flow is not
affiliated with, endorsed by, or maintained by him; it is an
independent Zoo Code workflow-control template.

## License

[MIT](LICENSE).
