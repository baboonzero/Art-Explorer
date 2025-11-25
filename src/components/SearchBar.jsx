import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, searchQuery }) => {
  const [inputValue, setInputValue] = useState(searchQuery || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      maxWidth: '600px',
      margin: '0 auto 2rem',
      position: 'relative'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '50px',
        padding: '0.75rem 1.5rem',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
      }}>
        <Search size={20} color="var(--accent-color)" style={{ marginRight: '0.75rem', flexShrink: 0 }} />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search for artworks or artists..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--text-secondary)',
              marginLeft: '0.5rem',
              flexShrink: 0
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent-color)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <X size={20} />
          </button>
        )}
      </div>
      <button
        type="submit"
        disabled={!inputValue.trim()}
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '50px',
          border: '1px solid var(--accent-color)',
          background: inputValue.trim() ? 'var(--accent-color)' : 'var(--glass-bg)',
          color: inputValue.trim() ? '#000' : 'var(--text-secondary)',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          opacity: inputValue.trim() ? 1 : 0.5,
          whiteSpace: 'nowrap'
        }}
        onMouseOver={(e) => {
          if (inputValue.trim()) {
            e.currentTarget.style.boxShadow = '0 0 20px var(--accent-glow)';
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
