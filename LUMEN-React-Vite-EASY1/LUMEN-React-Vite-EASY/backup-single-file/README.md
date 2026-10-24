# LUMEN — AI Skill Constellation

**Tagline:** Don’t Google “where do I start?” Follow one lit star.

LUMEN is a working, offline-first hackathon prototype that turns a learning goal into a personalized six-step roadmap, a single obvious next action, and visible progress. Its signature interface is a **skill constellation**: completed milestones are lit stars, the current step glows, and future steps stay visible but calm.

Everything is contained in a single `index.html` file — HTML, CSS, JavaScript, SVG graphics and local storage work with no installation, no API key and no internet connection.

---

## 1. Run it in VS Code

### Easiest
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Double-click `index.html` to open it in your browser.

### Recommended for a smooth demo
1. In VS Code, install the recommended **Live Server** extension when prompted.
2. Right-click `index.html` → **Open with Live Server**.
3. Press **Watch 60-sec demo** in the top navigation.

### Alternative terminal command
```bash
cd lumen-skill-constellation
python -m http.server 5173
```
Then open: `http://localhost:5173/index.html`

> The app also works directly from `file://`, so judges can run it even if a local server is blocked.

Useful URLs:
- `index.html?demo=1` — automatically starts the 60-second guided demo.
- `index.html?reset=1` — clears saved progress when the page loads.

---

## 2. What the prototype does

### Working prototype
A learner selects a goal, starting point, daily time budget and preferred learning format. The local Path Engine generates a personalized roadmap with:
- six clear milestones;
- 3–4 concrete actions per milestone;
- a realistic time estimate;
- a first next action;
- a visible outcome to work toward.

### Guided path
The roadmap screen always shows:
- **Your next move** in a large, glowing card;
- a **Done / Now / Next** constellation;
- a detailed checklist for the selected step;
- automatic advancement of the current step;
- progress percentage, steps completed, XP and actions completed.

### 60-second demo
The app contains a timed, pauseable, keyboard-accessible demo that runs through the complete story:

**goal → personalized roadmap → clear first action → completed milestone → visible progress → confident next step.**

A ready-to-present narrator script is in [`DEMO_SCRIPT_60S.md`](DEMO_SCRIPT_60S.md).

---

## 3. Why judges will understand it quickly

| Brief requirement | Where to see it |
|---|---|
| Learner picks a goal | Landing page four-input form |
| AI-generated roadmap | “Generate my roadmap” → six personalized milestones |
| Clear steps and next actions | Glowing “Your next move” card + step checklist |
| Visible progress | Momentum ring, Done/Now/Next labels, XP, streak, rewards |
| No one gets lost | One recommended action always visible; any step can be opened |
| 60-second demo | “Watch 60-sec demo” button or `?demo=1` |
| Gamification | XP, daily streak, badges, completion celebration |
| Simplicity | Four inputs, one primary action, no menus/signup |

---

## 4. What “AI-powered” means in this prototype

For a reliable hackathon demo, LUMEN uses a **local AI-style Path Engine** rather than a paid external model. It combines:
1. the selected skill’s curated milestone model;
2. the learner’s starting level;
3. their available time;
4. their preferred learning format (watch, read, do, listen);
5. optional custom-skill input.

The output is a deterministic but personalized learning path. This avoids API-key problems, network failures and latency during judging. The architecture is deliberately isolated in `buildRoadmap()` inside `index.html`, so it can later be replaced with a live LLM call while keeping the same UI and state model.

---

## 5. Accessibility built into the prototype

- Semantic headings, forms, fieldsets, lists, buttons and landmarks.
- Full keyboard operation with visible `:focus-visible` outlines.
- Skip-to-main link.
- ARIA live announcements for roadmap generation, completed actions and demo beats.
- High-contrast mode toggle in the header.
- `prefers-reduced-motion` support; celebration particles and smooth scrolling are disabled.
- Status is conveyed by text labels — Done, Now, Next — not color alone.
- Scalable system typography and responsive layout down to mobile widths.
- 44px minimum target size for primary controls.
- No external fonts, libraries or network dependencies.
- All graphics are inline SVG or CSS, with text alternatives.

---

## 6. Project structure

```text
lumen-skill-constellation/
├── index.html                 # Complete single-file prototype
├── README.md                  # This file
├── DEMO_SCRIPT_60S.md         # Timed presenter script
├── JUDGE_QA.md                # Quick answers to likely judge questions
├── .gitignore
└── .vscode/
    ├── extensions.json        # Recommended VS Code extensions
    ├── settings.json          # Live Server + editor settings
    ├── tasks.json             # One-command local server task
    └── launch.json            # Optional browser debug configuration
```

---

## 7. Customizing quickly

Open `index.html` and search for:

- `const GOALS = [...]` — add or edit skill templates.
- `const CUSTOM_MILESTONES = [...]` — change the generic path for “Something else”.
- `const STYLE_MODES = {...}` — change how watch/read/do/listen actions are phrased.
- `const DEMO_BEATS = [...]` — edit the guided demo captions, timing or actions.
- CSS variables inside `:root` — change the entire visual theme.

Progress is saved under the browser key `lumen-skill-constellation-v1`.

---

## 8. Troubleshooting

**The old roadmap keeps appearing.**  
Click **Reset** in the header, or open `index.html?reset=1`.

**The demo starts too quickly/slowly.**  
Use **Pause**, **Skip beat**, or **Exit**. For a manual pitch, keep the demo paused and follow `DEMO_SCRIPT_60S.md`.

**Local storage is disabled.**  
The prototype still works for the current session, but progress may not persist after refresh.

**Live Server extension is unavailable.**  
Double-click `index.html`, or run the Python command in Section 1.

---

Built for hackathon speed: one file, zero setup, clear story, accessible interaction, and a visual model judges can explain in one sentence.
