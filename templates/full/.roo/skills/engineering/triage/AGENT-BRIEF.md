# Agent Briefs

Agent brief = authoritative issue comment for `ready-for-agent`.

## Rules

- Durable over precise.
- Describe behaviour/interfaces/types/config shapes.
- DO NOT reference file paths or line numbers.
- Say what, not how.
- Include testable acceptance criteria.
- Include out-of-scope boundaries.

## Template

```markdown
## Agent Brief

**Category:** bug / enhancement
**Summary:** one-line description

**Current behavior:**
{what happens now}

**Desired behavior:**
{what should happen; include edge/error cases}

**Key interfaces:**
- `TypeName` — required change/contract
- `functionName()` return type — current vs desired
- Config shape — new/changed options

**Acceptance criteria:**
- [ ] Specific criterion 1
- [ ] Specific criterion 2
- [ ] Specific criterion 3

**Out of scope:**
- Excluded thing
- Adjacent feature not included
```

Reject if vague/path-driven/missing category/current/desired/criteria/scope.
