# Comparison and positioning

A few projects in the agentic-coding space share vocabulary with Zoo
Flow — "skills", "agents", "commands". They are doing different things.
This page is meant to make the differences clear so you can pick the
right tool for the job.

## Short version

- **Superpowers** is a broad methodology and skills library. The center
  of gravity is the *skills*: a large, well-curated collection of named
  techniques the agent can pull in.
- **ECC (Extended Coding Companion / "extended coding context")** is a
  large agent harness. The center of gravity is the *runtime*: a rich
  agent loop, memory, and tooling stack.
- **Zoo Flow** is a Zoo Code-native workflow control plane. It focuses
  on mode-safe delegation, slash-command routing, path-safe skill
  loading, and smoke-tested workflows. The center of gravity is the
  *contract*: three modes, a routing matrix, a command protocol, and a
  path-safety guarantee, validated by a small smoke-test suite.

These projects are complementary more than competitive. You can run a
broad skills library inside Zoo Flow's three-mode contract, and you can
plug Zoo Flow's commands into a richer harness if you have one.

## What Zoo Flow is not

- It is not a replacement for a methodology like Superpowers. If you
  want a long, opinionated guide to *how to think* about agentic
  coding, look there.
- It is not a runtime. Zoo Flow runs inside Zoo Code; it does not ship
  its own agent loop, memory store, or tool registry.
- It is not a giant skills pack. The bundled skills are a starting
  point. The control plane is the product.

## What Zoo Flow is

- A `.roomodes` file that defines three custom modes with deliberate
  tool-group boundaries.
- A handful of always-on rules: path safety, command protocol, skills
  index, and a bucket-layout note.
- A directory layout for slash commands and on-demand skills.
- A short, fixed set of smoke tests that catch the failure modes that
  matter in practice: routing drift, mode boundary violations, skill
  path drift, slash command leakage.

If you only adopt one piece of Zoo Flow, adopt the path-safety rule and
the command protocol. Those two files alone fix most of the "agent
hallucinated a path" problems.

## When to pick Zoo Flow

- You are using Zoo Code as your primary host.
- You want a small, validated control plane more than a big skill set.
- You care about the mode boundary between planning and implementation.
- You want explicit human-in-the-loop checkpoints in multi-phase flows
  like `/fix` and `/feature`.

## When to pick something else

- You want a comprehensive methodology and a broad skill set out of the
  box. Superpowers and similar projects are a better fit.
- You are not on Zoo Code and you do not plan to be. Zoo Flow leans on
  `customModes`, `run_slash_command`, `new_task`, and `switch_mode`
  semantics from that host.
- You want a full agent runtime with its own loop and memory layer.
  ECC-style harnesses are aimed at that.

## Working alongside other projects

Zoo Flow plays well with broader skills libraries. The skills under
`templates/full/.roo/skills/` follow a standard `SKILL.md` format and
are loaded by command. If you want to bring in a skill from another
project, drop it under the right bucket, add a one-line entry to the
bucket `README.md` and to `02-skills-index.md`, and reference it from
a command file. The control plane does not care where the skill came
from.

The opposite direction works too: if you want to take just the modes
and the command protocol into a different setup, that is two files
(`.roomodes` and `01-command-protocol.md`) plus the path-safety rule
(`00-paths.md`).

## Respect

The projects mentioned here are the work of people who care about this
problem space. Zoo Flow exists because their work raised the bar.
Where Zoo Flow disagrees with them, it disagrees on tradeoffs, not on
intent.
