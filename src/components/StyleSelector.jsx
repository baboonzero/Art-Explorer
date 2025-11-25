import React from 'react';

const styles = [
  "Impressionism",
  "Post-Impressionism",
  "Surrealism",
  "Pop Art",
  "Renaissance",
  "Abstract Expressionism",
  "Cubism",
  "Modernism",
  "Art Deco",
  "Baroque"
];

const StyleSelector = ({ selectedStyle, onSelectStyle }) => {
  return (
    <div className="style-selector-container" style={{ 
      display: 'flex', 
      gap: '1rem', 
      overflowX: 'auto', 
      padding: '1rem 2rem',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      {styles.map((style) => (
        <button
          key={style}
          onClick={() => onSelectStyle(style)}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '50px',
            border: `1px solid ${selectedStyle === style ? 'var(--accent-color)' : 'var(--glass-border)'}`,
            background: selectedStyle === style ? 'var(--accent-color)' : 'var(--glass-bg)',
            color: selectedStyle === style ? '#000' : 'var(--text-primary)',
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            boxShadow: selectedStyle === style ? '0 0 20px var(--accent-glow)' : 'none'
          }}
        >
          {style}
        </button>
      ))}
    </div>
  );
};

export default StyleSelector;
