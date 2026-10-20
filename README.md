# CineScope — Movie Discovery App

React + TypeScript + Vite movie discovery app using OMDb API, Firebase Authentication, Firebase Realtime Database, and React Router. The project follows a lightweight MVVM-inspired structure.

## Features
- Parallel searches across popular title seeds, deduplicated and shuffled to show up to 20 movies.
- Keyword search via OMDb.
- Responsive reusable movie cards with poster fallback and favorite controls.
- Email/password registration, login, logout, and auth-state listener.
- Per-user favorites at `favorites/{uid}/{imdbID}`.
- Protected Favorites route and auth redirect when a signed-out visitor tries to favorite a movie.
- Loading, empty, error, and missing-configuration states.

## Setup
1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Get an OMDb key at https://www.omdbapi.com/apikey.aspx and set `VITE_OMDB_API_KEY`.
4. Create a Firebase project. Enable Email/Password in Authentication → Sign-in method.
5. Create Realtime Database and set its URL in `VITE_FIREBASE_DATABASE_URL`.
6. Copy your Firebase web-app settings into `.env`.
7. Apply the security rules below.
8. Run `npm install` then `npm run dev`.

## Firebase Realtime Database rules
```json
{
  "rules": {
    "favorites": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```
These rules are essential: client-side checks alone do not secure data. Test with two accounts before claiming cross-user isolation works.

## Environment and deployment notes
Never commit `.env` or real secrets. Firebase web config is designed for client apps but database access must be protected by rules. An OMDb key used directly by a browser can be seen in network requests; use a server-side proxy if it must remain confidential.

## Commands
`npm run dev` — local development  
`npm run lint` — lint source  
`npm run build` — TypeScript and production build

## Architecture
- `src/models/`: shared data types.
- `src/services/`: OMDb and Firebase integration.
- `src/viewmodels/`: auth context and state/business logic hooks.
- `src/views/`: route-level UI and reusable movie-card UI.

This is MVVM-inspired, not a strict MVVM framework.
