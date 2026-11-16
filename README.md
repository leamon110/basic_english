# Basic English — Ogden's 850 Words

A small, dependency-free **Progressive Web App (PWA)** for learning and using
C. K. Ogden's *Basic English* — a system of just **850 English words** plus a
set of strict grammar rules that can do the work of ~20,000 words of ordinary
English.

The app has two main modes:

- **💬 Conversation** — chat with an AI that replies using *only* Basic English.
  Both your input and the AI's reply are checked against the 850-word list.
- **📖 Teaching** — browse the 850 words by category, drill Ogden's word-building
  and grammar rules, run spaced-repetition review, and look up the rules quickly.
- **🧭 Course learning** — follow Ogden's original 45-step order. Fourteen lessons
  (Steps 1, 2, 3, 5, 6, 9, 10, 12, 13, 15, 17, 18, 20 and 25) currently have Chinese-guided vocabulary, grammar,
  reading and practice; other steps link to the original course until adapted.

It is built with plain HTML, CSS, and vanilla JavaScript — **no build step, no
frameworks, no runtime dependencies.**

---

## Features

- **AI conversation** in Basic English via any OpenAI-compatible chat API
  (OpenAI, DeepSeek, Groq, OpenRouter, …). API key/model are configured in-app
  and stored in `localStorage`.
- **Live word validator** that recognizes the full Ogden ruleset:
  - The 850 base words across 5 categories (Operations, Things ×2, Qualities ×2).
  - Plurals (`-s` / `-es` / `-ies` + irregulars like *feet, teeth, men, knives*).
  - Noun derivatives `-er` / `-ing` / `-ed` for the 300 nouns that take them.
  - Adverbs `-ly`, comparatives/superlatives `-er` / `-est` (+ `more`/`most`).
  - `un-` negation for the 50 allowed adjectives.
  - 18 operator conjugations, pronoun forms, possessives, and contractions.
  - 74 international words and basic numerals.
- **Word cards** with category filtering, search, and pagination.
- **Chinese translations** (click a card) and **US-English pronunciation**
  via the Web Speech API — for word cards, chat sentences, and SR cards.
- **Spaced Repetition** using the Ebbinghaus forgetting curve, with progress
  persisted to `localStorage`.
- **Rule exercises** (plurals, derivatives, adverbs, `un-`, operator + direction,
  word order, verb→noun patterns).
- **Quick reference** card covering the 11 core Ogden rules.
- **Installable PWA** with offline caching via a service worker; also packaged
  as an Android app (APK/AAB) under `basic-english-package/`.

---

## Project structure

```
basic_english/
├── docs/                       # The PWA — also the GitHub Pages publish source
│   ├── index.html              # App shell + script loading order
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service worker (offline cache)
│   ├── start-server.ps1        # Tiny local HTTP server (PowerShell)
│   ├── css/style.css
│   ├── icons/                  # SVG app icons (192 / 512)
│   ├── basic-english-850.md    # Copy of the word list (served with the app)
│   ├── ogden-rules-and-techniques.md
│   └── js/
│       ├── data.js             # The 850 words + all rule data tables
│       ├── validator.js        # Basic English word/forms validator
│       ├── chat.js             # Conversation mode + LLM API client
│       ├── teaching.js         # Word cards, exercises, SR, reference
│       ├── course.js           # Chinese-guided 45-step course module
│       └── app.js              # Router + home page
│
├── basic-english-package/      # PWA Builder output: Android APK/AAB
├── basic-english-package.zip   # Zipped Android package
├── basic-english-850.md        # The full 850-word list (source data)
└── ogden-rules-and-techniques.md  # Reference notes on Ogden's rules
```

> The app lives in a single folder, `docs/`. This repository is a fork of
> `mythquan/basic_english`; the upstream site at
> <https://mythquan.github.io/basic_english/> is separate and is not updated by
> commits to this fork. The fork's planned project-site URL is
> <https://leamon110.github.io/basic_english/> after GitHub Pages is enabled.
> All asset paths are relative so the app works correctly under a sub-path.

---

## Running locally

Because the chat feature makes API calls, the site must be served over HTTP
(browsers block API requests from `file://` URLs due to CORS).

**Option A — PowerShell (Windows), no extra tools:**

```powershell
cd docs
./start-server.ps1
# then open http://localhost:8080
```

**Option B — any static server:**

```bash
cd docs
python3 -m http.server 8080
# then open http://localhost:8080
```

### Configuring the AI

1. Open the **💬 Conversation** page.
2. Click **⚙ Settings**.
3. Pick a provider preset (OpenAI / DeepSeek / Groq / OpenRouter) or enter a
   custom **API Base URL** and **Model**, then paste your **API Key**.
4. Click **Save Settings**. The key is stored only in your browser's
   `localStorage` and sent directly to the provider you configured.

The default preset is DeepSeek (`https://api.deepseek.com`, `deepseek-chat`).

---

## Deployment

The app is fully static. The workflow
`.github/workflows/deploy-pages.yml` publishes the `docs/` folder when changes
reach the `master` branch, or when the workflow is run manually. No site build
step is required.

**One-time fork setup:** GitHub Pages is not enabled for this fork yet. A
repository administrator must open Settings → Pages and set **Source** to
**GitHub Actions**. After that, merging the course changes to `master` will
trigger the deployment workflow.

The Android package in `basic-english-package/` was generated with
[PWABuilder](https://www.pwabuilder.com/); the included `Readme.html` links to
the signing / next-steps guide. A refreshed APK has not yet been built from this
fork's updated course.

---

- **Sentence practice** — 100 complete example sentences in ten groups, each with Chinese translation and a short pattern explanation, plus 20 interactive word-order assembly exercises.

## Tech notes

- **No dependencies / no build.** Scripts load in a fixed order in `index.html`:
  `data.js → validator.js → chat.js → teaching.js → course.js → sentence-practice.js → app.js`. Each module attaches
  itself to a single global `window.BE` namespace.
- **Routing** is hash-based (`#conversation`, `#teaching`, `#course`, `#sentences`) in `app.js`.
- **Pronunciation** uses the browser's `SpeechSynthesis` API and degrades
  gracefully when unavailable.
- **Persistence** (API settings, SR progress) uses `localStorage` only — there
  is no backend.

---

## Credits & references

- Vocabulary and rules from **C. K. Ogden's Basic English** (850 words).
- Word list source: <https://zbenglish.net/sites/basic/words.html>
- See `basic-english-850.md` and `ogden-rules-and-techniques.md` for the full
  source data and rule notes.
</content>
</invoke>
