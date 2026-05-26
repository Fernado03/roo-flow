# Mocking

Mock only system boundaries:
- External APIs.
- DB when no test DB/stand-in.
- Time/randomness.
- Filesystem when needed.

DO NOT mock:
- Own classes/modules.
- Internal collaborators.
- Controlled code.

Boundary interface rules:
1. Inject deps.
2. Prefer SDK-style specific methods over generic fetchers: `getUser`, `getOrders`, `createOrder`.
3. DO NOT require mocks with conditional endpoint logic.
