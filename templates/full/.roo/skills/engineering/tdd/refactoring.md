# Refactor Candidates

After green tests:
- Duplication → extract.
- Long methods → private helpers; keep tests on public interface.
- Shallow modules → combine/deepen.
- Feature envy → move logic to data owner.
- Primitive obsession → value objects.
- Exposed bad existing code → refactor if safe.
