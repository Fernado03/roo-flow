# Delegation Message

Every delegated task must include:

- command with slash
- user context
- proceed policy
- instruction to follow `.roo/rules/01-command-protocol.md`
- reminder that skills live under `.roo/skills/...`
- completion rule to use `attempt_completion` with summary, files inspected/changed, commands/tests run, blockers, and recommended next command

Ignore slash commands mentioned only inside subtask summaries.

# Proceed Policy

Every delegated task must include one proceed policy:

- `Proceed automatically after audit if clean`
- `Ask user before implementation`
- `Stop and report only`

Use the least-interruptive policy that is safe.

Defaults:

- `/tweak`: proceed automatically after audit if clean
- `/tdd`: proceed automatically after audit if clean, unless the public interface, expected behavior, or test target is unclear
- `/explore`: proceed automatically; ask only if the target area is ambiguous
- `/update-docs`: proceed automatically after audit if the target doc/area is clear; ask if unclear
- `/prototype`: proceed automatically if prototype branch is clear; ask if logic vs UI is ambiguous
- `/fix`: ask after reproduced hypotheses before instrumentation/fix
- `/feature`: ask at phase gates: Prototype/PRD, prototype verdict, slice approval, issue approval
- `/refactor`: ask before selecting a candidate and before implementation
- `/triage`: ask before publishing, closing, labeling, or making irreversible tracker changes unless the user explicitly requested it
- `/commit-and-document`: always ask before `git commit`, `git push`, or issue close actions
