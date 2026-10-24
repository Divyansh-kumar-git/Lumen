<div align="center">

# ✨ LUMEN

**Focus-first learning roadmap — one goal, one plan, one action at a time.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-lumen--three--jade.vercel.app-black?style=for-the-badge&logo=vercel)](https://lumen-three-jade.vercel.app/)

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

[**🚀 Try it live**](https://lumen-three-jade.vercel.app/) · [**▶ 60-sec demo**](https://lumen-three-jade.vercel.app/?demo=1)

</div>

---

## 📖 About

Learners pick a goal, then drown in tutorials and never know **"what do I do now?"**

LUMEN fixes that. It turns a learning goal into a personalized **six-step plan** and then shows **exactly one action at a time**. There is no dashboard to decode — the learning screen *is* Focus mode. Progress, daily quest and reward games stay one scroll away.

> **The LUMEN rule:** one goal → one plan → one action.

## 🎯 Features

- **Goal setup** — 9 goal tiles, starting level, daily time and learning format in one centered form
- **Offline roadmap generator** — builds a six-step personalized plan instantly, no API key or network needed
- **Focus path** — step rail (Done / Now / Next), one current action, one button
- **Progress system** — XP, levels, streaks, confidence score and badges
- **Daily quest** — a small goal that resets every day
- **Reward arcade** — three short games, XP paid once per game per day:
  - ⚡ **Tap Sprint** — 15-second reflex challenge (up to +70 XP)
  - 🧠 **Memory Match** — six pairs, fewer moves score higher (up to +90 XP)
  - 🎡 **Daily Spin** — one spin per day (up to +60 XP)
- **Built-in 60-second guided demo** — eight timed beats from problem to reward
- **Accessible** — keyboard-first, focus rings, skip link, ARIA live announcements, high-contrast toggle, reduced-motion support

## 🌐 Live Demo

**https://lumen-three-jade.vercel.app/**

| URL | What it does |
| --- | --- |
| `/?demo=1` | Auto-starts the guided 60-second demo |
| `/?reset=1` | Clears saved progress |

## 🛠️ Tech Stack

- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- Plain CSS (single stylesheet, light SaaS theme)
- `localStorage` for persistence — no backend

## ⚙️ Run Locally

**Requirements:** [Node.js](https://nodejs.org/) 18+ and npm.

```bash
git clone https://github.com/YOUR_USERNAME/LUMEN-React-Vite.git
cd LUMEN-React-Vite
npm install
npm run dev
```

Open the URL Vite prints (normally `http://localhost:5173`).
On Windows you can also double-click `RUN-LUMEN.bat`.

> Run commands in the folder that directly contains `package.json`. If npm says `ENOENT package.json`, you are in the parent folder.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Preview the production build |

## 🚢 Deploy

Deployed on **Vercel**. To deploy your own copy: import the GitHub repo in Vercel — it auto-detects Vite (build command `npm run build`, output directory `dist`).

## 📁 Project Structure

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
    Feedback.jsx · Icon.jsx
  hooks/
    useGuidedDemo.js · usePrefersReducedMotion.js
  data/
    catalog.js · games.js  goals and game content
  lib/
    pathEngine.js          offline roadmap generator
    progress.js            XP, levels, streaks, badges, stats
    demo.js                eight demo beats (60 seconds total)
    state.js               local persistence
  styles.css               one stylesheet
public/
  favicon.svg
```

## 📚 More Docs

- [`DEMO_SCRIPT_60S.md`](DEMO_SCRIPT_60S.md) — word-for-word 60-second demo script
- [`JUDGE_QA.md`](JUDGE_QA.md) — prepared answers for judge questions
- `backup-single-file/` — earlier no-install single-file version, kept as a fallback

## 🔒 Privacy

No signup, no tracking, no network calls. Progress is stored only in your browser's `localStorage` (key `lumen-react-vite-v3`).

## 📄 License

[MIT](LICENSE) © 2026 Divyansh Kumar
