# Overview

Zoo Flow is a small, opinionated template that turns
[Zoo Code](https://docs.zoocode.dev/) into a predictable mode +
command + skill orchestrator. It defines three modes, a fixed routing
matrix, a command protocol, and path-safety rules. Drop it into a
workspace and your AI assistant stops freelancing.

## Why this exists

Out of the box, AI coding assistants tend to skip planning when you
want planning, plan when you want a tweak, and quietly invent file
paths that do not exist. Adding a pile of skills makes it worse.

Zoo Flow takes a different bet:

- A **router mode** chooses the workflow.
- An **architect mode** plans, diagnoses, and triages — and cannot
  edit source code.
- A **tweaker mode** implements, runs tests, prototypes, and commits —
  only when explicitly approved.
- A small set of **slash commands** acts as the public API between
  you and the modes.
- A few **always-on rules** keep the path layout honest and stop
  skill paths from drifting under `.roo/rules/`.

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

For the deeper "why", see [`philosophy.md`](philosophy.md). For the
component-level reference, see [`architecture.md`](architecture.md).
