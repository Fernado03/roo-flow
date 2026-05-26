# npm Publishing

Zoo Flow is published as a CLI installer.

## Package name

```text
@fernado03/zoo-flow
```

## Local validation

```bash
node bin/zoo-flow.js doctor --template-only
npm pack --dry-run
```

## Publish

```bash
npm login
npm publish --access public
```

## Test install after publish

From a separate test project:

```bash
npx @fernado03/zoo-flow@latest init
```

If the project already has `.roomodes` or `.roo/`, test:

```bash
npx @fernado03/zoo-flow@latest init --force
```

## What ships in the package

The `files` field in `package.json` controls what npm publishes:

- `bin/` — the CLI entry point
- `templates/` — the runtime template (`.roomodes` and `.roo/`)
- `README.md`
- `LICENSE`

Repo-level `docs/`, `examples/`, and `assets/` are intentionally excluded
so users only get the runtime template they need.

## Versioning

Bump `version` in `package.json` before each publish, following
[Semantic Versioning](https://semver.org/):

- patch: bug fixes in the CLI or template content
- minor: new commands, new modes, new skills
- major: breaking changes to mode slugs, command names, or routing

Update `CHANGELOG.md` under `## [Unreleased]` with the change, then
move it under a new versioned section when you publish.
