# LUMEN — Judge Q&A Cheat Sheet

## What problem are you solving?

New learners do not fail because information is unavailable. They fail because the path is unclear: too many tutorials, no obvious order and no visible progress. LUMEN turns a goal into a six-step constellation and always shows one exact next action.

## Is this a real working prototype or just screens?

It is functional. Choose any goal, generate a roadmap, select steps, check off actions, watch the current step advance, earn XP/badges, build a streak and refresh the page to see local progress persist.

## Is this using a real LLM?

The included version uses a transparent **offline AI-style Path Engine**: it personalizes curated skill milestones using the learner’s level, time and format preference. This was intentionally chosen for a reliable live hackathon demo — no API key, billing, rate limit or network dependency. The generator is isolated in `buildRoadmap()` so a live model can be swapped in later.

## Why is this better than a checklist?

A checklist tells you what exists. LUMEN tells you what to do next, why it matters, how long it should take and how far you have come. It also adapts the path to the learner’s context and rewards action.

## How does the 60-second demo work?

Press **Watch 60-sec demo** or open `index.html?demo=1`. The app automatically performs eight timed beats: problem, goal, context, generation, path, next action, completion and progress. It can be paused, skipped, exited or run manually with the included script.

## What makes it accessible?

Keyboard navigation, visible focus, skip link, semantic form controls, ARIA live updates, high-contrast mode, reduced-motion support, text status labels, responsive layout and no external dependencies.

## What happens if a learner chooses the wrong goal or pace?

Click **Adjust inputs**. The four answers can be changed and a new roadmap generated. Existing progress is reset for the new path so the dashboard stays honest.

## What data is collected?

None. All state is stored in the browser’s local storage under `lumen-skill-constellation-v1`. There is no backend, tracking, signup or upload.

## What would you build next?

A live LLM option for open-ended goals, resource links matched to each action, spaced repetition reminders, teacher/mentor sharing, and a cohort dashboard. The core UX — one next star — would remain the same.

## One sentence to remember

**LUMEN makes progress obvious by turning any skill into a constellation with one glowing next step.**
