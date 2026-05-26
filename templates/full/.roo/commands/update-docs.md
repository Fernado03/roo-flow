---
description: "Update repo documentation so it matches the current code."
argument-hint: <doc or area to update>
mode: code-tweaker
---

You are guiding the user through the **Update Docs** workflow. Use this when the goal is to make repo documentation match the current code.

This command edits repo docs such as:

- `FLOW.md` files
- `APP_MAP.md`
- `ARCHITECTURE.md`
- `README.md`
- Other markdown docs that explain how code works

Do NOT use this for:

- Domain glossary terms — use `/grill-with-docs` instead
- ADRs / architectural decisions — use `/grill-with-docs` or `/refactor` so ADRs are offered properly
- Local commit journal entries — use `/commit-and-document`
- Read-only understanding — use `/explore`

The user may pass a target doc or area as `$ARGUMENTS`, e.g.:

- `apps/kikonnekt_w_sso/core/chat/FLOW.md`
- `chat flow`
- `documents flow`
- `APP_MAP.md`
- `ARCHITECTURE.md`

If no target is provided, ask once: "Which documentation file or area should I update?"

## Phase 1 — Identify target doc

Infer or ask for the target documentation file.

Prefer existing docs when possible:

- For a subsystem flow, look for a nearby `FLOW.md`.
- For app-wide navigation or module mapping, use `APP_MAP.md`.
- For system-level structure and constraints, use `ARCHITECTURE.md`.
- For setup or usage, use `README.md`.

If the target doc does not exist, ask before creating it. Do not invent a new doc location silently.

## Phase 2 — Read existing docs first

Read the target doc fully before editing.

Also read nearby related docs, if relevant:

- Neighboring `FLOW.md` files
- `APP_MAP.md`
- `ARCHITECTURE.md`
- `README.md`
- Any module-local docs in the same subtree

Goal: match the existing documentation style, section structure, vocabulary, and level of detail.

## Phase 3 — Verify against code

Inspect the code that the doc claims to describe. Update docs from code reality, not guesses.

Check:

- Entrypoints
- Main functions/classes
- Data flow
- State changes
- Side effects
- Dependencies
- Error/fallback paths
- Files involved

If a claim cannot be verified, either remove it or move it to an `Open questions` section. Do not present guesses as facts.

## Phase 4 — Make surgical edits

Do not rewrite the whole doc by default.

Prefer surgical edits:

- Keep useful existing sections
- Update stale sections
- Add missing flows
- Remove false claims
- Preserve heading style
- Preserve existing tone and detail level

Only rewrite the whole file if the current doc is too stale to salvage. If doing that, say why before editing.

## Phase 5 — Add or update freshness block

At the bottom of the doc, add or update this section if it fits the existing style:

```md
## Freshness

Last checked against code: YYYY-MM-DD
Relevant files checked:
- `path/to/file.py`
- `path/to/other_file.py`
```

Use today's date. Include only files actually inspected.

## Phase 6 — Sanity check

After editing:

- Re-read the updated doc
- Check referenced file paths exist
- Ensure every major claim maps to code or a cited doc
- Ensure no stale contradiction remains with nearby docs
- Summarise what changed

## Phase 7 — Recommend next step

Recommend one next command:

- `/explore` if the user still seems unsure how the area works
- `/feature` if the docs update revealed a feature plan
- `/refactor` if the docs update revealed tangled-but-working code
- `/fix` if the docs update revealed a bug
- `/commit-and-document` if the docs update is complete

Do not auto-run the next command. The user chooses.

$ARGUMENTS
