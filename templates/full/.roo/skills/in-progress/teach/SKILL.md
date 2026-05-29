---
name: teach
description: Teach a topic over multiple stateful sessions, treating the current directory as a teaching workspace. Tracks mission, glossary, resources, and learning records to ground every session and pace the user inside their zone of proximal development. Use when user asks to be taught a topic, wants to learn something over time, or mentions ongoing study.
disable-model-invocation: true
argument-hint: "What would you like to learn about?"
---

# Teach

Stateful. Treat current directory as the teaching workspace.

## Files

- `MISSION.md` — why user wants this; grounds every decision. Format: `mission-format.md`.
- `GLOSSARY.md` — canonical terms; all output conforms. Format: `glossary-format.md`.
- `RESOURCES.md` — trusted knowledge + community sources. Format: `resources-format.md`.
- `learning-records/NNNN-slug.md` — non-obvious lessons + prior knowledge. Format: `learning-record-format.md`.

## Triad

- **Knowledge** — drawn from `RESOURCES.md`. Never parametric.
- **Skills** — exercises built from the knowledge.
- **Wisdom** — real-world community interaction via `RESOURCES.md`.

Topic mix varies: theoretical → knowledge-heavy; practical → skills-heavy.

## Mission first

If `MISSION.md` missing or vague, interview before teaching. No mission = no grounding, abstract exercises, no signal for what's next.

## Zone of proximal development

Pick next topic by:
1. Read `learning-records/`.
2. Align to `MISSION.md`.
3. Pick tightest scope that still stretches the user.

User says "I already know X" → record in `learning-records/`.

## Knowledge loop

1. Pull from `RESOURCES.md`.
2. Write HTML explainer to local file. Beautiful, glossary-correct.
3. Give one-line CLI command to open it.
4. Take questions; amend explainer or write a new one.
5. Once user clearly owns the term, add to `GLOSSARY.md`.

## Skills loop

Tools:
- Interactive HTML explainers with quizzes / in-browser drills.
- Step-through HTML guides for real-world tasks.
- In-agent scenario quizzes.

Every exercise closes a tight feedback loop.

## Wisdom

Default: attempt an answer, then route to a high-reputation community from `RESOURCES.md`. If user opted out of communities, record it in `RESOURCES.md` and stop suggesting.
