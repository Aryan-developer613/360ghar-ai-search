# 360Ghar AI Property Search Assistant

Polished React prototype for the 360Ghar Software Developer Intern assignment. It lets a user describe a Gurgaon/NCR property need in natural language, parses the query into structured filters, ranks verified property cards, and generates a personalised AI match summary.

## Features

- Natural language property search with OpenRouter-ready LLM parsing.
- 48 realistic Gurgaon/NCR mock listings with BHK, area, sector, price, VR status, school/metro signals, RM notes, possession, and amenities.
- Ranked property cards with match score and a useful "why this matches" badge.
- AI-generated 2-3 line property summary on card selection.
- Bonus features: voice input, side-by-side compare mode, saved shortlist, similar properties rail, shareable search URL, VR-only filter, sort controls, and AI Market Lens.
- Local parser/summary fallback so the prototype remains demoable without an API key.

## Run Locally

This is a standalone React app using CDN scripts, so no install step is required.

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173
```

If you serve the repository root, open `/outputs/360ghar-ai-search-assistant/`.

## OpenRouter Setup

1. Create a free account at `https://openrouter.ai`.
2. Create an API key.
3. Open the app, click `API`, paste the key, and select a free model.
4. Recommended model: `google/gemma-3-27b-it:free`.

The app calls:

```text
POST https://openrouter.ai/api/v1/chat/completions
```

All calls are made directly from the frontend, as allowed in the assignment.

## Architecture

- `index.html` loads React, Lucide icons, Babel, and the app.
- `app.jsx` contains property data, local fallback parser, OpenRouter calls, scoring, ranking, summaries, comparison, saved shortlist, market insights, voice search, and share-link logic.
- `styles.css` contains the full responsive UI system inspired by 360Ghar's orange, verified, VR-first product language.

The app intentionally avoids a backend and heavy build tooling because the assignment asks for a minimal standalone prototype, not a full production system.

## Prompt Design Notes

- Query parsing prompt returns strict JSON only, with fields for intent, location, BHK, buy budget, rent budget, amenities, preferences, confidence, and follow-up question.
- I explicitly convert crore to lakhs and rent terms like `55k` to `maxRentK` so ranking can stay deterministic.
- Soft needs like sunlight, commute, family, premium, verified, and VR are extracted as preferences, not just filters.
- The property summary prompt receives the original query, parsed filters, and selected property so it can explain the match concretely.
- I chose `google/gemma-3-27b-it:free` as the default because it is a capable free OpenRouter model for structured extraction.
- A local fallback parser is included because frontend API demos can fail due to missing keys, rate limits, or CORS-like browser issues.
- What did not work well: asking the model for both ranking and UI text together made responses less predictable, so ranking is deterministic in code and the LLM focuses on parsing/summary.

## Loom Demo Outline

1. Show the default query and search results.
2. Paste a different query, such as `3BHK on Golf Course Road under 2.2 crore with metro access`.
3. Open the API panel and explain model choice.
4. Click `Explain` on a card to show personalised summary.
5. Show `AI Market Lens`, then save one property to the shortlist.
6. Select two properties with `Compare`.
7. Mention voice input, VR-only filtering, sort controls, and shareable search link as bonus polish.
