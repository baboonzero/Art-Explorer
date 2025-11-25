import React, { useState, useEffect } from 'react';
import StyleSelector from './StyleSelector';
import SearchBar from './SearchBar';
import ArtCard from './ArtCard';
import { Loader2, AlertCircle, RefreshCw, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Gallery = () => {
  const [selectedStyle, setSelectedStyle] = useState('Impressionism');
  const [searchQuery, setSearchQuery] = useState('');
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchResultsInfo, setSearchResultsInfo] = useState(null);
  const [viewingFavorites, setViewingFavorites] = useState(false);
  const { favorites, getFavoriteCount } = useFavorites();

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      setError(null);
      setSearchResultsInfo(null);

      try {
        if (viewingFavorites) {
          // Show favorites from localStorage
          setArtworks(favorites);
          setLoading(false);
          return;
        }

        if (searchQuery) {
          // Unified search: search both artworks and artists
          const [artworksResponse, artistsResponse] = await Promise.all([
            fetch(
              `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(searchQuery)}&fields=id,title,artist_display,date_display,medium_display,image_id&limit=12&is_public_domain=true`
            ),
            fetch(
              `https://api.artic.edu/api/v1/agents/search?q=${encodeURIComponent(searchQuery)}&fields=id,title&limit=5`
            )
          ]);

          if (!artworksResponse.ok) {
            throw new Error('Failed to fetch artworks');
          }

          const artworksData = await artworksResponse.json();
          let allArtworks = artworksData.data.filter(art => art.image_id);

          // If we found artists, fetch their artworks too
          if (artistsResponse.ok) {
            const artistsData = await artistsResponse.json();

            if (artistsData.data && artistsData.data.length > 0) {
              // Fetch artworks for each found artist
              const artistArtworksPromises = artistsData.data.map(artist =>
                fetch(
                  `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(artist.title)}&fields=id,title,artist_display,date_display,medium_display,image_id&limit=4&is_public_domain=true`
                ).then(res => res.ok ? res.json() : null)
              );

              const artistArtworksResults = await Promise.all(artistArtworksPromises);

              // Combine artist artworks
              artistArtworksResults.forEach(result => {
                if (result && result.data) {
                  const validArtworks = result.data.filter(art => art.image_id);
                  allArtworks = [...allArtworks, ...validArtworks];
                }
              });

              setSearchResultsInfo({
                foundArtists: artistsData.data.map(a => a.title),
                totalResults: allArtworks.length
              });
            }
          }

          // Remove duplicates by id
          const uniqueArtworks = Array.from(
            new Map(allArtworks.map(art => [art.id, art])).values()
          );

          setArtworks(uniqueArtworks.slice(0, 24));
        } else {
          // Style-based search (original behavior)
          const response = await fetch(
            `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(selectedStyle)}&fields=id,title,artist_display,date_display,medium_display,image_id&limit=12&page=${page}&is_public_domain=true`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch artworks');
          }

          const data = await response.json();
          const validArtworks = data.data.filter(art => art.image_id);
          setArtworks(validArtworks);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [selectedStyle, page, searchQuery, viewingFavorites, favorites]);

  // Reset page when style, search, or view mode changes
  useEffect(() => {
    setPage(1);
  }, [selectedStyle, searchQuery, viewingFavorites]);

  const handleRefresh = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setViewingFavorites(false);
    setPage(1);
  };

  const handleToggleFavorites = () => {
    setViewingFavorites(!viewingFavorites);
    setSearchQuery('');
    setPage(1);
  };

  return (
    <div className="gallery-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

      <div style={{ marginBottom: '2rem' }}>
        <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={handleToggleFavorites}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '50px',
            border: `1px solid ${viewingFavorites ? 'var(--accent-color)' : 'var(--glass-border)'}`,
            background: viewingFavorites ? 'var(--accent-color)' : 'var(--glass-bg)',
            color: viewingFavorites ? '#000' : 'var(--text-primary)',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: viewingFavorites ? '0 0 20px var(--accent-glow)' : 'none',
            position: 'relative'
          }}
          onMouseOver={(e) => {
            if (!viewingFavorites) {
              e.currentTarget.style.borderColor = 'var(--accent-color)';
              e.currentTarget.style.color = 'var(--accent-color)';
            }
          }}
          onMouseOut={(e) => {
            if (!viewingFavorites) {
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }
          }}
        >
          <Heart
            size={20}
            fill={viewingFavorites ? '#000' : 'none'}
            color={viewingFavorites ? '#000' : 'var(--accent-color)'}
          />
          <span>Favorites</span>
          {getFavoriteCount() > 0 && (
            <span style={{
              background: viewingFavorites ? '#000' : 'var(--accent-color)',
              color: viewingFavorites ? 'var(--accent-color)' : '#000',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              {getFavoriteCount()}
            </span>
          )}
        </button>
      </div>

      {!searchQuery && !viewingFavorites && (
        <div style={{ marginBottom: '3rem' }}>
          <StyleSelector
            selectedStyle={selectedStyle}
            onSelectStyle={(style) => {
              setSelectedStyle(style);
              setViewingFavorites(false);
            }}
          />
        </div>
      )}

      {searchQuery && !loading && !error && searchResultsInfo && searchResultsInfo.foundArtists.length > 0 && (
        <div style={{
          marginBottom: '2rem',
          padding: '1rem 1.5rem',
          background: 'var(--glass-bg)',
          border: '1px solid var(--accent-color)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--text-primary)', margin: 0 }}>
            Found artists: <span style={{ color: 'var(--accent-color)', fontWeight: 600 }}>
              {searchResultsInfo.foundArtists.join(', ')}
            </span>
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 0' }}>
            Showing {searchResultsInfo.totalResults} artworks
          </p>
        </div>
      )}

      {error && (
        <div style={{ 
          textAlign: 'center', 
          color: '#ff6b6b', 
          padding: '2rem',
          background: 'rgba(255, 107, 107, 0.1)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle size={24} />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px' 
        }}>
          <Loader2 className="spin" size={48} color="var(--accent-color)" />
          <style>{`
            .spin { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
        </div>
      ) : (
        <div className="art-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {artworks.map((artwork) => (
            <ArtCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}

      {!loading && artworks.length === 0 && !error && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>
            {viewingFavorites
              ? 'No favorites yet. Click the heart icon on any artwork to add it to your favorites!'
              : searchQuery
              ? `No artworks found for "${searchQuery}". Try a different search term.`
              : 'No artworks found for this style. Try another one.'}
          </p>
        </div>
      )}

      {!loading && artworks.length > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
          paddingBottom: '2rem'
        }}>
          <button
            onClick={handleRefresh}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              borderRadius: '50px',
              border: '1px solid var(--accent-color)',
              background: 'var(--glass-bg)',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--accent-color)';
              e.currentTarget.style.color = '#000';
              e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'var(--glass-bg)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <RefreshCw size={20} />
            <span>Load More Artworks</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
