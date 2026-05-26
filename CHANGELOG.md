# Changelog

All notable changes to Roo Flow are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project
aims for [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/your-org/roo-flow/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/your-org/roo-flow/releases/tag/v0.1.0
