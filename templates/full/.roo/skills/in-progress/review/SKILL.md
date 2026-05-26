---
name: review
description: Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes — Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/PRD asked for?). Runs both reviews in parallel sub-agents and reports them side by side. Use when the user wants to review a branch, a PR, work-in-progress changes, or asks to "review since X".
---

# Review

Issue tracker should exist; run `/setup-matt-pocock-skills` if `docs/agents/issue-tracker.md` missing.

## 1. Fixed point

1. Use user-supplied commit/branch/tag/`main`/`HEAD~N` exactly.
2. If missing, ask: `Review against what — a branch, a commit, or main?`
3. Diff: `git diff {fixed-point}...HEAD`.
4. Commits: `git log {fixed-point}..HEAD --oneline`.

## 2. Spec

Order:
1. Issue refs in commits (`#123`, `Closes #45`, GitLab refs); fetch via `docs/agents/issue-tracker.md`.
2. User path.
3. Matching PRD/spec under `docs/`, `specs/`, `.scratch/`.
4. If none, ask. If no spec, skip Spec axis with `no spec available`.

## 3. Standards

Collect: `CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`, context docs, `docs/adr/`, `.editorconfig`, `eslint.config.*`, `biome.json`, Prettier config, `tsconfig.json`, `STYLE.md`, `STANDARDS.md`, `STYLEGUIDE.md`, similar.

## 4. Parallel sub-agents

Standards prompt: diff command; commits; standards files; report documented-standard violations per file/hunk; cite standard; hard vs judgement; skip tooling-enforced; under 400 words.

Spec prompt: diff command; commits; spec path/content; report missing/partial requirements, scope creep, wrong-looking implementation; quote spec line; under 400 words.

## 5. Aggregate

1. Present `## Standards` and `## Spec` separately.
2. DO NOT merge/rerank axes.
3. End with counts per axis + worst issue.
