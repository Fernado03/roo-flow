# Changelog

All notable changes to Roo Flow are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project
aims for [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- `.roomodes` is now minimal. Each mode's `customInstructions` points at
  the matching `.roo/rules-{modeSlug}/` folder for detailed behavior.
- Mode behavior moved out of `.roomodes` into mode-rule files:
  - `.roo/rules-custom-orchestrator/00-routing.md`,
    `01-delegation-message.md`
  - `.roo/rules-system-architect/00-scope.md`,
    `01-feature-prototype.md`, `02-completion.md`
  - `.roo/rules-code-tweaker/00-scope.md`, `01-completion.md`

### Added
- `.roo/rules-custom-orchestrator/` — new mode-rules folder for the
  orchestrator.
- `docs/mode-rules.md` — documents the three-tier rule layout
  (`rules/`, `rules-{modeSlug}/`, `skills/`) and the deprecation of
  `.roorules-{modeSlug}` and `.clinerules-{modeSlug}` single-file forms.
- `docs/out-of-scope/` — long policy notes moved out of
  `.roo/rules/out-of-scope/` so they no longer load on every turn.

### Removed
- `templates/full/.roo/rules/out-of-scope/` — relocated to
  `docs/out-of-scope/`.
- `templates/full/.roo/rules-code-tweaker/README.md` and
  `templates/full/.roo/rules-system-architect/README.md` — auto-loaded
  README files were costing tokens every turn. Their content is now in
  `docs/mode-rules.md`.

## [0.1.0] - 2026-05-26

### Added
- Initial public release of the Roo Flow template.
- Three custom modes wired into `.roomodes`:
  - `custom-orchestrator` — router that proposes and delegates commands.
  - `system-architect` — planning, diagnosis, and triage (Markdown-only edits).
  - `code-tweaker` — implementation, TDD, docs, prototypes, commits.
- Slash commands under `templates/full/.roo/commands/` for every supported
  workflow (`/tweak`, `/tdd`, `/fix`, `/feature`, `/refactor`, `/explore`,
  `/triage`, `/prototype`, `/update-docs`, `/commit-and-document`,
  and supporting commands).
- Always-on rules under `templates/full/.roo/rules/`:
  - `00-claude.md` — bucket layout and personal/in-progress visibility rules.
  - `00-paths.md` — workspace-root path safety for skills and commands.
  - `01-command-protocol.md` — `run_slash_command` first, file fallback second.
  - `02-skills-index.md` — promoted skills index.
- Mode-scoped rules under `rules-code-tweaker/` and `rules-system-architect/`.
- On-demand skills under `templates/full/.roo/skills/` organized by bucket
  (`engineering/`, `productivity/`, `misc/`, `personal/`, `in-progress/`).
- Documentation set: `philosophy.md`, `architecture.md`, `smoke-tests.md`,
  `command-flow.md`, `troubleshooting.md`, `comparison.md`.
- Worked examples: `tweak-smoke-test.md`, `fix-flow.md`, `feature-flow.md`.
- MIT license, contributor guide, security policy, and `.gitignore`.

[Unreleased]: https://github.com/Fernado03/roo-flow/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Fernado03/roo-flow/releases/tag/v0.1.0
