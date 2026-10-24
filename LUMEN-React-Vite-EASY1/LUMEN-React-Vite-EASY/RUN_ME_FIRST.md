# RUN ME FIRST — LUMEN (focus-first build)

## Step 1 — Open the correct folder
You should see these files at the top level:

```text
package.json
package-lock.json
index.html
src/
README.md
RUN-LUMEN.bat
```

If VS Code shows another folder wrapped around these, you opened the wrong level.

## Step 2 — Run

```powershell
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Easier Windows option
Double-click `RUN-LUMEN.bat`.

## What to show

- Clean centered landing page (plan preview panel removed)
- Goal → roadmap in one click
- Focus screen: one step, one action, one button — no separate "enter focus mode" step
- Daily quest (left) and Reward arcade (right) across the full width
- Full six-step plan with checklist
- Reward arcade with three games

## If npm says `ENOENT package.json`

```powershell
Get-Location
dir
```

`package.json` must be listed. If not, reopen the folder that directly contains it.

## Node.js
Use Node.js 20.19+ or 22.12+ (`node -v`).
