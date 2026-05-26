---
name: setup-matt-pocock-skills
description: Sets up an `## Agent skills` block in AGENTS.md/CLAUDE.md and `docs/agents/` so engineering skills know this repo's issue tracker, triage label vocabulary, and domain doc layout. Run before first use of `to-issues`, `to-prd`, or `triage` — or if those skills appear to be missing issue tracker, triage label, or domain-doc configuration.
disable-model-invocation: true
---

# Setup Matt Pocock's Skills

Seeds repo config for issue tracker, triage labels, domain docs.

## Explore

Read/check:
1. `git remote -v` + `.git/config`.
2. Root `AGENTS.md`, `CLAUDE.md`.
3. Existing `## Agent skills` blocks.
4. Root `CONTEXT.md`, `CONTEXT-MAP.md`.
5. `docs/adr/`, `src/*/docs/adr/`.
6. `docs/agents/`.
7. `.scratch/`.

## Ask decisions one at a time

A. Issue tracker:
- Explain: issue tracker = where skills read/write issues/PRDs.
- Default: GitHub remote → GitHub; GitLab remote → GitLab; else offer choices.
- Choices: GitHub via `gh`; GitLab via `glab`; local markdown `.scratch/{feature}/`; other = ask one-paragraph workflow.

B. Triage labels:
- Explain: triage skill needs real label strings.
- Roles: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`.
- Default label string = role name; ask overrides.

C. Domain docs:
- Explain: skills read `CONTEXT.md` + ADRs.
- Choices: single-context root `CONTEXT.md` + `docs/adr/`; multi-context `CONTEXT-MAP.md` → per-context docs.

## Confirm before write

Show:
1. `## Agent skills` block.
2. `docs/agents/issue-tracker.md`.
3. `docs/agents/triage-labels.md`.
4. `docs/agents/domain.md`.

## Write

Root doc:
1. If `CLAUDE.md` exists, edit it.
2. Else if `AGENTS.md` exists, edit it.
3. Else ask which to create.
4. DO NOT create other doc when one exists.
5. Update existing `## Agent skills` block in place; no duplicates.

Block:

```markdown
## Agent skills

### Issue tracker

[one-line summary]. See `docs/agents/issue-tracker.md`.

### Triage labels

[one-line summary]. See `docs/agents/triage-labels.md`.

### Domain docs

[one-line summary]. See `docs/agents/domain.md`.
```

Seed files: GitHub=`issue-tracker-github.md`; GitLab=`issue-tracker-gitlab.md`; Local=`issue-tracker-local.md`; labels=`triage-labels.md`; domain=`domain.md`; other=workflow prose.

## Done

Report created/updated files. State engineering skills now read `docs/agents/*.md`; user may edit directly.
