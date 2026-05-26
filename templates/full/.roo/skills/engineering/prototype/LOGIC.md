# Logic Prototype

Use for business logic/state/data-model questions.

## Process

1. State question in README/top comment: state model? uncertainty?
2. Use host language/runtime/tooling; ask if unclear.
3. Isolate portable pure logic: reducer, state machine, pure fns, or class/module with small surface.
4. DO NOT put terminal/IO/console in logic module.
5. Build minimal TUI:
   - Init in-memory state.
   - Render whole frame on start and after each action.
   - State first, shortcuts second.
   - ANSI bold/dim ok.
   - Read one key/line at a time.
   - Loop until quit.
6. Add one command via existing task runner: `pnpm run {prototype-name}`.
7. If no runner, document command at top of README.
8. Hand over run command.
9. If verdict unknown, write `NOTES.md` beside prototype.

## Rules

- No tests.
- No real DB unless persistence is question; then scratch DB/file clearly marked prototype.
- No generalising.
- TUI shell throwaway; portable logic may be lifted.
