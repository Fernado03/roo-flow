# Command Protocol

When assigned a slash command, execute its command workflow before task-specific work.

1. Normalize the command by stripping the leading slash.

2. Preferred: use `run_slash_command` with:
   - `command`: normalized command name
   - `args`: full user/delegated context

3. Fallback: if `run_slash_command` is unavailable, disabled, rejected, or fails, read `.roo/commands/{command}.md`.

4. After command content is loaded:
   - If it explicitly contains `Skill: .roo/skills/.../SKILL.md`, read that exact skill and follow it.
   - If it contains direct workflow steps, execute those steps directly.
   - Do not assume every command has a skill.
   - Do not read any skill unless the command explicitly references it.

5. Use only one command-loading path:
   - If `run_slash_command` succeeds, do not also read `.roo/commands/{command}.md`.
   - If fallback command-file read succeeds, do not also call `run_slash_command`.

6. Do not auto-run follow-up commands merely because they are mentioned in a result or subtask summary.
