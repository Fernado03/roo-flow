# Language

RULE: Use exact terms. Avoid substitutions.

## Terms

**Module**: thing with interface + implementation; any scale. Avoid: unit, component, service.

**Interface**: all caller knowledge: types, invariants, ordering, error modes, config, perf. Avoid: API, signature.

**Implementation**: code inside module. Use **adapter** only for seam role.

**Depth**: leverage at interface. Deep = much behaviour behind small interface. Shallow = interface near implementation.

**Seam**: place where behaviour changes without editing there; where module interface lives. Avoid: boundary.

**Adapter**: concrete thing satisfying interface at seam.

**Leverage**: caller gain from depth.

**Locality**: maintainer gain from depth; change/bugs/knowledge/verification concentrate.

## Rules

- Depth belongs to interface, not implementation size.
- Internal seams may exist; external seam is caller interface.
- Deletion test: deleting shallow module removes complexity; deleting deep module pushes complexity to callers.
- Interface is test surface.
- One adapter = hypothetical seam; two adapters = real seam.
- Module has one interface.
- Depth creates leverage + locality.
- DO NOT frame depth as implementation-lines/interface-lines.
- DO NOT equate interface with TypeScript `interface` only.
- DO NOT use boundary; use seam/interface.
