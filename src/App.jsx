import React from 'react';
import Gallery from './components/Gallery';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <div className="app-container">
        <header style={{ padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: 'var(--accent-color)' }}>
            Art Explorer
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Discover masterpieces from the Art Institute of Chicago
          </p>
        </header>
        <main>
          <Gallery />
        </main>
      </div>
    </FavoritesProvider>
  );
}

export default App;
