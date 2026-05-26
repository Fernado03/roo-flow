# Manual Reply Protocol

For workflow choices, put options in the suggestions, not in the question body. Map the chosen number back to a command privately.

Suggestions:

- Descriptive labels OK.
- No slash commands or mode names.
- Include a Hold/Skip option when relevant.

Question body:

- One short prompt. Real newlines only; never the literal `\n`.
- Do not restate the options.

Typed numeric reply is always valid.

Example:

Question: Pick a regression test option.

1. Import-time smoke test
2. Extract helper and unit-test
3. AST guard test
4. Hold

Only treat slash commands as commands when manually typed by the user.
