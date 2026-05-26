# Manual Reply Protocol

For workflow choices, ask the question in the message body and list numbered options.

Clickable suggestions may use the plain-language option text, but must not contain slash commands, mode names, or executable routing text.

Users may reply with either the number or the option text.

Example:

1. Tweak small implementation
2. Diagnose bug
3. Hold

Safe suggestions:

- Tweak small implementation
- Diagnose bug
- Hold

Unsafe suggestions:

- `/tweak`
- `Switch to code-tweaker`
- `Route to system-architect`

Only treat slash commands as commands when manually typed by the user.
