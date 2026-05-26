---
name: to-prd
description: Turn the current conversation context into a PRD and publish it to the project issue tracker. Use when user wants to create a PRD from the current context.
---

# To PRD

Issue tracker + label vocabulary should exist; run `/setup-matt-pocock-skills` if missing.

RULE: Do not interview user. Synthesize current context.

## Process

1. Explore repo if needed; use glossary; respect ADRs.
2. Sketch major modules to build/modify.
3. Find deep modules testable in isolation.
4. Check with user: modules match expectations? which modules need tests?
5. Write PRD.
6. Publish to issue tracker.
7. Apply `ready-for-agent`.

## PRD template

```markdown
## Problem Statement

{user-facing problem}

## Solution

{user-facing solution}

## User Stories

1. As a {actor}, I want {feature}, so that {benefit}

## Implementation Decisions

- Modules/interfaces changed.
- Technical clarifications.
- Architecture/schema/API/contracts/interactions.
- No file paths.
- Prototype snippets allowed only if decision-rich and trimmed.

## Testing Decisions

- Good tests verify external behaviour, not implementation.
- Modules to test.
- Similar tests/prior art.

## Out of Scope

{excluded work}

## Further Notes

{other notes}
```
