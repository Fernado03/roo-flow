# Example: `/feature` flow

The `/feature` chain is the longest one Roo Flow ships. It exists
specifically because the most expensive mistakes happen when an agent
implements a feature it has not properly sharpened. The chain forces
the slow steps before any code is written.

## Setup

- Active mode: `🪃 Custom Orchestrator`.
- Example feature:

  > "Add a dark mode toggle to the settings page."

## Phase 1 — orchestrator routes

Type:

```
/feature Add a dark mode toggle to the settings page.
```

The orchestrator delegates with `new_task` to `system-architect`.

## Phase 2 — architect sharpens

The architect runs `grill-with-docs` to sharpen the request. Expect:

- Questions about target users and platforms.
- Questions about existing theming infrastructure.
- Questions about persistence (per-user, per-device, system-default).
- Updates to relevant docs.

**Hard stop**: the architect halts and asks:

> Prototype, or skip to PRD?

Answer one or the other. For this example:

```
Prototype.
```

## Phase 3 — prototype handoff (optional)

Because you chose Prototype:

1. Architect summarizes the prototype question, constraints, relevant
   context, and the decision the prototype is meant to settle.
2. Architect calls `switch_mode` to `code-tweaker` **in the same task
   window**.
3. Tweaker executes `/prototype` per the command protocol.
4. Tweaker calls `switch_mode` back to `system-architect` with the
   prototype result, run command or URL if any, and the decision needed.

**Hard stop**: architect halts and asks for your verdict on the
prototype.

This is the phase that breaks most often if the architect skips the
`switch_mode`. See
[`docs/troubleshooting.md`](../docs/troubleshooting.md#prototype-running-in-the-wrong-mode).

## Phase 4 — PRD

The architect runs `to-prd`, summarizing the prior phases in three
bullets and producing a PRD draft.

**Hard stop**: "Ready to slice into issues?"

Answer:

```
Yes.
```

## Phase 5 — slice into issues

The architect runs `to-issues`, producing a list of well-scoped issues.

**Hard stop**: wait for your approval of the issue list. Edit, drop,
or merge issues here. Once approved, the chain continues.

## Phase 6 — implement

The architect summarizes the approved issues and `switch_mode`s to
`code-tweaker`. The tweaker, for each issue:

1. Runs `/tdd` per the command protocol.
2. Implements the issue.
3. After each issue ships, suggests `/commit-and-document`.

The orchestrator does not auto-launch `/commit-and-document`. You run
it explicitly when you want the commit.

## Phase 7 — return

When the chain completes (or hits a blocker), the active mode calls
`attempt_completion`. The orchestrator summarizes and halts.

## Pass criteria

- [ ] Orchestrator delegated to `system-architect`.
- [ ] Architect halted after sharpening, asked for Prototype or PRD.
- [ ] If you picked Prototype, the architect used `switch_mode` to
      hand off; the architect did not run the prototype itself.
- [ ] Architect did not edit application source code at any point.
- [ ] Architect halted before producing the PRD, after the PRD, and
      after the issue list.
- [ ] Tweaker ran `/tdd` per issue, not freeform implementation.
- [ ] Tweaker did not commit without explicit approval.

## Why this chain has so many stops

Each hard stop is a place where the cheapest fix is "your input,
right now". A wrong sharpening assumption is cheap to correct in
phase 2, expensive after a PRD, and very expensive after an issue
slice. The hard stops are not friction — they are the design.
