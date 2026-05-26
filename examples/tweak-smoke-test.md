# Example: tweak smoke test

A minimal end-to-end run that exercises the orchestrator → tweaker path
without any architecture work. Use it as the first thing you try after
copying the template into a workspace. Total runtime: about a minute.

## Goal

Make a small, obviously-safe edit to `README.md` so you can confirm
routing, command protocol, and path safety all work.

## Setup

- Copy `templates/full/.roo` and `templates/full/.roomodes` into your
  target workspace. (See [`README.md`](../README.md#install).)
- Open the workspace in an editor running Roo Code or Zoo Code.
- Make sure `README.md` exists at the workspace root. Any existing
  README is fine.
- Switch to `🪃 Custom Orchestrator`.

## Step 1 — free-form request, no slash command

In the chat, type:

```
Tweak the README so the install section mentions Windows first.
```

**Expected**

The orchestrator does not edit anything. It proposes one or two
commands (typically `/tweak`, possibly `/update-docs`) and halts,
waiting for you to choose.

**Why this matters**

The orchestrator has no tool groups. If you see it editing files, the
groups list in `.roomodes` is wrong.

## Step 2 — pick the command

Type:

```
/tweak Move the Windows install section to the top of README.md.
```

**Expected**

The orchestrator delegates with `new_task` to `code-tweaker`. The
delegated message includes:

- `/tweak` (slash form).
- `tweak` (normalized name).
- The user context.
- A pointer to `.roo/rules/01-command-protocol.md`.
- A reminder that skills live under `.roo/skills/...`.
- A completion rule asking for `attempt_completion` with summary,
  files changed, commands run, blockers, and a recommended next
  command.

**Why this matters**

This is the only place `new_task` is used in the flow. The orchestrator
must not use `switch_mode`.

## Step 3 — tweaker runs the command

The new task window switches to `⚡ Code Tweaker`. The tweaker should:

1. Try `run_slash_command` with `command: "tweak"`. If unavailable,
   fall back to reading `.roo/commands/tweak.md`.
2. Read `.roo/skills/engineering/tweak/SKILL.md` per the skill
   reference in the command file.
3. Make the edit to `README.md`.
4. Finish with `attempt_completion`.

**Expected output (paraphrased)**

> Done. Files changed: `README.md`. Commands run: none. Status:
> success. Blockers: none. Recommended next command:
> `/commit-and-document`.

**Why this matters**

If you see any read against `.roo/rules/skills/...`, path safety is
broken. Stop and follow the
[`troubleshooting.md`](../docs/troubleshooting.md#roorulesskills-enoent)
fix.

## Step 4 — orchestrator summarizes and halts

The orchestrator receives the `attempt_completion` payload, summarizes
it for you, and halts. It does **not** auto-launch
`/commit-and-document` even though the tweaker recommended it.

If the orchestrator does auto-launch, you have a slash-command leakage
bug. See
[`troubleshooting.md`](../docs/troubleshooting.md#slash-command-leakage-from-subtask-summaries).

## Pass criteria

- [ ] Orchestrator did not edit any file.
- [ ] Orchestrator proposed `/tweak` before doing anything.
- [ ] Orchestrator delegated via `new_task`, not `switch_mode`.
- [ ] Tweaker invoked the command via the protocol.
- [ ] Tweaker read the skill from `.roo/skills/...`, not
      `.roo/rules/skills/...`.
- [ ] Tweaker finished with `attempt_completion`.
- [ ] Orchestrator halted after summarizing.

If every box is checked, the control plane is working. You are ready to
run the full smoke-test set in
[`docs/smoke-tests.md`](../docs/smoke-tests.md).
