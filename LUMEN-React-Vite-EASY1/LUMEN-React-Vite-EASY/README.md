# LUMEN — Focus-first learning prototype

**React + Vite · clean SaaS UI · three reward games · 60-second demo**

LUMEN turns a learning goal into a personalized six-step plan and then shows exactly **one action at a time**. There is no dashboard to decode: the learning screen *is* Focus mode. The full plan, progress, quest and games stay one scroll away.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints, normally `http://localhost:5173`. Windows: double-click `RUN-LUMEN.bat`.

Useful URLs:
- `/?demo=1` — auto-start the guided 60-second demo
- `/?reset=1` — clear saved progress

Open **the folder that directly contains `package.json`**. If npm says `ENOENT package.json`, you opened the parent folder.

## The three screens

### 1. Goal setup (single centered column)
Landing page is one centered column: headline, the LUMEN rule, then the plan form. Nine goal tiles in a 3 × 3 grid, starting level, daily time, learning format, one "Generate my roadmap" button.

### 2. Focus path (the only learning screen)
- Step rail: all six steps as Done / Now / Next chips
- One current step, one current action, one button
- Four quiet metrics: path progress, level + XP, streak, confidence
- **Daily quest (left)** and **Reward arcade (right)** in one full-width row
- Full six-step plan with expandable checklist
- Rewards & streak and "Why this path?" as collapsed drawers

### 3. Reward arcade
- **Tap Sprint** — 15-second reflex challenge (+70 XP max)
- **Memory Match** — six pairs, fewer moves score better (+90 XP max)
- **Daily Spin** — one reward spin per day (+60 XP max)

Each game pays XP **once per day**, so rewards stay motivating instead of grindy.

## Built-in 60-second demo
Click **Watch 60-sec demo** or open `/?demo=1`. Eight timed beats: problem → goal → personalization → generate → roadmap + progress → one action only → first win → reward arcade.

## Where things live

```text
src/
  App.jsx                  app shell, XP + badge logic, view routing
  components/
    GoalSetup.jsx          landing + plan form
    FocusPath.jsx          step rail, single-action card, metrics, plan
    Panels.jsx             metrics, daily quest, arcade card, plan panel, drawers
    Arcade.jsx             the three games
    DemoOverlay.jsx        timed demo control panel
    AppHeader.jsx          header navigation
  lib/
    pathEngine.js          offline roadmap generator
    progress.js            XP, levels, streaks, badges, stats
    demo.js                eight demo beats (60 seconds total)
    state.js               local persistence
  styles.css               one stylesheet, light SaaS theme
```

## Accessibility
Keyboard-first controls, visible focus rings, skip link, ARIA live announcements, high-contrast toggle, reduced-motion support, semantic headings and labelled form fields.

## Notes
- No signup, no API key, no network calls; progress is stored in `localStorage` under `lumen-react-vite-v3`.
- `backup-single-file/index.html` is the earlier no-install version, kept only as a fallback.
