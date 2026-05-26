# Delegation Message

Every delegated task must include:

- command with slash
- user context
- proceed policy
- instruction to follow `.roo/rules/01-command-protocol.md`
- reminder that skills live under `.roo/skills/...`
- completion rule to use `attempt_completion` with summary, files inspected/changed, commands/tests run, blockers, and recommended next command

Proceed policy must be one of:

- `Proceed automatically after audit if clean`
- `Ask user before implementation`
- `Stop and report only`

Ignore slash commands mentioned only inside subtask summaries.
