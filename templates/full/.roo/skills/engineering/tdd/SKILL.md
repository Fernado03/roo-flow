---
name: tdd
description: Test-driven development with red-green-refactor loop. Use when user wants to build features or fix bugs using TDD, mentions "red-green-refactor", wants integration tests, or asks for test-first development.
---

# Test-Driven Development

RULE: Test observable behaviour through public interfaces. No implementation-detail tests. Use glossary. Respect ADRs.

## Planning

Before code:
1. Confirm public interface changes.
2. Confirm behaviours; prioritise critical paths/complex logic.
3. Identify deep-module opportunities.
4. Design for testability.
5. List behaviours, not implementation steps.
6. Get user approval.

Ask: `What should the public interface look like? Which behaviours matter most?`

## Loop

DO NOT write all tests then all code.

For each slice:
1. RED: write one failing behaviour test.
2. GREEN: write minimal code to pass.
3. Repeat next behaviour.

Rules:
- One test at a time.
- Public interface only.
- Minimal code only.
- No speculative features.
- 3 failed green attempts → STOP; show blocker + exact error; ask user.

## Refactor

Only after green:
1. Remove duplication.
2. Deepen shallow modules.
3. Apply SOLID where natural.
4. Refactor problematic existing code revealed.
5. Run tests after each refactor.

Checklist per cycle:
- [ ] Test describes behaviour.
- [ ] Test uses public interface.
- [ ] Test survives internal refactor.
- [ ] Code minimal.
- [ ] No speculation.
