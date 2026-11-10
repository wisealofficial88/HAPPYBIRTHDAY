# 🌲 A Magical Birthday Adventure ✨
### *Inspired by the Dreamy Wilderness of Kashmiri Alpine Valleys*

An enchanting, interactive 2D animated fairytale birthday experience built with **React**, **Vite**, **Tailwind CSS**, and **Web Audio API**.

---

## 🌟 Experience Overview

1. **Scene 1: Forest Entrance**
   - Immersive dark woodland opening with drifting fireflies, canopy silhouette, and ambient music initiation.
2. **Scene 2: Meet The Baby Deer**
   - An adorable baby deer with a flower crown welcomes the recipient and invites them along the journey.
3. **Scene 3: The Kashmiri Mountain Journey**
   - Interactive side-scrolling valley journey featuring Laila (in a white gown with bell sleeves) and the baby deer.
   - Parallax mountain ridges, drifting alpine mist, interactive glowing mushrooms, flowers, firefly swarms, and 3 collectible stars.
4. **Scene 4: The Birthday Clearing & Kashmiri Pine Forest**
   - Towering ancient Deodar pine trunks, mossy granite boulders, and swaying mountain wildflowers.
   - 8 celebratory woodland animals dancing with interactive speech bubbles.
5. **Scene 5: Cake & Candle Blowing**
   - Interactive birthday cake with flickering flames.
   - Visitor taps **"Blow The Candles"** to trigger wind gust, flame extinguish, smoke particles, and fanfare.
6. **Scene 6: Cinematic Arrival of Majnu**
   - Majnu appears from the distant mountain path in his iconic brown checkered Kashmiri Phiran with a white inner collar.
   - Approaches center stage and lovingly presents a gleaming royal velvet gift box.
7. **Scene 7: The Royal Letter & Grand Finale**
   - The gift opens to reveal a royal parchment letter with customized personal dedication.
   - Closing the letter transitions into a serene starry night with 3D glowing moon, campfire, floating wishing lanterns, and a grand fireworks & confetti celebration.

---

## ⚙️ How to Customize Names, Letter & Music

All personal details can be customized in a single file: **[`src/config.js`](./src/config.js)**.

```javascript
// At the top of src/config.js:
const recipientName = 'Aishwarya';
const recipientTitle = 'Miss Aishwarya'; // e.g. "Miss Aishwarya" or "Aishwarya"
const senderName = 'Aakash';
```

Changing these primary variables automatically updates:
- Entrance dedication card
- Deer greeting & journey prompt
- Animal cheers & celebration quotes
- Birthday banner & title
- The personal letter salutation & signature
- The wax seal initial
- Browser page title

### Custom Background Music
Place any `.mp3` audio file into the **`public/`** folder (e.g. `public/bday.mp3`). The application automatically loads and loops your track, with smooth procedural chimes as fallback.

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local live dev server** (with instant Hot Module Replacement):
   ```bash
   npm run dev
   ```
   Open **http://localhost:3000** in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📦 Deploying to Vercel

This repository is pre-configured with **[`vercel.json`](./vercel.json)** for seamless deployment.

### Option A: Via GitHub (Recommended)
1. Push this project to your GitHub repository (see instructions below).
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New Project"** and select **"Import"** next to your GitHub repository.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**! Your website will be live in under 1 minute with a free HTTPS URL.

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 🐙 Uploading to GitHub

### Option 1: Using VS Code (Easiest)
1. Open this project folder in **Visual Studio Code**.
2. Click the **Source Control** icon on the left sidebar (or press `Ctrl + Shift + G`).
3. Click **"Publish to GitHub"** (or **"Initialize Repository"** -> commit -> publish).
4. Select **Public** or **Private** repository. Done!

### Option 2: Using Git Command Line
```bash
# Initialize git repository
git init

# Stage all files (.gitignore automatically excludes node_modules and dist)
git add .

# Create initial commit
git commit -m "Initial commit: A Magical Birthday Adventure"

# Rename default branch to main
git branch -M main

# Link to your new GitHub repository
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# Push your code
git push -u origin main
```

---

## 📁 Project Structure

```
BDAY/
├── public/                 # Static assets (audio files, icons)
│   ├── bday.mp3           # Background music
│   └── README_MUSIC.txt
├── src/
│   ├── components/        # Interactive scene components
│   │   ├── characters/    # SVG Characters (Laila, Majnu, Animals)
│   │   ├── AudioController.js
│   │   ├── BirthdayParty.jsx
│   │   ├── CakeInteraction.jsx
│   │   ├── DeerCharacter.jsx
│   │   ├── FireworksCanvas.jsx
│   │   ├── ForestEntrance.jsx
│   │   ├── ForestScene.jsx
│   │   └── GiftLetter.jsx
│   ├── config.js          # Master configuration for names & letter
│   ├── App.jsx            # Main app shell & fullscreen controls
│   ├── main.jsx           # Entry point
│   └── index.css          # Storybook typography & keyframe animations
├── .gitignore             # Git exclusions (node_modules, dist, etc.)
├── vercel.json            # Vercel deployment configuration
├── vite.config.js         # Vite bundler configuration
└── package.json           # Dependencies and build scripts
```
