# AI Prompts Used During Development

## 1. Plan and architecture
> Build a movie discovery web app using React, TypeScript, and Vite. Requirements: fetch up to 20 shuffled movies from multiple popular title seeds in parallel via OMDb, keyword search, reusable movie cards, Firebase email/password auth, per-user favorites in Realtime Database, protected Favorites route, and loading/error/empty states. Organize code using an MVVM-inspired models/services/viewmodels/views structure. Propose the file tree before implementation.

## 2. OMDb service
> Implement a typed OMDb API service. Read the key from `VITE_OMDB_API_KEY`, handle HTTP and API errors, search by keyword, fetch popular seed searches concurrently, deduplicate by IMDb ID, shuffle results, and return up to 20 items. Never hard-code the key.

## 3. Movie card
> Create an accessible reusable movie card showing poster, title, year, type, and a favorite toggle. Add missing/broken poster fallback, descriptive button labels, and responsive styling. Keep API logic out of the card.

## 4. Firebase auth
> Configure Firebase from environment variables. Implement a React auth context using `onAuthStateChanged`, register, login, and logout. If Firebase isn't configured, show a clear message rather than pretending authentication works.

## 5. Favorites
> Store favorites at `favorites/{uid}/{imdbID}` in Firebase Realtime Database. Users must only access their own favorites. Handle loading/errors and provide security rules. Explain that frontend checks do not replace database rules.

## 6. Protected routes
> Use React Router for Discover, Favorites, and Auth. Signed-out users should be redirected to Auth when opening Favorites or clicking a favorite button. Preserve the intended destination. Add loading, no-results, API-error, and configuration feedback.

## 7. Code review
> Review for TypeScript errors, stale state, broken routes, inaccessible buttons, missing poster handling, and unsafe Firebase assumptions. Identify actual issues, suggest minimal changes, and do not claim a fix is complete until verified.

## 8. Documentation
> Write README, AI usage, and manual review documentation. Separate implemented safeguards from tests that still need to be run. Do not invent test results or manual edits.
