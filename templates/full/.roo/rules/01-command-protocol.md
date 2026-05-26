# Command Protocol

When assigned a slash command, execute the command workflow before doing task-specific work.

Protocol:

1. Normalize the command by stripping the leading slash.
   - `/fix` becomes `fix`
   - `/tdd` becomes `tdd`

2. Preferred execution:
   - Use `run_slash_command` if available.
   - Pass `command` as the normalized command name.
   - Pass `args` as the full user/delegated task context.

3. Fallback execution:
   - If `run_slash_command` is unavailable, disabled, rejected, or fails, read the command file from:
     - `.roo/commands/<command>.md`

4. If the command file references a skill:
   - Read the exact `.roo/skills/...` path from the command file.
   - Follow the skill instructions after loading.

5. Do not auto-run follow-up commands merely because they are mentioned in a subtask summary.
   - Only the human user or orchestrator routing may authorize a new command.
