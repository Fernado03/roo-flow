---
name: scaffold-exercises
description: Create exercise directory structures with sections, problems, solutions, and explainers that pass linting. Use when user wants to scaffold exercises, create exercise stubs, or set up a new course section.
---

# Scaffold Exercises

Goal: create exercise dirs passing `pnpm ai-hero-cli internal lint`, then commit.

## Naming

- Sections: `exercises/XX-section-name/`.
- Exercises: `XX.YY-exercise-name/` inside section.
- Lowercase dash-case.

## Variants

Each exercise needs ≥1: `problem/`, `solution/`, `explainer/`. Default stub: `explainer/` unless plan says otherwise.

## Required files

- Each variant folder: non-empty `readme.md`.
- Minimal readme:

```md
# Exercise Title

Description here
```

- If folder has code, `main.ts` >1 line required.
- Readme-only stubs allowed.

## Workflow

1. Parse plan into sections/exercises/variants.
2. `mkdir -p` dirs.
3. Create readme stubs.
4. Run `pnpm ai-hero-cli internal lint`.
5. Fix until pass.
6. Moves/renames: use `git mv`, not `mv`.
7. Commit with `git commit`.

## Lint constraints

- Exercise has subfolder.
- At least one of `problem/`, `explainer/`, `explainer.1/` exists.
- Primary readme exists and non-empty.
- No `.gitkeep`.
- No `speaker-notes.md`.
- No broken links.
- No `pnpm run exercise` in readmes.
- `main.ts` required only when code present.

## Example

```bash
mkdir -p exercises/05-memory-skill-building/05.01-introduction-to-memory/explainer
mkdir -p exercises/05-memory-skill-building/05.02-short-term-memory/{explainer,problem,solution}
mkdir -p exercises/05-memory-skill-building/05.03-long-term-memory/explainer
```
