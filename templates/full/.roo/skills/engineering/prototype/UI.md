# UI Prototype

Use for visual/layout/design. Not logic/state.

## Shape

Prefer A.

A. Existing page:
- Same route.
- Keep data fetching/params/auth.
- Switch rendering subtree via `?variant=`.

B. Throwaway route:
- Only if no natural host page.
- Follow routing convention.
- Include `prototype` in route/file name.
- Use `?variant=`.

## Process

1. State question + N variants in prototype location. Default 3; max 5.
2. Create radical variants: layout/info hierarchy/primary affordance differs; use project styling; export `VariantA/B/C`; DO NOT ship color/copy-only variants.
3. Wire route switch:

```tsx
const variant = searchParams.get('variant') ?? 'A';
return (
  <>
    {variant === 'A' && <VariantA {...data} />}
    {variant === 'B' && <VariantB {...data} />}
    {variant === 'C' && <VariantC {...data} />}
    <PrototypeSwitcher variants={['A','B','C']} current={variant} />
  </>
);
```

4. Build `PrototypeSwitcher`:
   - Fixed bottom-centre bar.
   - Prev arrow/current label/next arrow.
   - Click updates URL search param via router.
   - `←`/`→` cycle.
   - DO NOT intercept if `input`, `textarea`, or `[contenteditable]` focused.
   - Visually distinct from design.
   - Hide in production via `process.env.NODE_ENV !== 'production'` or equivalent.
5. Hand over URL + variant keys.
6. Winner picked: capture which/why; existing page → delete losing variants/switcher + fold winner in; new route → promote winner + delete prototype route/switcher.

## Rules

- Read-only unless mutation is design question; stub mutations.
- Do not over-share layout code between variants.
- Do not promote prototype without cleanup.
