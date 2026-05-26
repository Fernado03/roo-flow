---
name: update-docs
description: Update repo documentation (flow, app map, architecture, README, module docs) so it matches current code. Use when docs are stale and need to be reconciled with the codebase.
---

# Update Docs

Edit repo docs that explain how code works (flow docs, app/module maps, architecture overviews, README, module-local markdown). Surgical edits, not rewrites.

## 1. Identify target

Infer or ask for the target doc. Prefer existing docs over new ones:

- Subsystem flow → nearby flow doc.
- App-wide navigation/module map → app map doc.
- System-level structure → architecture doc.
- Setup/usage → `README.md`.

If the doc does not exist, ask before creating. Never invent a new doc location silently.

## 2. Read first

Read the target fully before editing. Also read nearby related docs (neighbouring flow docs, app/architecture docs, README, module-local docs). Match the existing style, structure, vocabulary, and detail level.

## 3. Verify against code

Inspect the code the doc describes. Update from code reality, not guesses. Check entrypoints, main functions/classes, data flow, state changes, side effects, deps, error/fallback paths, files involved.

Unverifiable claims → remove or move to an `Open questions` section. Never present guesses as facts.

## 4. Surgical edits

Default to small edits: keep useful sections, update stale ones, add missing flows, remove false claims, preserve heading style and tone. Rewrite the whole file only if it is too stale to salvage; if so, say why before editing.

## 5. Freshness block

If it fits the doc's style, add or update at the bottom:

```md
## Freshness

Last checked against code: YYYY-MM-DD
Relevant files checked:
- `path/to/file.py`
- `path/to/other_file.py`
```

Use today's date. Include only files actually inspected.

## 6. Sanity check

After editing: re-read, confirm referenced paths exist, every major claim maps to code or a cited doc, no stale contradiction with nearby docs. Summarise the change.

## 7. Recommend next step

Recommend one: `/explore` (still unclear), `/feature` (plan emerged), `/refactor` (tangled-but-working code), `/fix` (bug found), `/commit-and-document` (done). Do not auto-run.
