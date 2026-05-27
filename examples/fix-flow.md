# Example: `/fix` flow

A worked example of the multi-phase `/fix` chain: orchestrator delegates
to the architect, architect diagnoses, architect switches to the tweaker
to implement, tweaker switches back, architect runs the post-mortem,
tweaker prepares the commit. The whole flow has explicit HITL stops.

## Setup

- Active mode: `🪃 Custom Orchestrator`.
- Workspace has a real bug to fix. For this example, assume:

  > "The login button does nothing on the second click. First click
  > works."

## Phase 1 — orchestrator routes

Type:

```
/fix The login button does nothing on the second click. First click works.
```

**Expected**

Orchestrator looks up the routing matrix and delegates with `new_task`
targeting `system-architect`. The delegated message includes the
slash form, user context, proceed policy, command-protocol pointer,
skills location, and the completion rule.

## Phase 2 — architect diagnoses

The new task window opens in `🏗️ System Architect`. The architect:

1. Loads `/fix` per the command protocol.
2. Runs the `diagnose` skill, phases 1–3.
3. Produces a short list of hypotheses.
4. **Halts** and asks you to pick one.

**Expected message (paraphrased)**

> Hypotheses:
> 1. Click handler is wired once and never re-bound after a state change.
> 2. The button enters a disabled state on first click and never resets.
> 3. A queued network request is canceling the second click's handler.
>
> Which would you like to instrument? (1 / 2 / 3)

You answer:

```
2
```

## Phase 3 — architect instruments

The architect runs phase 4 of the `diagnose` skill on hypothesis 2.
This phase may involve reading state-management code, adding a
console-log or instrumentation suggestion (Markdown only — the architect
cannot edit source), and producing a confirmed root cause.

**Expected**

> Root cause confirmed: `LoginButton` sets `disabled` on the first
> click and the `onSuccess` handler does not reset it. The second
> click is being absorbed by the disabled state.

The architect summarizes the proposed fix and prepares to hand off.

## Phase 4 — architect switches to tweaker

The architect calls `switch_mode` to `code-tweaker` **inside the same
task window** with a summary of:

- The root cause.
- The proposed fix (`onSuccess` resets `disabled`).
- The files involved.
- The tests to add or extend.

The tweaker takes over without losing context.

## Phase 5 — tweaker implements

The tweaker:

1. Edits the `LoginButton` component to reset `disabled` on success
   and on error.
2. Adds or extends tests covering the second-click case.
3. Runs the test suite.
4. Reports back.

**HITL stop**: the tweaker does not commit. Per the git rule, it waits
for your approval.

## Phase 6 — back to architect for post-mortem

The tweaker calls `switch_mode` back to `system-architect`. The
architect runs phase 6 of `diagnose` (post-mortem):

- What was the original assumption that masked the bug?
- Is this an isolated mistake or a pattern?
- If a pattern, would `/refactor` help?

The architect produces a short post-mortem note in `docs/` or
`.scratch/` (Markdown only) and either drops the matter there or
suggests `/refactor`.

## Phase 7 — tweaker prepares the commit

The architect switches back to the tweaker. The tweaker suggests
`/commit-and-document`. **The orchestrator does not auto-launch it.**
That command runs only when you type it.

## Phase 8 — return to orchestrator

When the chain is complete (or blocked), the active mode calls
`attempt_completion`. The orchestrator summarizes for you and halts.

## Pass criteria

- [ ] Orchestrator delegated to `system-architect`, not the tweaker.
- [ ] Architect halted after phase 3 hypotheses, did not instrument
      until you picked one.
- [ ] Architect did not edit source code at any point.
- [ ] Architect used `switch_mode` (same window) to hand off, not
      `new_task`.
- [ ] Tweaker did not run `git commit` or `git push` without your
      explicit approval.
- [ ] After return, orchestrator halted instead of auto-launching
      `/commit-and-document`.

## Common slips

- Architect tries to edit source: see
  [`docs/troubleshooting.md`](../docs/troubleshooting.md#architect-trying-to-edit-source).
- Tweaker commits without approval: tighten the git rule in the
  tweaker's `customInstructions`.
- Orchestrator launches `/commit-and-document` automatically: see
  [`docs/troubleshooting.md`](../docs/troubleshooting.md#slash-command-leakage-from-subtask-summaries).
