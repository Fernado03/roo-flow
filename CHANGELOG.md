# Changelog

All notable changes to Zoo Flow are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project
aims for [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 2026-05-26

### Changed
- `templates/full/.roo/rules/03-manual-reply-protocol.md` — workflow
  options now go in the suggestion labels (descriptive, no slash
  commands or mode names) instead of the question body. The body
  stays a single short prompt and must use real newlines, fixing a
  symptom where literal `\n\n` rendered as text in chat. Typed
  numeric replies remain valid.
- `docs/troubleshooting.md` and `docs/smoke-tests.md` updated to
  match: clicking a numbered suggestion is safe because labels no
  longer carry slash or mode tokens.
- `README.md` softened the "type the number manually" guidance for
  the same reason.

## [0.1.1] - 2026-05-26

### Changed
- Trimmed `README.md` from ~240 to ~120 lines so the install command
  appears above the fold. Moved the "why this exists" rationale and
  the core-workflow mermaid diagram into a new `docs/overview.md`,
  and moved the roadmap into a new top-level `ROADMAP.md`. The
  runtime template (`.roomodes` and `.roo/`) is unchanged.

### Added
- `docs/overview.md` — rationale and core-workflow mermaid.
- `ROADMAP.md` — planned and considering items.

## [0.1.0] - 2026-05-26

First public npm release as `@fernado03/zoo-flow`.

### Added
- npm installer. Users can run
  `npx @fernado03/zoo-flow@latest init` from any project to copy the
  runtime template (`.roomodes` and `.roo/`) into the workspace. The
  installer backs up existing config to `.zoo-flow-backup/<timestamp>/`
  when run with `--force`. The CLI also exposes a `doctor` command to
  validate either the bundled template (`--template-only`) or the
  current project.
- `update` CLI command. Users can run
  `npx @fernado03/zoo-flow@latest update` from any project that already
  has Zoo Flow installed. The command backs up the current `.roomodes`
  and `.roo/` to `.zoo-flow-backup/<timestamp>/` and replaces them with
  the latest bundled template. `--dry-run` previews the operation
  without writing anything. If Zoo Flow is not installed yet, the
  command tells the user to run `init` instead.
- `bin/zoo-flow.js` — Node 18+ ES module CLI with `init`, `update`, and
  `doctor`.
- `package.json` declaring `@fernado03/zoo-flow` with the `zoo-flow`
  bin and a `files` allowlist that ships only `bin/`, `templates/`,
  `README.md`, and `LICENSE`. Repo-level `docs/`, `examples/`, and
  `assets/` are intentionally excluded.
- `docs/npm-publishing.md` documenting the publish workflow.
- Three custom modes wired into `.roomodes`:
  - `custom-orchestrator` — router that proposes and delegates commands.
  - `system-architect` — planning, diagnosis, and triage (Markdown-only edits).
  - `code-tweaker` — implementation, TDD, docs, prototypes, commits.
- Slash commands under `templates/full/.roo/commands/` for every supported
  workflow (`/tweak`, `/tdd`, `/fix`, `/feature`, `/refactor`, `/explore`,
  `/triage`, `/prototype`, `/update-docs`, `/commit-and-document`,
  and supporting commands).
- Always-on rules under `templates/full/.roo/rules/`:
  `00-paths.md`, `01-command-protocol.md`, `03-manual-reply-protocol.md`.
- Mode-scoped rules under `rules-custom-orchestrator/`,
  `rules-system-architect/`, and `rules-code-tweaker/`.
- On-demand skills under `templates/full/.roo/skills/` organized by bucket
  (`engineering/`, `productivity/`, `misc/`, `personal/`, `in-progress/`).
- `docs/skills-index.md` — human-facing reference index, kept outside
  `.roo/rules/` because that folder is loaded on every turn.
- `docs/mode-rules.md` documenting the three-tier rule layout.
- `docs/skill-maintenance.md` — repo-maintenance policy kept out of
  the runtime context.
- Documentation set: `philosophy.md`, `architecture.md`, `smoke-tests.md`,
  `command-flow.md`, `troubleshooting.md`, `comparison.md`.
- Worked examples: `tweak-smoke-test.md`, `fix-flow.md`, `feature-flow.md`.
- MIT license, contributor guide, security policy, and `.gitignore`.

### Changed
- Rebranded the project from Roo Flow to Zoo Flow. Zoo Code is now the
  primary target. The `.roo/` folder names, `.roomodes`,
  `.roo/commands/`, and `.roo/rules-{mode-slug}/` paths are kept
  unchanged because they are the official Zoo Code configuration paths.
- `.roomodes` is now minimal. Each mode's `customInstructions` points
  at the matching `.roo/rules-{modeSlug}/` folder for detailed behavior.

### Notes
- An unpublished pre-rebrand `0.1.0` of Roo Flow existed before the
  npm release. It was never published to a registry. The first
  publicly distributed `0.1.0` is this Zoo Flow release on npm.

[Unreleased]: https://github.com/Fernado03/zoo-flow/compare/v0.1.2...HEAD
[0.1.2]: https://github.com/Fernado03/zoo-flow/releases/tag/v0.1.2
[0.1.1]: https://github.com/Fernado03/zoo-flow/releases/tag/v0.1.1
[0.1.0]: https://github.com/Fernado03/zoo-flow/releases/tag/v0.1.0
