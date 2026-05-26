# ADR Format

Path: `docs/adr/NNNN-slug.md`. Create dir lazily.

## Template

```md
# {Short title}

{1-3 sentences: context, decision, why.}
```

Optional:
- `Status: proposed | accepted | deprecated | superseded by ADR-NNNN`
- `Considered Options`
- `Consequences`

## Numbering

1. Scan `docs/adr/`.
2. Find max `NNNN`.
3. Create next number.

## Gate

Offer ADR only if all:
- Hard to reverse.
- Surprising without context.
- Real trade-off.

Qualifies: architecture shape; cross-context integration; lock-in tech; scope ownership; non-obvious deviation/constraint/rejected option.

DO NOT create ADR for obvious/easy/no-tradeoff choices.
