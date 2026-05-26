# Changelog

All notable changes to Zoo Flow are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project
aims for [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `templates/full/.roo/skills/engineering/commit-and-document/SKILL.md`
  — extracted the deterministic 7-step commit + journal procedure
  out of the command file so the command stays a thin pointer.
- `templates/full/.roo/skills/engineering/update-docs/SKILL.md` —
  extracted the "identify → read → verify → surgical edits →
  freshness → sanity → recommend next" procedure from the command
  file for the same reason.
- `templates/full/.roo/rules/02-three-failure-rule.md` — single
  canonical home for the "stop and surface after 3 failed attempts"
  rule. Applies globally across TDD, diagnosis, architecture probes,
  and any repeating loop. Replaces four near-duplicate copies that
  lived inside individual skills and mode rules.
- `Companion docs` section in
  `templates/full/.roo/skills/engineering/grill-with-docs/CONTEXT-FORMAT.md`
  defining the canonical names `FLOW.md`, `APP_MAP.md`,
  `ARCHITECTURE.md`, and `README.md`. `commands/explore.md` and
  `commands/update-docs.md` had been referencing these names without
  a definition; the names are now backed.
- `## References` section in
  `templates/full/.roo/skills/engineering/tdd/SKILL.md` linking the
  satellite docs (`tests.md`, `mocking.md`, `interface-design.md`,
  `deep-modules.md`, `refactoring.md`) that had been orphaned.

### Changed
- `templates/full/.roo/commands/commit-and-document.md` shrunk from
  ~200 lines to ~12. The command now states intent in one paragraph
  and points at the new skill. Same `mode: code-tweaker` frontmatter
  and `$ARGUMENTS` placeholder.
- `templates/full/.roo/commands/update-docs.md` shrunk from ~120
  lines to ~21 the same way. Keeps the "Do NOT use this for…"
  disambiguation and the prompt-when-empty rule; everything
  procedural moved to the skill.
- `templates/full/.roo/commands/feature.md` step 2 (PROTOTYPE) now
  points at `.roo/rules-system-architect/01-feature-prototype.md`
  instead of restating the architect→tweaker handoff. The rule file
  is the single source of truth for the handoff procedure.
- `templates/full/.roo/rules/03-manual-reply-protocol.md` rewritten
  to its final token-efficient form (~65 words). Workflow questions
  go in the message body; suggestions hold safe numbered
  plain-language options only. Slash commands, mode names, and
  executable routing text are forbidden in suggestions. Users reply
  by typing the number. The earlier "Pick X" example, the
  anti-example block, and the long suggestion-authoring rules are
  gone — `.roo/rules/` is loaded on every turn so the file is kept
  short on purpose.
- `templates/full/.roo/rules-custom-orchestrator/01-delegation-message.md`
  trimmed to two bullets (`command with slash`, `user context`).
  The receiving subtask already loads its own command-protocol
  rule, knows where skills live, and has its own completion
  contract, so restating those in the delegation message wasted
  tokens on every dispatch. The "Normalized command name" line that
  used to render alongside `Command: /refactor` is also gone.
- `templates/full/.roo/skills/engineering/grill-with-docs/SKILL.md`
  "Docs" section collapsed to a one-line pointer to
  `CONTEXT-FORMAT.md`, which is now the single source of truth for
  context-doc layout and detection.
- `templates/full/.roo/skills/engineering/setup-matt-pocock-skills/domain.md`
  "Layouts" section likewise collapsed to a pointer.
- `templates/full/.roo/skills/engineering/improve-codebase-architecture/HTML-REPORT.md`
  "Vocabulary" section collapsed to `See LANGUAGE.md.` (was a
  verbatim duplication).

### Removed
- The 3-failure rule was removed in-place from
  `templates/full/.roo/skills/engineering/tdd/SKILL.md`,
  `templates/full/.roo/skills/engineering/diagnose/SKILL.md`,
  `templates/full/.roo/rules-system-architect/02-completion.md`,
  and `templates/full/.roo/rules-code-tweaker/00-scope.md`. The new
  global rule `02-three-failure-rule.md` covers all four sites.

## [0.1.3] - 2026-05-26

### Removed
- Smoke-test infrastructure and references throughout the repo. The
  dedicated docs were not pulling their weight relative to the
  worked examples and the doctor command, and several places had
  drifted into using "smoke test" as filler. Specifically:
  - Deleted `docs/smoke-tests.md` and
    `examples/tweak-smoke-test.md`.
  - Dropped the "Smoke-tested" qualifier from the `README.md`
    tagline and from `package.json` `description`.
  - Removed the `README.md` "Smoke tests" section; the surviving
    worked examples (`fix-flow.md`, `feature-flow.md`) are now
    listed under "Worked examples".
  - Removed section "7. Smoke tests over correctness proofs" from
    `docs/philosophy.md`.
  - Trimmed smoke-test phrasing from `docs/comparison.md`,
    `docs/architecture.md`, and `docs/troubleshooting.md`.
  - Dropped the smoke-test ground rule, "easy to land" bullet,
    local-checks step, and PR checklist item from
    `CONTRIBUTING.md`.
  - Dropped the CI smoke-test bullet from `ROADMAP.md`.
  - Replaced the "Smoke test:" line in `bin/zoo-flow.js`
    post-install instructions with a neutral "Try a small request".
  - Renamed the example option label "Import-time smoke test" to
    "Import-time sanity check" in
    `templates/full/.roo/rules/03-manual-reply-protocol.md` and
    `docs/troubleshooting.md`. The phrase was incidental example
    text, not a reference to Zoo Flow's removed smoke-test suite,
    but it was renamed to avoid confusion.

  Validation now relies on `node bin/zoo-flow.js doctor` (the
  template still passes) and the worked examples. The previous
  smoke-test docs are recoverable from git history at tag
  `v0.1.2` if anyone wants to reintroduce them.

### Added
- `README.md` "Using it" section explains the two ways to drive Zoo
  Flow: free-form requests from `custom-orchestrator` (router-first,
  proposes a workflow) versus typing a slash command directly from
  any mode (Zoo Code switches to the command's configured mode and
  bypasses the orchestrator). Mirrors a one-line clarification in
  `docs/overview.md`.

### Changed
- `docs/troubleshooting.md` "Clickable suggestions can route
  incorrectly" and `templates/full/.roo/rules/03-manual-reply-protocol.md`
  now also call out Zoo Code's per-option mode-switch indicator (the
  small icon at the bottom-right of each suggestion). Clean label
  text alone is not enough; the indicator switches the active mode
  on click and must be left off for ordinary "pick a number"
  routing questions. The user-side guidance is simpler than the
  authoring rule: type the number, or click only when no indicator
  is shown.
