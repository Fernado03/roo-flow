---
name: diagnose
description: Disciplined diagnosis loop for hard bugs and performance regressions. Reproduce → minimise → hypothesise → instrument → fix → regression-test. Use when user says "diagnose this" / "debug this", reports a bug, says something is broken/throwing/failing, or describes a performance regression.
---

# Diagnose

RULE: glossary + ADRs. Skip phase only with explicit reason. DO NOT hypothesise before deterministic loop.

## 1. Feedback loop

MUST build fast pass/fail loop. Try order:
1. Failing test at bug-reaching seam.
2. Curl/HTTP script vs dev server.
3. CLI fixture + stdout diff.
4. Headless browser: DOM/console/network assertions.
5. Replay trace/request/payload/event log.
6. Throwaway minimal subsystem harness.
7. Property/fuzz loop.
8. `git bisect run` harness.
9. Differential loop: old vs new/config A vs B.
10. HITL bash script from `scripts/hitl-loop.template.sh`.

Rules:
- MUST make loop faster/sharper/deterministic.
- Flake: run 100x, parallelise, stress, add sleeps, raise repro rate.
- 3 failed loop attempts → STOP; ask env/HAR/log/core/screen recording/temp prod instrumentation.

## 2. Reproduce

1. Run loop.
2. Match symptom to report.
3. Confirm repeatability/flake rate.
4. Capture exact error/output/timing.
5. DO NOT continue until reproduced.

## 3. Hypotheses

1. Generate 3–5 ranked falsifiable hypotheses.
2. Format: `If {cause}, then {probe/change} will {observable result}`.
3. Drop vague hypotheses.
4. Show ranked list.
5. User AFK → proceed top hypothesis.

## 4. Instrument

1. Map one probe to one hypothesis.
2. Change one variable at a time.
3. Prefer debugger/REPL.
4. Else add targeted logs only.
5. Tag logs `[DEBUG-xxxx]`.
6. DO NOT log everything.
7. Perf: baseline/profiler/query plan before logs.

## 5. Fix + regression

1. If correct seam exists, write regression test before fix.
2. Correct seam = real call-site bug pattern.
3. If seam shallow/missing, document architecture gap.
4. Watch regression fail.
5. Apply minimal fix.
6. Watch regression pass.
7. Rerun original loop.

## 6. Cleanup

MUST finish:
- [ ] Original repro passes.
- [ ] Regression passes or missing seam documented.
- [ ] `[DEBUG-...]` logs removed.
- [ ] Throwaway harnesses deleted/moved.
- [ ] Winning hypothesis stated in commit/PR.
- [ ] Seam/locality blocker → recommend `/improve-codebase-architecture`.
