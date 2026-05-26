# Roo Flow

> **Smoke-tested workflow control plane for Roo Code and Zoo Code.**

Roo Flow is a small, opinionated template that turns Roo Code and Zoo Code
into a predictable mode + command + skill orchestrator. It defines three
modes, a fixed routing matrix, a command protocol, and path-safety rules.
Drop it into a workspace and your AI assistant stops freelancing.

## Why this exists

Out of the box, AI coding assistants tend to skip planning when you want
planning, plan when you want a tweak, and quietly invent file paths that do
not exist. Adding a pile of skills makes it worse.

Roo Flow takes a different bet:

- A **router mode** chooses the workflow.
- An **architect mode** plans, diagnoses, and triages — and cannot edit
  source code.
- A **tweaker mode** implements, runs tests, prototypes, and commits — only
  when explicitly approved.
- A small set of **slash commands** acts as the public API between you and
  the modes.
- A few **always-on rules** keep the path layout honest and stop skill paths
  from drifting under `.roo/rules/`.

Everything else is optional. The skills bundled in the template are a
sensible starting point, not the point of the project.

## Core workflow

```mermaid
flowchart TD
    User([User])
    Orchestrator[🪃 custom-orchestrator<br/>router only]
    Architect[🏗️ system-architect<br/>plan / diagnose / triage<br/>Markdown edits only]
    Tweaker[⚡ code-tweaker<br/>implement / test / prototype / commit]

    User -- "free-form request" --> Orchestrator
    Orchestrator -- "proposes /command, waits" --> User
    User -- "/tweak, /tdd, /update-docs,<br/>/commit-and-document, /prototype" --> Orchestrator
    User -- "/fix, /feature, /refactor,<br/>/explore, /triage" --> Orchestrator

    Orchestrator -- "new_task" --> Tweaker
    Orchestrator -- "new_task" --> Architect

    Architect -- "switch_mode (same window)" --> Tweaker
    Tweaker -- "switch_mode (same window)" --> Architect

    Tweaker -- "attempt_completion" --> Orchestrator
    Architect -- "attempt_completion" --> Orchestrator
    Orchestrator -- "summarize, HALT" --> User
```

## Modes

| Slug                  | Name                  | Role                                                       | Edits allowed                                  | Delegation                                  |
| --------------------- | --------------------- | ---------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| `custom-orchestrator` | 🪃 Custom Orchestrator | Router. Picks workflow, delegates, waits for the user.     | None                                           | `new_task` to architect or tweaker          |
| `system-architect`    | 🏗️ System Architect   | Planning, diagnosis, refactor design, exploration, triage. | Markdown, `.scratch/`, `docs/`                 | `switch_mode` to tweaker in same window     |
| `code-tweaker`        | ⚡ Code Tweaker        | Implementation, TDD, docs updates, prototypes, commits.    | Full repo edits within the assigned command    | `switch_mode` to architect in same window   |

Modes are defined in [`templates/full/.roomodes`](templates/full/.roomodes).

## Commands

The orchestrator's routing matrix only routes the **core workflow
commands**. Helper commands are still part of the template — you can run
them directly in `system-architect` or `code-tweaker` when you need
them. They are intentionally outside the routing matrix so the
orchestrator stays focused on the workflows that benefit from
delegation.

### Core commands (routed by the orchestrator)

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

### Helper commands (run directly when needed)

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

The full routing matrix lives in the orchestrator's `customInstructions`
inside [`templates/full/.roomodes`](templates/full/.roomodes). The command
files themselves live in
[`templates/full/.roo/commands/`](templates/full/.roo/commands).

## Install

Roo Flow is a template, not a package. Copy the `templates/full/` contents
into your target workspace.

### macOS / Linux

```sh
git clone https://github.com/Fernado03/roo-flow.git
cd /path/to/your/project
cp -R /path/to/roo-flow/templates/full/.roo .
cp /path/to/roo-flow/templates/full/.roomodes .
```

### Windows (PowerShell)

```powershell
git clone https://github.com/Fernado03/roo-flow.git
Set-Location C:\path\to\your\project
Copy-Item -Recurse C:\path\to\roo-flow\templates\full\.roo .
Copy-Item C:\path\to\roo-flow\templates\full\.roomodes .
```

After copying:

1. Open the project in an editor running Roo Code or Zoo Code.
2. Confirm the three custom modes appear: `🪃 Custom Orchestrator`,
   `🏗️ System Architect`, `⚡ Code Tweaker`.
3. Switch to `custom-orchestrator` and start a new task.

If a slash command does not run, see
[`docs/troubleshooting.md`](docs/troubleshooting.md).

## Smoke tests

The repo ships a fixed set of smoke tests in
[`docs/smoke-tests.md`](docs/smoke-tests.md). They are short scripts you can
run by hand inside Roo Code or Zoo Code to verify routing, mode boundaries,
and skill loading. The first one — README tweak with no slash command —
takes about a minute.

When the orchestrator asks which workflow to use, **type the number
manually**, for example `1`. Do not click suggestions that contain slash
commands or mode names — clicking them can route incorrectly. See
[`docs/troubleshooting.md`](docs/troubleshooting.md#clickable-suggestions-can-route-incorrectly).

Example choice list:

```text
1. /tweak — small known implementation change
2. /update-docs — documentation-focused change
3. Hold — I will specify more detail

Reply by typing only the number, e.g. 1.
```

Worked examples for the most common flows live in
[`examples/`](examples/):

- [`tweak-smoke-test.md`](examples/tweak-smoke-test.md)
- [`fix-flow.md`](examples/fix-flow.md)
- [`feature-flow.md`](examples/feature-flow.md)

## Screenshots

Screenshots and short clips of the orchestrator routing, the architect
hand-off, and the tweaker running a slash command will land in
[`assets/`](assets/) before the first tagged release.

## Roadmap

- `templates/minimal/` — a stripped-down template with only the three modes,
  the path-safety rules, and `/tweak` + `/fix`.
- Optional CI workflow that runs the smoke-test JSON validation on every
  PR.
- A short demo video in `assets/`.
- ADRs covering the three-mode split, the routing matrix, and the
  path-safety choice.
- Guidance on integrating Roo Flow alongside other workflow tools.

## How this is different

Roo Flow is not a methodology and it is not a giant skills pack. It is a
**Roo / Zoo-native control plane**: a thin layer that turns three modes,
a routing matrix, and a path-safety contract into a predictable workflow.

For a longer comparison with adjacent projects, see
[`docs/comparison.md`](docs/comparison.md).

## Inspiration

This project was inspired by Matt Pocock's agent-skills workflow ideas
and his emphasis on small, composable, task-focused skills for coding
agents.

Roo Flow is not affiliated with, endorsed by, or maintained by Matt
Pocock. It is an independent Roo / Zoo Code workflow-control template
focused on custom modes, delegation, command routing, and smoke-tested
agent workflows.

## License

[MIT](LICENSE).
