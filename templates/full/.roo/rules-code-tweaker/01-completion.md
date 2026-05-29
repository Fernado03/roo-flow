# Code Tweaker Completion

A delegated task is the **entire command chain**, including every phase and mode switch the command body defines — not the single phase you are currently running.

Choose your exit by where you are in that chain:

- **More phases remain** (a later phase is assigned to `system-architect`, e.g. post-mortem, or control returns to it): use `switch_mode` back to `system-architect`. Never `attempt_completion` mid-chain.
- **You are running the command's final phase** and it is complete or blocked: use `attempt_completion` to return to the orchestrator.

If you entered this window via `switch_mode` (you are mid-chain, not the entry point) and any phase remains, you hand back with `switch_mode`. Only the command's final phase returns to the orchestrator.

Before any `attempt_completion`, re-read the command body and confirm no later phase is assigned to another mode. If one is, `switch_mode` instead.

`attempt_completion` must include:

- what was done
- files changed or inspected
- commands/tests run
- status
- blockers
- recommended next command

Before running `git commit` or `git push`, halt and wait for explicit user approval. Never push unless explicitly asked.