- `README.md` softened the "Numbered choices ... are safe to click or
  type" line to reflect the indicator-based safety check rather than
  a claim about label content.

## [0.1.2] - 2026-05-26

### Changed
- `templates/full/.roo/rules/03-manual-reply-protocol.md` — workflow
  options now go in the suggestion labels (descriptive, no slash
  commands or mode names) instead of the question body. The body
  stays a single short prompt and must use real newlines, fixing a
  symptom where literal `\n\n` rendered as text in chat. Typed
  numeric replies remain valid.
- `docs/troubleshooting.md` updated to
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
- Documentation set: `philosophy.md`, `architecture.md`,
  `command-flow.md`, `troubleshooting.md`, `comparison.md`.
- Worked examples: `fix-flow.md`, `feature-flow.md`.
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

[Unreleased]: https://github.com/Fernado03/zoo-flow/compare/v0.1.3...HEAD
[0.1.3]: https://github.com/Fernado03/zoo-flow/releases/tag/v0.1.3
[0.1.2]: https://github.com/Fernado03/zoo-flow/releases/tag/v0.1.2
[0.1.1]: https://github.com/Fernado03/zoo-flow/releases/tag/v0.1.1
[0.1.0]: https://github.com/Fernado03/zoo-flow/releases/tag/v0.1.0
