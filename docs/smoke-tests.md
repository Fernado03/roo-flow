# Smoke tests

Run these by hand after any change to `.roomodes`, the rules, the
commands, or the bundled skills. Each test is a short script you can paste
into a Zoo Code chat. Each one has a clear pass condition.

The whole set takes about 10 minutes.

> Conventions
>
> - **You** = the human user.
> - **Orchestrator**, **Architect**, **Tweaker** refer to the three modes.
> - **Pass** is the observable behavior. **Fail** suggests where to look.

---

## Test 1: No-slash README tweak → orchestrator proposes `/tweak`

Verifies that the orchestrator does not freelance and does not implement.

**Setup**

- Active mode: `custom-orchestrator`.
- Workspace contains a `README.md`.

**Script**

```
Tweak the README so the install section mentions Windows first.
```

**Pass**

- Orchestrator does not edit any file.
- Orchestrator presents `/tweak` (and possibly `/update-docs`) as
  **numbered options** and asks you to manually type the number.
- Orchestrator halts. No `new_task` is launched yet.

**Reply (manual type)**

When the orchestrator asks which workflow to use, manually type `1` (or
whichever number matches `/tweak`). Do not click any suggestion that
contains a slash command or mode name. See
[`troubleshooting.md`](troubleshooting.md#clickable-suggestions-can-route-incorrectly).

**Fail diagnostics**

- If the orchestrator edited the file: tool groups for
  `custom-orchestrator` are not empty in `.roomodes`. The groups list must
  be `[]`.
- If it ran `new_task` immediately: the orchestrator's
  `customInstructions` is missing the "Consult when needed" rule, or the
  routing matrix is broken.

---

## Test 2: Approve `/tweak` → `new_task` to `code-tweaker`

Verifies that explicit slash commands route through `new_task`, not
`switch_mode`.

**Setup**

- Continue from Test 1.

**Script**

```
/tweak Move the Windows install section to the top of README.md.
```

**Pass**

- Orchestrator calls `new_task` with the tweaker as the target.
- The delegated message includes the command (`/tweak`), the normalized
  name (`tweak`), the user context, a reference to
  `.roo/rules/01-command-protocol.md`, and a reminder that skills live
  under `.roo/skills/...`.
- Tweaker takes over in a new task window.

**Fail diagnostics**

- If the orchestrator used `switch_mode`: this is a routing bug. The
  orchestrator must only use `new_task`.
- If `new_task` was unavailable: the orchestrator should have stopped
  and reported. See [`troubleshooting.md`](troubleshooting.md#new_task-missing-in-orchestrator).

---

## Test 3: Code-tweaker runs the slash command

Verifies that the tweaker honors the command protocol.

**Setup**

- Subtask in `code-tweaker` from Test 2.

**Pass**

- Tweaker either calls `run_slash_command` with `command: "tweak"` or
  reads `templates/full/.roo/commands/tweak.md` from the workspace
  template before doing the edit.
- Tweaker does not invent its own workflow.
- Tweaker finishes with `attempt_completion`, not `switch_mode`.

**Fail diagnostics**

- If the tweaker writes the change without invoking the command file:
  the command protocol rule is missing. Confirm
  `templates/full/.roo/rules/01-command-protocol.md` is present and that
  rules are loading.
- If `run_slash_command` is unavailable but the tweaker did not fall
  back: the protocol's step 3 is being ignored. See
  [`troubleshooting.md`](troubleshooting.md#run_slash_command-disabled).

---

## Test 4: Skill loads from `.roo/skills/...`

Verifies path safety. The most common production failure was modes
loading skills from `.roo/rules/skills/...`. This test catches it.

**Setup**

- Active mode: `code-tweaker`.

**Script**

```
/tweak Add a TODO comment to README.md that says "// zoo-flow smoke test".
```

**Pass**

- The tweaker reads `templates/full/.roo/skills/engineering/tweak/SKILL.md`
  (or `.roo/skills/engineering/tweak/SKILL.md` in a workspace where the
  template has been copied to root).
- No reads against any path under `.roo/rules/skills/...`.

**Fail diagnostics**

- If you see an `ENOENT` against `.roo/rules/skills/engineering/tweak/SKILL.md`:
  the path-safety rule is not loading or is being ignored. Confirm
  `templates/full/.roo/rules/00-paths.md` is in the rules directory and
  that the loader picks up `.roo/rules/*.md`.

---

## Test 5: `/feature` prototype switches to `code-tweaker`

Verifies that the architect does not run prototypes itself.

**Setup**

- Active mode: `custom-orchestrator`.

**Script**

```
/feature Add a dark mode toggle to the settings page.
```

When the architect reaches phase 1 and pauses for "Prototype OR skip to PRD?",
manually type the number that maps to Prototype (for example `1`):

```
1
```

Do not click a suggestion containing `/prototype` or a mode name. See
[`troubleshooting.md`](troubleshooting.md#clickable-suggestions-can-route-incorrectly).

**Pass**

- Architect summarizes the prototype question and constraints.
- Architect calls `switch_mode` with target `code-tweaker` **inside the
  same task window**.
- Tweaker executes `/prototype` per the command protocol.
- Tweaker calls `switch_mode` back to `system-architect` with the
  prototype result.
- Architect resumes phase 3 of `/feature`.

**Fail diagnostics**

- If the architect ran the prototype itself: the `system-architect` mode
  is missing rule 3 from its `customInstructions`, or its `edit` regex is
  too permissive.
- If the architect used `new_task` instead of `switch_mode`: same-window
  prototyping was lost. The architect's rules must say `switch_mode`.

---

## Test 6: `/fix` route goes to `system-architect`

Verifies the routing matrix for the diagnosis side.

**Setup**

- Active mode: `custom-orchestrator`.

**Script**

```
/fix Login button does nothing on the second click.
```

**Pass**

- Orchestrator calls `new_task` targeting `system-architect`, not
  `code-tweaker`.
- Architect runs the `diagnose` skill (phases 1–3) and halts to ask you
  which hypothesis to instrument.
- No source files are edited yet.

**Fail diagnostics**

- If routing went to `code-tweaker`: the routing matrix in the
  orchestrator's `customInstructions` is wrong. `/fix` belongs to
  `system-architect`.
- If the architect skipped the HITL stop: the `diagnose` skill is being
  bypassed. Re-check the command file and the skill's hard-stop language.

---

## Pass / fail summary

| # | Test                                                    | Pass condition                                            |
| - | ------------------------------------------------------- | --------------------------------------------------------- |
| 1 | No-slash README tweak                                   | Orchestrator proposes `/tweak`, halts                     |
| 2 | Approve `/tweak`                                        | Orchestrator delegates with `new_task` to tweaker         |
| 3 | Tweaker runs slash command                              | Tweaker uses protocol, ends with `attempt_completion`     |
| 4 | Skill loads from `.roo/skills/...`                      | No reads against `.roo/rules/skills/...`                  |
| 5 | `/feature` prototype routes to tweaker                  | Architect uses `switch_mode` to tweaker, returns          |
| 6 | `/fix` route to architect                               | Orchestrator delegates to architect; architect halts      |

If any test fails, fix the underlying rule, command, or mode definition,
not the test. The tests are deliberately small.
