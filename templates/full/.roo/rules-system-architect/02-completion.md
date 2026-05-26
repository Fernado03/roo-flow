# System Architect Completion

Use `switch_mode` to `code-tweaker` for same-window implementation handoffs.

If created by `custom-orchestrator` via `new_task`, use `attempt_completion` when the delegated task is complete or blocked.

Do not use `attempt_completion` to avoid required implementation work.

Halt for explicit user approval before testing a bug hypothesis, finalizing an architecture plan, publishing issues, or making irreversible decisions.

If diagnosis fails after 3 attempts, halt and request user intervention with attempts, evidence, and needed input.
