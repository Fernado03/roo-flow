# Deepening

Vocabulary: `LANGUAGE.md`.

## Dependency categories

1. In-process: pure/local memory/no I/O → deepen directly; test interface.
2. Local-substitutable: local stand-in exists → test with stand-in; keep seam internal unless callers need it.
3. Remote owned: owned network service → port at seam; prod adapter HTTP/gRPC/queue; test adapter in-memory; logic inside deep module.
4. True external: third-party → inject port; tests use mock adapter.

## Seam rules

- One adapter = hypothetical seam; avoid.
- Two adapters = real seam; allow.
- Internal seams stay private.
- DO NOT expose test seams through external interface.

## Tests

- Replace shallow-module unit tests with deep-module interface tests.
- Interface is test surface.
- Assert observable outcomes only.
- Tests must survive internal refactor.
