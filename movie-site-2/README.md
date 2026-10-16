# Cineva – Premium Movie Streaming Frontend

A complete, production-minded movie and TV series discovery platform built with **pure HTML5, CSS3, and vanilla JavaScript**. No React, Vue, Angular, Tailwind, or Bootstrap.

**Brand:** Cineva  
**Palette:** Pure red `#FF0000`, pure black `#000000`, pure white `#FFFFFF`  
**Constraint:** No CSS gradients anywhere.

## Features

- 40+ distinct page views (home, explore, movies, series, anime, genres, trending, details, player, library, account, legal, 404, etc.)
- 60+ sample titles (movies, series, anime) with structured metadata
- Hero carousel with auto-rotation, keyboard-friendly controls, reduced-motion support
- Search overlay (Ctrl/Cmd+K) with recent searches and live results
- Advanced filters (type, genre, rating, sort)
- My List, Favorites, Watch History, Continue Watching via LocalStorage
- Movie and series detail pages with cast, similar titles, season/episode selectors
- HTML5 player shell with honest “source not configured” state
- Responsive layout (320px–1440px+)
- Accessible focus states, semantic HTML, ARIA where appropriate
- Shared design system (CSS custom properties), modular JS (ES modules)

## Project structure

```
movie-platform/
├── index.html                 # Homepage
├── pages/                     # All secondary pages
├── assets/
│   ├── css/
│   │   ├── tokens.css         # Design tokens
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── pages.css
│   │   └── responsive.css
│   ├── js/
│   │   ├── data.js            # Catalog (60+ titles)
│   │   ├── storage.js         # LocalStorage layer
│   │   ├── components.js      # Cards, toasts, helpers
│   │   ├── app.js             # Header, footer, search
│   │   └── page-loader.js     # Shared page logic
│   ├── images/
│   ├── icons/
│   └── videos/
└── README.md
```

## How to open

**No server required.** Open `index.html` directly in your browser (double-click the file, or File → Open).

All scripts are plain JavaScript (no ES modules), so the site works with the `file://` protocol.

```
movie-platform/index.html   ← open this file
```

Optional: you can still use a local server if you prefer (`python3 -m http.server`), but it is not needed.

## Design system

| Token            | Value     |
|------------------|-----------|
| Accent           | `#FF0000` |
| Background       | `#000000` |
| Text             | `#FFFFFF` |
| Font             | Inter     |
| Radius           | 2–6px     |
| Poster ratio     | 2 / 3     |

No gradients, no glassmorphism, no neon glow. Solid overlays only for text readability on hero imagery.

## Data

All catalog data lives in `assets/js/data.js`. Posters/backdrops use placeholder images (`placehold.co`) so the UI never depends on a secret API key. Image failures fall back to styled title placeholders.

To connect a real API (e.g. TMDB), replace the data module while keeping the same field shapes. **Do not expose API keys in frontend code.**

## LocalStorage keys (prefixed `cineva_`)

- `mylist`, `favorites`, `history`, `progress`
- `recent_searches`, `profile`, `preferences`, `notifications`

Use **Account → Reset all demo data** to clear.

## Known limitations

- Video sources are not configured; the watch page shows a professional unavailable state.
- Profile/auth is a local demo only.
- Recommendations are popularity-based demos, not a remote ML service.
- Placeholder artwork is used instead of production stills.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). No build step or local server required.

## License

Demo / portfolio project. Sample metadata is illustrative and not for commercial redistribution of content.

## Sign in & admin (added)

### Sign in
- Click the **profile avatar** in the header → **Sign in**.
- Demo only (email stored in localStorage). No full account system.
- Adding to **Favourites** or **My List / Watchlist** while signed out opens a **Sign in** popup.

### Hidden admin
- URL (not linked in navigation): `pages/admin.html`
- Shortcut: open that path directly, or from site root: `/pages/admin.html`
- Password: `cineva-admin` (session unlock)
- Admin can **add movies** (title, genre, year, VJ, description, movie URL, poster URL). New titles merge into the live catalogue (same as `data.js`) via localStorage so the front end shows them like built-in titles.
- **Export** button copies a `data.js` snippet for permanent paste into the file if desired.
- Dashboard shows per-movie **views, downloads, favourites, watchlist** counts and per-**VJ** views/downloads.
- Views are recorded when a movie details page is opened; downloads when the Download link is used.

## Auth pages
- `pages/signin.html` — dedicated sign in
- `pages/signup.html` — dedicated sign up
- `pages/profile.html` — name, email, watchlist, favourites, change password

## Notifications
- Bell icon in the header (badge for unread)
- Users: `pages/notifications.html`
- Admins: Requests & Notifications panels on `pages/admin.html`
- Users can request missing movies on **Recommendations**; admins receive a notification

## New / fixed pages
- `pages/trending.html` — trending catalogue
- `pages/recommendations.html` — recommendations + movie request form
