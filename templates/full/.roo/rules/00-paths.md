# Path Safety

All skill and command paths are workspace-root paths.

Valid skill path form:

- `.roo/skills/{bucket}/{skill}/SKILL.md`

Valid command path form:

- `.roo/commands/{command}.md`

Commands and modes must load skills only from `.roo/skills/...`.

Never resolve skill paths relative to `.roo/rules/`, `.roo/rules-{mode}/`, or the command file location.

Invalid path forms include any skill path under `.roo/rules/`.
