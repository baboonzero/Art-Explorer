<div align="center">

# 🎨 Art Explorer

**Discover Masterpieces from the Art Institute of Chicago**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com/)

*A modern, interactive web application for exploring thousands of artworks from one of the world's premier art collections.*

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [API Documentation](#-api-documentation)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Performance](#-performance)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**Art Explorer** is a beautifully designed web application that brings the Art Institute of Chicago's extensive collection to your browser. Built with modern React and Vite, it offers an intuitive interface for discovering, searching, and curating your personal collection of masterpieces.

### What We've Built

- ✅ **Interactive Gallery**: Browse artworks by art movement with smooth animations
- ✅ **Unified Search**: Search across artworks and artists simultaneously
- ✅ **Favorites System**: Save and manage your favorite artworks locally
- ✅ **Immersive UI**: 3D flip cards with full-screen image viewing
- ✅ **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ✅ **Production Ready**: Optimized build with code splitting and performance enhancements

### What We've Shipped

- 🚀 **Live Deployment**: Ready for deployment on Netlify/Vercel
- 📦 **Optimized Build**: Code splitting, minification, and asset optimization
- 🎨 **Modern UI**: Glassmorphic design with dark theme and gold accents
- 🔍 **Smart Search**: Artist-aware search that enriches results
- 💾 **Local Persistence**: Favorites saved in browser localStorage
- 📱 **Mobile First**: Fully responsive and touch-friendly

---

## ✨ Features

### 🖼️ **Style-Based Browsing**
Browse curated collections by art movement:
- Impressionism
- Post-Impressionism
- Surrealism
- Pop Art
- Renaissance
- Abstract Expressionism
- Cubism
- Modernism
- Art Deco
- Baroque

### 🔍 **Unified Search System**
Our intelligent search performs parallel queries across:
- **Artworks**: Direct artwork title and metadata search
- **Artists**: Artist name search with automatic artwork expansion
- **Smart Merging**: Combines results, removes duplicates, and limits to 24 items
- **Artist Highlighting**: Shows which artists matched your search

### ❤️ **Favorites Management**
- One-click favoriting with heart icon
- Persistent storage using browser localStorage
- Dedicated favorites view with toggle button
- Real-time favorite count badge
- Instant access to saved artworks

### 🎴 **Interactive Art Cards**
- **3D Flip Animation**: Click to flip and see artwork details
- **Full-Screen Modal**: Expand images for detailed viewing
- **Hover Effects**: Smooth transitions and visual feedback
- **Metadata Display**: Artist, date, and medium information

### 🎨 **Modern UI/UX**
- **Glassmorphic Design**: Frosted glass effects with backdrop blur
- **Dark Theme**: Easy on the eyes with gold accent colors
- **Smooth Animations**: CSS transitions and transforms
- **Loading States**: Elegant spinners and error handling
- **Responsive Grid**: Auto-adjusting layout for all screen sizes

---

## 🛠️ Tech Stack

### Core Technologies
- **[React 19.2.0](https://react.dev/)** - Modern UI library with latest features
- **[Vite 7.2.4](https://vitejs.dev/)** - Lightning-fast build tool and dev server
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons

### Development Tools
- **ESLint 9** - Code linting and quality assurance
- **Node.js 18+** - Runtime environment
- **npm** - Package management

### Styling
- **Custom CSS** - Vanilla CSS with CSS variables
- **Google Fonts** - Inter (body) and Playfair Display (headings)
- **CSS Grid & Flexbox** - Modern layout techniques

### State Management
- **React Context API** - Global favorites state
- **React Hooks** - useState, useEffect, useContext
- **localStorage** - Client-side persistence

---

## 📡 API Documentation

Art Explorer leverages the **Art Institute of Chicago's Public API** to fetch artwork data and images. The API is free, open, and requires no authentication.

### Base URLs

```
Artworks API:  https://api.artic.edu/api/v1
Images API:    https://lakeimagesweb.artic.edu/iiif/2
```

### API Endpoints Used

#### 1. **Artworks Search Endpoint**

**Endpoint:** `GET /api/v1/artworks/search`

**Purpose:** Search for artworks by keyword, style, or artist name.

**Query Parameters:**
- `q` (string, required) - Search query (style name, artwork title, or keyword)
- `fields` (string) - Comma-separated list of fields to return
- `limit` (number) - Number of results per page (default: 12)
- `page` (number) - Page number for pagination
- `is_public_domain` (boolean) - Filter to public domain artworks only

**Example Request:**
```javascript
fetch(
  `https://api.artic.edu/api/v1/artworks/search?q=Impressionism&fields=id,title,artist_display,date_display,medium_display,image_id&limit=12&is_public_domain=true`
)
```

**Response Structure:**
```json
{
  "data": [
    {
      "id": 12345,
      "title": "Artwork Title",
      "artist_display": "Artist Name\nBirth–Death",
      "date_display": "1889",
      "medium_display": "Oil on canvas",
      "image_id": "abc123def456"
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 12,
    "offset": 0,
    "total_pages": 9,
    "current_page": 1
  }
}
```

**Fields Used:**
- `id` - Unique artwork identifier
- `title` - Artwork title
- `artist_display` - Formatted artist name with dates
- `date_display` - Creation date or date range
- `medium_display` - Materials and techniques used
- `image_id` - Identifier for IIIF image retrieval

#### 2. **Agents Search Endpoint**

**Endpoint:** `GET /api/v1/agents/search`

**Purpose:** Search for artists, creators, and other agents in the collection.

**Query Parameters:**
- `q` (string, required) - Artist name or keyword
- `fields` (string) - Fields to return
- `limit` (number) - Number of results

**Example Request:**
```javascript
fetch(
  `https://api.artic.edu/api/v1/agents/search?q=Van Gogh&fields=id,title&limit=5`
)
```

**Response Structure:**
```json
{
  "data": [
    {
      "id": 67890,
      "title": "Vincent van Gogh"
    }
  ]
}
```

**Usage in Art Explorer:**
When a user searches for an artist name, we:
1. Search both artworks and agents in parallel
2. For each matching artist, fetch additional artworks
3. Merge all results and remove duplicates
4. Display up to 24 unique artworks

#### 3. **IIIF Image API**

**Endpoint:** `GET /iiif/2/{image_id}/full/{size}/0/default.jpg`

**Purpose:** Retrieve artwork images using the International Image Interoperability Framework (IIIF).

**URL Structure:**
```
https://lakeimagesweb.artic.edu/iiif/2/{image_id}/full/{width},/0/default.jpg
```

**Parameters:**
- `{image_id}` - Image identifier from artwork data
- `{width}` - Desired image width (we use 843px for thumbnails)

**Example:**
```javascript
const imageUrl = `https://lakeimagesweb.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
```

**Note:** We use `lakeimagesweb.artic.edu` instead of `www.artic.edu/iiif/2` because the LAKE system is the Art Institute's content management system and provides reliable image access.

### API Features

✅ **No Authentication Required** - Public API, free to use  
✅ **CORS Enabled** - Works directly from browser  
✅ **Rate Limiting** - Generous limits for public use  
✅ **Public Domain Filter** - Option to show only public domain artworks  
✅ **Rich Metadata** - Comprehensive artwork information  
✅ **High-Quality Images** - IIIF standard for flexible image delivery  

### API Rate Limits

The Art Institute API is generous with rate limits for public use. However, we implement:
- Parallel requests for efficiency
- Result limiting (24 items max)
- Error handling and retry logic
- Client-side caching considerations

### API Documentation

For complete API documentation, visit:
- [Art Institute API Docs](https://api.artic.edu/docs/)
- [IIIF Image API Spec](https://iiif.io/api/image/2.1/)

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 9.0.0 or higher (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/art-explorer.git
   cd art-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

### Verify Installation

After starting the dev server, you should see:
- ✅ Vite dev server running on port 5173
- ✅ No console errors
- ✅ Artworks loading from the API
- ✅ Interactive UI responding to clicks

---

## 💻 Usage

### Development Commands

```bash
# Start development server with hot module replacement
npm run dev

# Build for production (creates optimized dist/ folder)
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

### Using the Application

1. **Browse by Style**
   - Select an art movement from the style selector
   - View artworks in a responsive grid
   - Click "Load More Artworks" for pagination

2. **Search for Artworks**
   - Type in the search bar (artwork title, artist name, or keyword)
   - Click "Search" or press Enter
   - View unified results from artworks and artists

3. **Save Favorites**
   - Click the heart icon on any artwork card
   - Toggle the "Favorites" button to view saved items
   - Favorites persist across browser sessions

4. **Explore Artwork Details**
   - Click a card to flip and see metadata
   - Click the expand icon for full-screen viewing
   - View artist, date, and medium information

---

## 📁 Project Structure

```
art-explorer/
├── public/
│   └── vite.svg              # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg         # React logo
│   ├── components/
│   │   ├── ArtCard.jsx       # Individual artwork card with flip animation
│   │   ├── Gallery.jsx       # Main gallery container with search & filters
│   │   ├── SearchBar.jsx     # Search input component
│   │   └── StyleSelector.jsx # Art movement selector buttons
│   ├── context/
│   │   └── FavoritesContext.jsx  # React Context for favorites state
│   ├── hooks/
│   │   └── useFavorites.js   # Custom hook for favorites (alternative to context)
│   ├── App.jsx               # Root component with FavoritesProvider
│   ├── index.css             # Global styles and CSS variables
│   └── main.jsx              # Application entry point
├── .gitignore                # Git ignore rules
├── index.html                # HTML template with SEO meta tags
├── netlify.toml              # Netlify deployment configuration
├── package.json               # Dependencies and scripts
├── vite.config.js            # Vite build configuration
└── README.md                  # This file
```

### Component Architecture

```
App
└── FavoritesProvider (Context)
    └── Gallery
        ├── SearchBar
        ├── StyleSelector
        └── ArtCard[] (mapped from artworks)
            └── [Flip Animation]
            └── [Full-Screen Modal]
```

### State Management Flow

1. **Global State (Context)**
   - `FavoritesContext` manages favorites array
   - Persists to localStorage automatically
   - Provides `toggleFavorite`, `isFavorite`, `getFavoriteCount`

2. **Component State (Hooks)**
   - `Gallery`: Manages artworks, loading, search query, selected style
   - `ArtCard`: Manages flip state and modal visibility
   - `SearchBar`: Manages input value

3. **Data Flow**
   - User interaction → State update → API call → Render update

---

## 🌐 Deployment

### Netlify Deployment (Recommended)

Art Explorer is configured for easy deployment on Netlify.

#### Quick Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://www.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Netlify auto-detects settings from `netlify.toml`
   - Click "Deploy site"

3. **Your site is live!**
   - Get a URL like `art-explorer-123abc.netlify.app`
   - Automatic deployments on every push

#### Configuration

The `netlify.toml` file configures:
- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing: All routes redirect to `index.html`
- Node version: 18

### Alternative Platforms

**Vercel:**
```bash
npm i -g vercel
vercel
```

**GitHub Pages:**
```bash
npm install --save-dev gh-pages
npm run deploy
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

---

## ⚡ Performance

### Build Optimization

- **Code Splitting**: React vendor and Lucide icons in separate chunks
- **Minification**: ESBuild for fast, optimized bundles
- **Tree Shaking**: Unused code automatically removed
- **Asset Optimization**: CSS and JS minified and gzipped

### Build Output

```
dist/
├── index.html (1.97 KB)
├── assets/
│   ├── index-[hash].css (1.01 KB, gzipped: 0.51 KB)
│   ├── react-vendor-[hash].js (11.21 KB, gzipped: 4.03 KB)
│   ├── lucide-icons-[hash].js (2.44 KB, gzipped: 1.27 KB)
│   └── index-[hash].js (197.90 KB, gzipped: 61.36 KB)
```

**Total Size:** ~213 KB (67 KB gzipped)

### Performance Features

- ✅ Lazy loading ready (can be added for images)
- ✅ Efficient re-renders with React 19
- ✅ Optimized API calls with parallel requests
- ✅ Client-side caching with localStorage
- ✅ Fast initial load with code splitting

---

## 🗺️ Roadmap

### Planned Features

- [ ] **Image Lazy Loading** - Load images as user scrolls
- [ ] **Loading Skeletons** - Better loading states
- [ ] **Error Retry** - Automatic retry on API failures
- [ ] **Advanced Filters** - Filter by date, medium, artist nationality
- [ ] **Collections** - Organize favorites into custom collections
- [ ] **Share Functionality** - Share artworks and collections
- [ ] **PWA Support** - Installable app with offline support
- [ ] **Dark/Light Theme Toggle** - User preference
- [ ] **Keyboard Navigation** - Full keyboard accessibility
- [ ] **Artwork Comparison** - Side-by-side comparison tool

### Future Enhancements

- [ ] User accounts with cloud sync
- [ ] Social features (comments, sharing)
- [ ] Artwork recommendations
- [ ] Educational content (art history, artist bios)
- [ ] High-resolution image downloads
- [ ] Virtual gallery tours
- [ ] Artwork timeline visualization

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the complete enhancement roadmap.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with descriptive messages (`git commit -m 'Add amazing feature'`)
5. Push to your fork (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Contribution Guidelines

- Follow existing code style and patterns
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Keep commits focused and atomic

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- ♿ Accessibility improvements
- 🧪 Test coverage

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Art Institute of Chicago** - For providing the amazing public API and art collection
- **React Team** - For the incredible framework
- **Vite Team** - For the blazing-fast build tool
- **Lucide** - For the beautiful icon set
- **Google Fonts** - For Inter and Playfair Display fonts

### Resources

- [Art Institute of Chicago](https://www.artic.edu/)
- [Art Institute API Documentation](https://api.artic.edu/docs/)
- [IIIF Image API](https://iiif.io/api/image/2.1/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

<div align="center">

**Made with ❤️ for art lovers everywhere**

[⭐ Star this repo](https://github.com/yourusername/art-explorer) • [🐛 Report Bug](https://github.com/yourusername/art-explorer/issues) • [💡 Request Feature](https://github.com/yourusername/art-explorer/issues)

</div>
