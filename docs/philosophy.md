# Philosophy

Zoo Flow is built around a small number of opinions. They are listed here so
you can decide whether the template is a good fit before you adopt it.

## 1. The router should not write code

Most failure modes in agentic coding come from a single agent trying to do
three jobs at once: deciding what to do, planning how to do it, and doing
it. Zoo Flow splits those into three modes and refuses to collapse them.

- `custom-orchestrator` decides **what** to do, by mapping a request to a
  command from a fixed routing matrix.
- `system-architect` decides **how** to do it, in Markdown.
- `code-tweaker` does it.

The orchestrator has no `read`, `edit`, `command`, or `mcp` tool groups.
It cannot freelance into implementation work even if it wants to.

## 2. Slash commands are the public API

Free-form requests are fine, but the moment work starts, it goes through a
slash command. Commands are the only way the orchestrator delegates and
the only way modes know which workflow they are running.

This has two payoffs:

- A command name in chat is a checkable artifact. You can grep your history
  for `/fix` or `/feature` and know exactly which workflow ran.
- Each command file is a single, readable place to change behavior. No
  hunting through prompts.

Commands live at `templates/full/.roo/commands/{command}.md` and are loaded
through the protocol described in
[`architecture.md`](architecture.md#command-protocol).

## 3. Path safety beats cleverness

Skills always live at `templates/full/.roo/skills/{bucket}/{skill}/SKILL.md`.
Never under `.roo/rules/`. Never relative to the command file. Never invented
by the model.

This is enforced by `00-paths.md`, which ships as an always-on rule. If a
skill path drifts, the rule catches it. The cost is one rule file. The
benefit is no more `ENOENT` rabbit holes.

## 4. Same-window switches for tight loops, `new_task` for clean boundaries

There are two delegation primitives in Zoo Code:

- `switch_mode` keeps the same task window and hands the keyboard to a
  different mode. Cheap. Good for `/fix` going architect → tweaker → architect.
- `new_task` opens a delegated subtask with its own window. Expensive. Good
  for orchestrator handing real work to architect or tweaker.

Zoo Flow uses both, deliberately. The orchestrator only ever uses
`new_task`. Modes only ever use `switch_mode`. They never cross.

## 5. HITL hard stops are features

Several commands force a halt. `/feature` halts after sharpening, after
prototype, after PRD, after issues. `/fix` halts after diagnosis. The git
flow halts before commit. These are not friction; they are the points
where a human review is cheaper than a rollback.

## 6. The skill set is replaceable

The bundled skills are a starting point. You should expect to delete some,
add some, and rename a bucket. The control plane — modes, commands, rules —
is the part that should be stable.

If a skill cannot be invoked through a command, it does not belong in the
template.
