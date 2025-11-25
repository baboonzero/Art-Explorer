import React, { useState } from 'react';
import { X, Heart, Maximize } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const ArtCard = ({ artwork }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(artwork.id);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card flip when clicking heart
    toggleFavorite(artwork);
  };

  const handleExpandClick = (e) => {
    e.stopPropagation(); // Prevent card flip when clicking expand
    setIsExpanded(!isExpanded);
  };

  const imageUrl = artwork.image_id
    ? `https://lakeimagesweb.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
    : 'https://via.placeholder.com/400x600?text=No+Image';

  return (
    <>
      <div
        className="art-card-container"
        onClick={handleFlip}
        style={{
          perspective: '1000px',
          width: '100%',
          height: '400px',
          cursor: 'pointer'
        }}
      >
        <div
          className="art-card-inner"
          style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          borderRadius: '16px',
        }}
      >
        {/* Front */}
        <div
          className="art-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'var(--card-bg)',
          }}
        >
          <img
            src={imageUrl}
            alt={artwork.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease'
            }}
          />
          <button
            onClick={handleFavoriteClick}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.6)',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.3)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Heart
              size={20}
              color={favorited ? 'var(--accent-color)' : '#fff'}
              fill={favorited ? 'var(--accent-color)' : 'none'}
              style={{ transition: 'all 0.3s ease' }}
            />
          </button>
          <button
            onClick={handleExpandClick}
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              background: 'rgba(0, 0, 0, 0.3)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(5px)',
              transition: 'all 0.3s ease',
              zIndex: 10,
              opacity: 0.5
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.4)';
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
              e.currentTarget.style.opacity = '0.5';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Maximize size={18} color="#fff" />
          </button>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.5rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '1.2rem',
              marginBottom: '0.25rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {artwork.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--accent-color)' }}>
              {artwork.artist_display ? artwork.artist_display.split('\n')[0] : 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* Back */}
        <div 
          className="art-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'var(--card-bg)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid var(--glass-border)'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            cursor: 'pointer'
          }}>
            <X size={24} color="var(--text-secondary)" />
          </div>
          
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '1rem', 
            color: 'var(--accent-color)' 
          }}>
            {artwork.title}
          </h3>
          
          <div style={{ textAlign: 'left', width: '100%' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--text-secondary)' }}>Artist:</strong><br/> 
              {artwork.artist_display || 'Unknown'}
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--text-secondary)' }}>Date:</strong><br/> 
              {artwork.date_display || 'Unknown'}
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: 'var(--text-secondary)' }}>Medium:</strong><br/> 
              {artwork.medium_display || 'Unknown'}
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* Expanded Image Modal */}
      {isExpanded && (
        <div
          onClick={handleExpandClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer',
            animation: 'fadeIn 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
        >
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes zoomIn {
              from {
                transform: scale(0.8);
                opacity: 0;
              }
              to {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              animation: 'zoomIn 0.3s ease',
            }}
          >
            <img
              src={imageUrl}
              alt={artwork.title}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
              }}
            />

            <button
              onClick={handleExpandClick}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(0, 0, 0, 0.7)',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                zIndex: 10
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.7)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <X size={24} color="#fff" />
            </button>

            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.5rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
              borderRadius: '0 0 8px 8px'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '0.5rem',
                color: '#fff'
              }}>
                {artwork.title}
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--accent-color)', margin: 0 }}>
                {artwork.artist_display ? artwork.artist_display.split('\n')[0] : 'Unknown Artist'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtCard;
