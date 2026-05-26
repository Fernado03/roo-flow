---
name: to-issues
description: Break a plan, spec, or PRD into independently-grabbable issues on the project issue tracker using tracer-bullet vertical slices. Use when user wants to convert a plan into issues, create implementation tickets, or break down work into issues.
---

# To Issues

Issue tracker + label vocabulary should exist; run `/setup-matt-pocock-skills` if missing.

## Process

1. Use current context.
2. If user passes issue/path/URL, fetch/read full body + comments.
3. Explore codebase if needed; use glossary; respect ADRs.
4. Draft tracer-bullet issues: thin vertical slice; independently demoable/verifiable; prefer many thin; mark `HITL`/`AFK`, prefer `AFK`.
5. Present numbered breakdown: title; `HITL`/`AFK`; blockers; user stories.
6. Ask user to validate granularity/deps/HITL/AFK/merge/split.
7. Iterate until approved.
8. Publish in dependency order.
9. Apply `ready-for-agent` label unless instructed otherwise.
10. DO NOT close/modify parent issue.

## Issue template

```markdown
## Parent

{parent reference if any}

## What to build

{end-to-end behaviour; no stale file paths. Prototype decision snippets allowed if precise and trimmed.}

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Blocked by

- {blocking ticket}
```

If no blockers: `None - can start immediately`.
