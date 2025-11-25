import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'art_explorer_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  });

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  const toggleFavorite = (artwork) => {
    setFavorites(prevFavorites => {
      const isFavorited = prevFavorites.some(fav => fav.id === artwork.id);

      if (isFavorited) {
        // Remove from favorites
        return prevFavorites.filter(fav => fav.id !== artwork.id);
      } else {
        // Add to favorites
        return [...prevFavorites, artwork];
      }
    });
  };

  const isFavorite = (artworkId) => {
    return favorites.some(fav => fav.id === artworkId);
  };

  const getFavoriteCount = () => {
    return favorites.length;
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCount
  };
};
