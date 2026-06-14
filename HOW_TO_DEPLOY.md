# 🚀 Deploy to Vercel — Step by Step Guide

## What this app is
A beautiful 8-scene romantic birthday surprise experience — pure React frontend, **no backend or database needed**.

---

## ✅ Option 1: Deploy to Vercel (Recommended — Free & Easy)

### Prerequisites
- A [GitHub](https://github.com) account (free)
- A [Vercel](https://vercel.com) account (free) — sign up with GitHub

### Step 1: Push to GitHub

1. Go to https://github.com/new and create a **new repository** (e.g., `maha-birthday`)
2. Open PowerShell in this project folder and run:

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/maha-birthday.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Deploy on Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"** → select your `maha-birthday` repo
3. Vercel will auto-detect the settings from `vercel.json`
4. Click **"Deploy"** — done! ✨

Your site will be live at: `https://maha-birthday.vercel.app` (or similar)

---

## 🖥️ Option 2: Run Locally

### Prerequisites
- [Node.js 20+](https://nodejs.org) installed
- [pnpm](https://pnpm.io) installed: `npm install -g pnpm`

### Steps

```powershell
# From the project root folder:
pnpm install

# Run the frontend dev server:
pnpm --filter @workspace/maha-birthday run dev
```

Open http://localhost:5173 in your browser 🎉

---

## 🔧 What was changed from the Replit export

| File | Change |
|------|--------|
| `artifacts/maha-birthday/vite.config.ts` | Removed hard `PORT`/`BASE_PATH` env var requirements — now uses defaults |
| `pnpm-workspace.yaml` | Removed all platform-specific binary exclusions (they blocked Windows & Vercel installs) |
| `.npmrc` | Added `shamefully-hoist=true` for Vercel compatibility |
| `vercel.json` | **New** — tells Vercel how to build and serve the app |
| `HOW_TO_DEPLOY.md` | **New** — this file |

> **UI/UX was NOT changed.** All 8 scenes are exactly as built on Replit.
