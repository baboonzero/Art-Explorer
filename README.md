# Art Explorer

Curate a personalized gallery powered by the [Art Institute of Chicago API](https://api.artic.edu/docs/#introduction). Art Explorer helps you search by style, run unified artist/artwork queries, and save favorites locally in a sleek, glassmorphic UI built with React and Vite.

## Features
- **Smart gallery:** Browse curated art styles (Impressionism, Renaissance, etc.) or free-text search across artworks and artist records.
- **Artist-aware search:** When a search term matches artists, the app fetches additional works per artist and merges them into a single, deduplicated feed.
- **Favorites workspace:** Heart any piece to pin it to a local gallery (stored in `localStorage`), toggle between “All” and “Favorites,” and see the running count in the UI.
- **Immersive cards:** Flip cards to reveal metadata, pop out images into a modal viewer, and enjoy subtle animation flourishes with Lucide icons.
- **Offline-first persistence:** Favorites are available instantly on reload thanks to a context/provider layer that hydrates from the browser.

## Tech Stack
- **Frontend:** React 19 + Vite 7 with hot-module reloading.
- **UI:** Custom CSS theme (Inter + Playfair), Lucide icons, lightweight inline styling.
- **State:** React context + hooks for favorites, local `useState` for gallery controls.
- **Tooling:** ESLint 9, modern JSX transform, npm scripts (`dev`, `build`, `preview`, `lint`).

## Getting Started
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (default `http://localhost:5173`) and start exploring.

### Environment & Dependencies
- Node 18+ recommended for Vite 7.
- Network access to `api.artic.edu` and `lakeimagesweb.artic.edu` is required for data + IIIF images.
- No API key needed; the app only consumes public endpoints.

## Project Structure
```
src/
  App.jsx                # Shell that mounts Gallery inside the FavoritesProvider
  components/
    Gallery.jsx          # Fetch logic, search bar, style selector, pagination, view toggles
    ArtCard.jsx          # Flip-card UI with modal zoom + favorite button
    SearchBar.jsx        # Unified search input + clear action
    StyleSelector.jsx    # Chip-style style picker
  context/
    FavoritesContext.jsx # Context provider for favorites (localStorage backed)
  hooks/
    useFavorites.js      # Hook version of the favorites helper (for non-context usage)
  index.css              # Global theme tokens + base styles
```

## How It Works
1. **Gallery boot flow**
   - Loads a default style (Impressionism) and fetches matching artworks (`/api/v1/artworks/search`).
   - Displays cards once valid IIIF images are found.
2. **Search mode**
   - Hits `/artworks/search` and `/agents/search` in parallel for the query term.
   - Takes artist matches, fetches up to 4 additional artworks per artist, merges, deduplicates, and trims to 24 entries.
   - Highlights matching artist names and total result counts above the grid.
3. **Favorites mode**
   - Reads/writes an array of artworks to `localStorage` under `art_explorer_favorites`.
   - Toggling the Favorites filter simply swaps the in-memory dataset with the saved list.

## Scripts
- `npm run dev` – Start the Vite dev server with HMR.
- `npm run build` – Produce an optimized production build.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint across the project.

## Roadmap Ideas
- Add pagination UI controls for search results.
- Integrate loading skeletons and error retry states.
- Expand the README with deployment instructions once hosting is configured.
- Build automated tests around the favorites context and fetch orchestration.

---
Questions or ideas? Open an issue or start a discussion in this repo. Happy exploring! 🚀
