# Interface Design

Use after candidate selected + user wants interface options.

## 1. Frame

Present:
- New-interface constraints.
- Dependencies + categories from `DEEPENING.md`.
- Rough illustrative code sketch only.

Proceed immediately.

## 2. Spawn 3+ parallel sub-agents

Each agent: radically different interface.

Include:
- Candidate files/modules.
- Coupling details.
- Dependency category.
- Hidden implementation behind seam.
- Architecture vocab from `LANGUAGE.md`.
- Domain vocab from `CONTEXT.md`.

Variants:
1. Min interface: 1–3 entry points, max leverage.
2. Max flexibility: many use cases/extensions.
3. Common caller: default case trivial.
4. Ports/adapters: if cross-seam deps exist.

Each output MUST include:
1. Interface: types/methods/params/invariants/ordering/errors.
2. Usage example.
3. Hidden implementation.
4. Dependency/adapters strategy.
5. Trade-offs: leverage high/thin.

## 3. Present

1. Present designs sequentially.
2. Compare depth/locality/seam placement.
3. Recommend strongest.
4. Propose hybrid if better.
5. Be opinionated.
