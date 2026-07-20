import React, { useState, useRef, useEffect } from 'react';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock autocomplete suggestions
const suggestions = [
  { type: 'product', label: 'Premium Wireless Headphones', id: 1 },
  { type: 'product', label: 'Smart Fitness Watch', id: 3 },
  { type: 'product', label: 'Noise Cancelling Earbuds', id: 5 },
  { type: 'category', label: 'Electronics' },
  { type: 'category', label: 'Fashion' },
  { type: 'category', label: 'Home & Kitchen' },
  { type: 'product', label: 'Ceramic Coffee Mug', id: 4 },
  { type: 'product', label: 'Leather Wallet', id: 6 },
  { type: 'product', label: 'Bluetooth Speaker', id: 7 },
  { type: 'product', label: 'Stainless Steel Bottle', id: 8 },
];

const trending = ['Headphones', 'Smart Watch', 'Summer T-Shirts', 'Coffee Mugs'];

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 200);

  const filtered = debouncedQuery.length >= 2
    ? suggestions.filter(s => s.label.toLowerCase().includes(debouncedQuery.toLowerCase())).slice(0, 6)
    : [];

  const showDropdown = focused && (filtered.length > 0 || query.length === 0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    if (item.type === 'product') {
      navigate('/product/' + item.id);
    } else {
      navigate('/products?category=' + item.label.toLowerCase());
    }
    setQuery('');
    setFocused(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate('/products?q=' + encodeURIComponent(query.trim()));
      setFocused(false);
    }
  };

  return (
    <div ref={containerRef} style={{ flex: 1, maxWidth: '440px', margin: '0 var(--space-8)', position: 'relative' }}>
      {/* Input */}
      <div style={{ position: 'relative' }}>
        <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleSearch}
          placeholder="Search products, brands, categories..."
          style={{
            width: '100%',
            padding: 'var(--space-3) var(--space-4)',
            paddingLeft: '40px',
            paddingRight: query ? '36px' : 'var(--space-4)',
            borderRadius: 'var(--radius-full)',
            border: focused ? '1.5px solid var(--color-brand-primary)' : '1px solid var(--color-border-base)',
            backgroundColor: 'var(--color-bg-subtle)',
            color: 'var(--color-text-base)',
            fontSize: 'var(--text-sm)',
            outline: 'none',
            transition: 'border-color var(--transition-fast)',
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex' }}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
          backgroundColor: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 60,
          overflow: 'hidden',
        }}>
          {filtered.length > 0 ? (
            <>
              <div style={{ padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', borderBottom: '1px solid var(--color-border-subtle)' }}>
                Suggestions
              </div>
              {filtered.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(item)}
                  style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', cursor: 'pointer', transition: 'background var(--transition-fast)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <Search size={14} color="var(--color-text-muted)" />
                  <span style={{ flex: 1, fontSize: 'var(--text-sm)' }}>{item.label}</span>
                  <span style={{
                    fontSize: 'var(--text-xs)', padding: '2px 8px', borderRadius: 'var(--radius-full)',
                    backgroundColor: item.type === 'category' ? 'var(--color-brand-primary-subtle)' : 'var(--color-bg-subtle)',
                    color: item.type === 'category' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
                    fontWeight: 600
                  }}>{item.type}</span>
                </div>
              ))}
            </>
          ) : (
            <>
              <div style={{ padding: 'var(--space-3) var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <TrendingUp size={12} /> Trending Searches
              </div>
              {trending.map((t, idx) => (
                <div
                  key={idx}
                  onClick={() => { setQuery(t); navigate('/products?q=' + encodeURIComponent(t)); setFocused(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', cursor: 'pointer', transition: 'background var(--transition-fast)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-bg-subtle)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <TrendingUp size={14} color="#F59E0B" />
                  <span style={{ flex: 1, fontSize: 'var(--text-sm)' }}>{t}</span>
                  <ArrowRight size={14} color="var(--color-text-muted)" />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
