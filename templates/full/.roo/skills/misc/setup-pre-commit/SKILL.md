---
name: setup-pre-commit
description: Set up Husky pre-commit hooks with lint-staged (Prettier), type checking, and tests in the current repo. Use when user wants to add pre-commit hooks, set up Husky, configure lint-staged, or add commit-time formatting/typechecking/testing.
---

# Setup Pre-Commit Hooks

Creates Husky pre-commit, lint-staged Prettier, optional typecheck/test.

## Process

1. Detect package manager: `package-lock.json`→npm; `pnpm-lock.yaml`→pnpm; `yarn.lock`→yarn; `bun.lockb`→bun; default npm.
2. Install dev deps, adapting package manager:

```bash
npm i -D husky lint-staged prettier
```

3. Init Husky:

```bash
npx husky init
```

4. Write `.husky/pre-commit`, adapting package manager; omit missing scripts and tell user:

```text
npx lint-staged
npm run typecheck
npm run test
```

5. Create `.lintstagedrc`:

```json
{
  "*": "prettier --ignore-unknown --write"
}
```

6. Create `.prettierrc` only if no Prettier config:

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": false,
  "trailingComma": "es5",
  "semi": true,
  "arrowParens": "always"
}
```

7. Verify: executable `.husky/pre-commit`; `.lintstagedrc`; `prepare` script = `husky`; Prettier config; `npx lint-staged`.
8. Commit:

```bash
git commit -m "Add pre-commit hooks (husky + lint-staged + prettier)"
```

RULE: Wait for explicit user approval before commit if current mode requires HITL.
