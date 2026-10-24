# LUMEN — Judge Q&A (Focus-first edition)

## What is this?
A React + Vite prototype that turns one learning goal into a personalized six-step plan and shows exactly one next action at a time.

## Why is there no separate dashboard?
Focus mode *is* the product. Judges previously had to hunt for the “enter focus mode” button, so the whole learning screen now behaves that way: one step, one action, one button. The full plan, metrics, daily quest and arcade sit underneath in one scroll.

## What does the learner actually do?
Picks a goal (one tap), answers three quick questions, gets a roadmap, and completes one small action. Ticking actions in the checklist or pressing the big button both work and both award XP.

## How is progress made visible?
- Step rail with Done / Now / Next
- Path progress percentage
- Level and XP
- Day streak and weekly trail
- Confidence meter
- Seven badges

## Where does gamification come from?
Learning actions (25 XP each), completed steps (100 XP), the daily quest (+50 XP), streak and badges — plus three optional reward games capped at one XP payout per game per day.

## What are the three games?
Tap Sprint (15-second reflex), Memory Match (six pairs, best moves score better), Daily Spin (one reward spin per day). Each is short, optional, and returns the learner to the path.

## Is the AI real?
The Path Engine is a deterministic local planner with curated skill milestones, so the demo never depends on a network or an API key. It is isolated in `src/lib/pathEngine.js` and can be swapped for a live model.

## What data is collected?
None. Everything is in `localStorage` under `lumen-react-vite-v3`.

## Accessibility?
Skip link, keyboard support, visible focus, ARIA live announcements, one h1 per screen, labelled inputs, high-contrast mode, reduced-motion support, responsive down to 390 px.
