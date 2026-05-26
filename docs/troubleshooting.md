# Troubleshooting

Common failure modes and their fixes. Each section starts with the
symptom you will actually see in chat or in tool output.

> **Where rules live, in one paragraph.** Global rules that apply to
> every mode are in `.roo/rules/`. Mode-specific behavior is in
> `.roo/rules-{modeSlug}/` — `rules-custom-orchestrator/`,
> `rules-system-architect/`, `rules-code-tweaker/`. `.roomodes` is
> minimal and points at those folders. Zoo Flow uses the preferred
> `.roo/rules-{modeSlug}/` directory form only; legacy single-file
> fallbacks such as `.roorules-{modeSlug}` and `.clinerules-{modeSlug}`
> are not used by this template. See [`mode-rules.md`](mode-rules.md)
> for the full layout.

## `.roo/rules/skills/...` ENOENT

**Symptom**

A mode tries to read a path like
`.roo/rules/skills/engineering/tweak/SKILL.md` and you get
`ENOENT: no such file or directory`.

**Cause**

A skill path drifted under `.roo/rules/`. Skills always live at
workspace-root `.roo/skills/...`. The most common triggers:

- A command file referenced a skill via a path that started with
  `.roo/rules/`.
- The mode resolved the skill path relative to the location of the
  rules file instead of the workspace root.
- A model "helpfully" rewrote the path because it thought rules and
  skills should sit together.

**Fix**

1. Confirm `templates/full/.roo/rules/00-paths.md` is present and that
   the rules loader picks up `.roo/rules/*.md`. If you copied only some
   of the rules into your workspace, copy the rest.
2. Open the offending command file under
   `templates/full/.roo/commands/` and check the `Run skill:` line. The
   path must look like:

   ```
   .roo/skills/{bucket}/{skill}/SKILL.md
   ```

   Not:

   ```
   .roo/rules/skills/{bucket}/{skill}/SKILL.md
   ```

