# Learning Record Format

Live in `learning-records/`. Sequential numbering: `0001-slug.md`, `0002-slug.md`. Create directory lazily on first record.

Teaching equivalent of ADRs. Capture non-obvious lessons, key insights, stated prior knowledge. Steer future sessions; calibrate ZPD.

## Template

```markdown
# {Short title of what was learned or established}

{1-3 sentences: what was learned (or what prior knowledge was established), and why it matters for future sessions.}
```

That is the whole format. A single paragraph counts. Value is recording _that_ this is now known and _why_ it changes what to teach next.

## Optional sections

Use only when they add value. Most records skip these.

- **Status** frontmatter (`active | superseded by LR-NNNN`) — when an earlier understanding is replaced.
- **Evidence** — how the user demonstrated understanding. Useful when the claim might be revisited.
- **Implications** — what this unlocks/rules out. Worth recording when non-obvious.

## Numbering

Scan `learning-records/`, take highest number, increment.

## When to write

Write when any are true:

1. User demonstrated genuine understanding of something non-trivial — evidence, not exposure. Sets a new floor.
2. User disclosed prior knowledge — "I already know X." Record it + claimed depth.
3. Misconception corrected — high-value; predicts future stumbles.
4. Mission shifted in response to learning — cross-link to `MISSION.md` and update it.

### Skip

- Material merely covered. Coverage ≠ learning.
- Anything tersely captured in `GLOSSARY.md`. No duplication.
- Session activity logs. Records are decision-grade, not a journal.

## Supersession

When a later record contradicts an earlier one, mark old one `Status: superseded by LR-NNNN`. Don't delete. The history is itself signal.
