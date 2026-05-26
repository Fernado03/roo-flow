# Contributing to Zoo Flow

Thanks for your interest. Zoo Flow is a workflow control plane for
[Zoo Code](https://docs.zoocode.dev/). Contributions that keep it
small, validated, and predictable are very welcome.

## Ground rules

- Keep the template lean. Zoo Flow is not a giant skills pack; it is a
  control plane. New skills are accepted only when they pull their weight
  inside an existing command flow.
- Preserve path safety. Skills always live under
  `templates/full/.roo/skills/{bucket}/{skill}/SKILL.md`. Never reference
  skills under `.roo/rules/` or relative to a command file. See
  [`docs/architecture.md`](docs/architecture.md) and
  [`templates/full/.roo/rules/00-paths.md`](templates/full/.roo/rules/00-paths.md).
- Don't commit secrets, local journals, `.env`, or project-private notes.
- Do not rename the `.roo/` paths. `.roomodes`, `.roo/commands/`, and
  `.roo/rules-{mode-slug}/` are the official Zoo Code configuration
  paths and stay unchanged.

## What kinds of changes are easy to land

- Documentation and README clarifications.
- New slash commands that follow the protocol in
  [`templates/full/.roo/rules/01-command-protocol.md`](templates/full/.roo/rules/01-command-protocol.md)
  and route through the existing modes.
- New skills under an existing bucket, with a one-line entry added to
  [`docs/skills-index.md`](docs/skills-index.md)
  and the bucket `README.md`.

## What needs a discussion first

- New custom modes. The current three modes are deliberate; adding a fourth
  changes the routing matrix and orchestrator behavior.
- Changes to the orchestrator's `Routing Matrix` in `.roomodes`.
- Changes to path-safety rules.

Open an issue to talk through these before sending a PR.

## Local checks

Before opening a pull request:

1. Validate `.roomodes` JSON.
   ```sh
   python -m json.tool templates/full/.roomodes >/dev/null
   ```
2. Confirm no skill paths leak into `rules/skills/`.
   ```sh
   grep -RIn --exclude-dir=.git -E '\.roo/rules/skills|rules/skills' templates/full || true
   ```
   The only legitimate match is the path-safety rule that explicitly forbids
   that pattern.
3. Confirm no obvious secrets are present.
   ```sh
   grep -RIn --exclude-dir=.git -E 'OPENAI_API_KEY|ANTHROPIC_API_KEY|apiKey|password|secret|token' .
   ```
   Hits inside skill or command guidance about *redacting* secrets are fine;
   actual values are not.

## Pull request checklist

- [ ] `.roomodes` is valid JSON.
- [ ] No new skill paths under `.roo/rules/`.
- [ ] No secrets, no local journals, no `.env`.
- [ ] `CHANGELOG.md` updated under `## [Unreleased]`.
- [ ] If you added a skill, it appears in the bucket `README.md` and in
      `docs/skills-index.md`.

## Code of conduct

Be respectful. Disagree on substance. Critique work, not people. We will
add a formal Code of Conduct file as the project grows.
