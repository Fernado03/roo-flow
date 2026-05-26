---
name: migrate-to-shoehorn
description: Migrate test files from `as` type assertions to @total-typescript/shoehorn. Use when user mentions shoehorn, wants to replace `as` in tests, or needs partial test data.
---

# Migrate to Shoehorn

RULE: Test code only. Never production.

## Install

```bash
npm i @total-typescript/shoehorn
```

## Mapping

- `as Type` → `fromPartial()`.
- `as unknown as Type` → `fromAny()`.
- `fromPartial()` = partial data that should type-check.
- `fromAny()` = intentionally wrong data.
- `fromExact()` = full object now, partial later.

## Workflow

1. Ask target test files/use cases if missing.
2. Install dependency.
3. Find assertions:

```bash
grep -r " as [A-Z]" --include="*.test.ts" --include="*.spec.ts"
```

4. Replace `as Type` with `fromPartial()`.
5. Replace `as unknown as Type` with `fromAny()`.
6. Add imports.
7. Run type check.
