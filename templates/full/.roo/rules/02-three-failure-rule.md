# Three-Failure Rule

After 3 failed attempts at the same loop, test, hypothesis, or approach, stop and surface to the user rather than continuing.

When stopping, include:

- what was attempted
- exact errors or evidence
- the blocker
- what input is needed to proceed

Applies to TDD red-green cycles, diagnosis loops, architecture probes, and any other repeating task. Escalate via `switch_mode` or `attempt_completion` when running under another mode or orchestrator.
