# System Architect Completion

A delegated task is the **entire command chain**, including every phase and every mode switch the command body defines — not the single phase you are currently running.

Choose your exit by where you are in that chain:

- **More phases remain** (this or a later phase is assigned to `code-tweaker`, or control returns to you afterward): use `switch_mode`. Never `attempt_completion`. Writing a plan, diagnosis, or `.scratch/` notes is not "done" — it is a handoff. Switch to `code-tweaker` to implement.
- **You are running the command's final phase** and it is complete or blocked: use `attempt_completion` to return to the orchestrator.

If you entered this window via `switch_mode` (you are mid-chain, not the entry point) and any phase remains, you hand back with `switch_mode`. Only the command's final phase returns to the orchestrator.

Before any `attempt_completion`, re-read the command body and confirm no later phase is assigned to another mode. If one is, `switch_mode` instead.

Do not use `attempt_completion` to avoid required implementation work.

Halt for explicit user approval before testing a bug hypothesis, finalizing an architecture plan, publishing issues, or making irreversible decisions.
