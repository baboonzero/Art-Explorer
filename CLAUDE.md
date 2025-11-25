# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Art Explorer is a React-based web application that displays artworks from the Art Institute of Chicago's public API. Users can browse artworks by different art styles (Impressionism, Surrealism, Pop Art, etc.) with an interactive card-flip interface.

## Development Commands

```bash
# Start development server with hot module replacement
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build locally
npm run preview
```

## Architecture

### Component Hierarchy

- `App.jsx` - Root component with header and Gallery mount point
- `Gallery.jsx` - Main container that manages art style selection, API fetching, loading/error states
- `StyleSelector.jsx` - Button group for selecting art styles (10 predefined styles)
- `ArtCard.jsx` - Individual artwork cards with flip animation showing image (front) and details (back)

### State Management

The application uses React hooks for state management:

- `Gallery.jsx` manages global state: `selectedStyle`, `artworks`, `loading`, `error`
- `ArtCard.jsx` manages local flip state: `isFlipped`
- State flows down through props; `StyleSelector` receives `selectedStyle` and `onSelectStyle` callback

### Data Flow

1. User selects a style via `StyleSelector`
2. `Gallery` component's `useEffect` triggers on `selectedStyle` change
3. Fetches from Art Institute of Chicago API: `https://api.artic.edu/api/v1/artworks/search?q={style}&fields=id,title,artist_display,date_display,medium_display,image_id&limit=12&is_public_domain=true`
4. Filters artworks to only include those with `image_id`
5. Renders grid of `ArtCard` components
6. Images are loaded from IIIF endpoint: `https://lakeimagesweb.artic.edu/iiif/2/{image_id}/full/843,/0/default.jpg`

**Important**: The IIIF image endpoint uses `lakeimagesweb.artic.edu` rather than `www.artic.edu/iiif/2` (which returns 403 errors). LAKE is the Art Institute's content management system.

### Styling System

Uses CSS custom properties (CSS variables) defined in `src/index.css`:
- Dark theme with glassmorphism effects
- Gold accent color (`#d4af37`)
- Two font families: Playfair Display (headings), Inter (body)
- Inline styles throughout components (no CSS modules or styled-components)

### ESLint Configuration

Uses flat config format (`eslint.config.js`):
- Targets `.js` and `.jsx` files
- React Hooks plugin with recommended rules
- React Refresh plugin for Vite
- Custom rule: unused vars allowed if they match `^[A-Z_]` pattern
- Ignores `dist/` directory

## API Integration

The app integrates with the Art Institute of Chicago API:
- No authentication required
- Search endpoint used with style keywords
- Only public domain artworks requested
- Images served via IIIF protocol
- API response includes artwork metadata: title, artist, date, medium

## File Structure

```
src/
  components/
    ArtCard.jsx       - Flippable card with artwork image and details
    Gallery.jsx       - Main container with fetching logic
    StyleSelector.jsx - Art style filter buttons
  App.jsx            - Root component
  main.jsx          - React DOM entry point
  index.css         - Global styles and CSS variables
```