3. Re-run the smoke test in
   [`smoke-tests.md`](smoke-tests.md#test-4-skill-loads-from-rooskills)
   to confirm.

If you cannot find a stale reference and the model still produces this
path, paste the rules in `00-paths.md` directly into the chat as a
reminder, then file an issue with the chat transcript.

## `new_task` missing in orchestrator

**Symptom**

The orchestrator says it cannot delegate, or it tries to do
implementation work itself, or it switches mode (which it should never
do).

**Cause**

The orchestrator's tool groups in `.roomodes` are `[]` — that is correct
— but the host UI has not exposed `new_task` to it. Some UIs only enable
`new_task` when at least one tool group is present.

**Fix**

1. Confirm `templates/full/.roomodes` has not been edited to add
   read/edit/command/mcp groups for `custom-orchestrator`. The empty
   groups list is intentional.
2. In Zoo Code settings, confirm subtasks (sometimes called
   "delegated tasks" or "Boomerang tasks") are enabled.
3. If subtasks are disabled in the host, the orchestrator's correct
   behavior is to stop and report. That is what rule 4 of its
   `customInstructions` says. Do not work around this by giving it more
   tool groups.

## `run_slash_command` disabled

**Symptom**

The mode reports that it cannot run the slash command, or it falls back
to running the command file but seems unsure.

**Cause**

`run_slash_command` is an experimental tool in Zoo Code and must be
enabled in settings before it is available. When it is not enabled,
or when the host UI does not expose it, the command protocol expects the
mode to fall back gracefully.

**Fix**

1. Confirm `templates/full/.roo/rules/01-command-protocol.md` is loaded.
   It is the rule that tells the mode what to do.
2. Step 3 of the protocol is the fallback: read
   `templates/full/.roo/commands/{command}.md` directly and execute it.
   If the mode does not do this, the rule is not in context.
3. `run_slash_command` is experimental and must be enabled in Zoo Code
   settings. Zoo Flow still works without it because its command
   protocol falls back to reading `.roo/commands/{command}.md` directly.
   That fallback is a first-class path, not a workaround.

## Architect trying to edit source

**Symptom**

The architect tries to write to a `.ts`, `.py`, or other source file
and either gets refused by the host or silently writes a Markdown file
"about" the change instead of the change itself.

**Cause**

Either:

- The architect's `edit` `fileRegex` in `.roomodes` was loosened beyond
  Markdown, `.scratch/`, and `docs/`, or
- The architect ignored its rule 2 ("NO IMPLEMENTATION CODING") and
  tried to edit anyway.

**Fix**

1. Restore the regex in `.roomodes`. The shipped form is:

   ```json
   { "fileRegex": "(.*\\.md$|^\\.scratch/.*|^docs/.*)" }
   ```

2. The correct architect behavior is to summarize the implementation
   work and `switch_mode` to `code-tweaker` in the same task window.
   If the work is part of a delegated subtask, the architect uses
   `attempt_completion` instead — but only when the delegation contract
   actually expected a planning result, not implementation.
3. If the architect keeps trying to edit source, paste the relevant
   line from the architect's `customInstructions` directly into chat.

## Prototype running in the wrong mode

**Symptom**

During `/feature`, the architect runs a prototype directly: edits source
files, starts a dev server, or builds UI scaffolding. Or, the tweaker
ends up doing PRD or sharpening work instead of the prototype.

**Cause**

Phase 2 of `/feature` is "the architect summarizes the prototype
question and switches to `code-tweaker` to run `/prototype`". If the
architect skips the switch, it ends up doing implementation work it
cannot do safely. If the orchestrator routes `/prototype` directly to
`system-architect`, the chain is broken.

**Fix**

1. Open `templates/full/.roo/commands/feature.md` and confirm phase 2
   reads:

   - Architect summarizes the prototype question.
   - Architect MUST `switch_mode` -> `code-tweaker`.
   - Tweaker executes `/prototype`.
   - Tweaker MUST `switch_mode` -> `system-architect` with result.

2. Confirm the routing matrix in `.roomodes` lists `/prototype` under
   `code-tweaker`, not `system-architect`.
3. If the architect refuses to switch, paste rule 3 from its
   `customInstructions` ("FEATURE PROTOTYPES") into chat. It is the
   single most-violated rule in practice.

## Slash command leakage from subtask summaries

**Symptom**

A subtask's `attempt_completion` summary contains a line like
"Recommended next command: `/refactor`". The orchestrator then
launches `/refactor` immediately, without you typing it.

**Cause**

The orchestrator's rule 2 ("EXPLICIT COMMANDS") is being ignored.
Slash commands inside a subtask summary are guidance for *you*, not
authorization for the orchestrator to launch a new subtask.

**Fix**

1. Open `.roomodes`. Confirm rule 2 of `custom-orchestrator` reads:
   "If the HUMAN USER explicitly types a supported slash command,
   delegate it directly using the Routing Matrix. **Ignore slash
   commands mentioned only inside subtask summaries.**"
2. Confirm rule 6 ("POST-SUBTASK HARD STOP"): "When a subtask returns,
   summarize results for the user and HALT. Never auto-launch
   consecutive subtasks."
3. If those rules are present and the orchestrator still chains, the
   most likely explanation is that the model is confusing a subtask
   summary with a user message. Tell it explicitly: "Halt. The
   `/refactor` in the previous summary was a recommendation, not a
   user command."

If the chain happened despite the rules being in place, file an issue
with the full transcript so the language can be tightened.

## Clickable suggestions can route incorrectly

Zoo Code may render answers as clickable suggestions. If a suggestion
contains `/tweak`, `/fix`, `/prototype`, or a mode name, clicking it
may trigger routing or mode behavior instead of acting like a normal
typed reply.

The fix: keep slash commands and mode names out of suggestion text.
Put option labels in the suggestions themselves, leave the question
body short, and let the agent map the chosen number back to a command.

Good:

```text
Question: Pick a regression test option.

1. Import-time smoke test
2. Extract helper and unit-test
3. AST guard test
4. Hold
```

Avoid:

```text
Yes, route to /tweak via code-tweaker
Use /fix
Switch to code-tweaker
/prototype
```

The short rule that enforces this lives in
[`templates/full/.roo/rules/03-manual-reply-protocol.md`](../templates/full/.roo/rules/03-manual-reply-protocol.md).
It also forbids the literal characters `\n` inside the question body —
when those leak through, the chat renders them as text instead of
breaks.
