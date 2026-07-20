import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiSearch, FiSliders, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../../components/ui/ProductCard';
import { SkeletonCard } from '../../components/ui/Skeleton';
import { mockProducts, mockCategories } from '../../utils/mockData';

const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Filter states
  const activeCategory = searchParams.get('category') || '';
  const activeSearch = searchParams.get('search') || '';
  const activeSort = searchParams.get('sort') || 'newest';
  const priceRange = searchParams.get('price') || 'all';

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...mockProducts];

      // Category filter
      if (activeCategory) {
        filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
      }

      // Search filter
      if (activeSearch) {
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
          p.brand.toLowerCase().includes(activeSearch.toLowerCase()) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(activeSearch.toLowerCase())))
        );
      }

      // Price range filter
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          filtered = filtered.filter(p => p.sellingPrice >= min && p.sellingPrice <= max);
        } else {
          filtered = filtered.filter(p => p.sellingPrice >= min);
        }
      }

      // Sorting
      if (activeSort === 'price-low') {
        filtered.sort((a, b) => a.sellingPrice - b.sellingPrice);
      } else if (activeSort === 'price-high') {
        filtered.sort((a, b) => b.sellingPrice - a.sellingPrice);
      } else if (activeSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      } else {
        // Default: newest first (or id desc)
        filtered.sort((a, b) => b.id - a.id);
      }

      setProducts(filtered);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [activeCategory, activeSearch, activeSort, priceRange]);

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'flex-start' }} className="md:grid-cols-[260px_1fr]">
        
        {/* Sidebar Filters */}
        <aside style={{
          background: 'rgba(13,27,53,0.7)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(30,144,255,0.15)', borderRadius: '20px',
          padding: '1.5rem', position: 'sticky', top: '90px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', color: 'white', borderBottom: '1px solid rgba(30,144,255,0.1)', paddingBottom: '0.75rem' }}>
            <FiFilter style={{ color: '#1e90ff' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '800', margin: 0 }}>Filters</h3>
          </div>

          {/* Categories */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Categories</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button
                onClick={() => updateFilter('category', '')}
                style={{
                  textAlign: 'left', background: !activeCategory ? 'rgba(30,144,255,0.15)' : 'transparent',
                  color: !activeCategory ? '#1e90ff' : '#94a3b8', border: 'none', padding: '8px 12px',
                  borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                All Categories
              </button>
              {mockCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => updateFilter('category', cat.name)}
                  style={{
                    textAlign: 'left', background: activeCategory.toLowerCase() === cat.name.toLowerCase() ? 'rgba(30,144,255,0.15)' : 'transparent',
                    color: activeCategory.toLowerCase() === cat.name.toLowerCase() ? '#1e90ff' : '#94a3b8', border: 'none', padding: '8px 12px',
                    borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Price Range</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { label: 'All Prices', value: 'all' },
                { label: 'Under ₹2,000', value: '0-2000' },
                { label: '₹2,000 - ₹10,000', value: '2000-10000' },
                { label: '₹10,000 - ₹50,000', value: '10000-50000' },
                { label: 'Over ₹50,000', value: '50000' },
              ].map(range => (
                <button
                  key={range.value}
                  onClick={() => updateFilter('price', range.value)}
                  style={{
                    textAlign: 'left', background: priceRange === range.value ? 'rgba(30,144,255,0.15)' : 'transparent',
                    color: priceRange === range.value ? '#1e90ff' : '#94a3b8', border: 'none', padding: '8px 12px',
                    borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h4 style={{ color: '#94a3b8', fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Sort By</h4>
            <select
              value={activeSort}
              onChange={e => updateFilter('sort', e.target.value)}
              style={{
                width: '100%', background: 'rgba(6,13,24,0.8)', border: '1.5px solid rgba(30,144,255,0.2)',
                color: '#e2e8f0', padding: '8px 12px', borderRadius: '10px', fontSize: '0.875rem', outline: 'none'
              }}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </aside>

        {/* Products Area */}
        <main>
          {/* Header toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.75rem', fontWeight: '800', color: 'white', margin: 0 }}>
                {activeCategory ? activeCategory : 'All Products'}
              </h1>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
                {loading ? 'Searching...' : `${products.length} premium products found`}
              </p>
            </div>

            {/* View switcher */}
            <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '8px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  background: viewMode === 'grid' ? '#1e90ff' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : '#64748b',
                  border: 'none', width: '32px', height: '32px', borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <FiGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  background: viewMode === 'list' ? '#1e90ff' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#64748b',
                  border: 'none', width: '32px', height: '32px', borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <FiList size={16} />
              </button>
            </div>
          </div>

          {/* Product grid / list */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.5rem' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 1.5rem', background: 'rgba(13,27,53,0.3)', border: '1px dashed rgba(30,144,255,0.2)', borderRadius: '20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.25rem', margin: '0 0 8px 0' }}>No Products Found</h3>
              <p style={{ color: '#64748b', fontSize: '0.9375rem', maxWidth: '360px', margin: '0 auto' }}>
                We couldn't find any products matching your filters. Try clearing some selections or search for something else.
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(240px, 1fr))' : '1fr',
              gap: '1.5rem'
            }}>
              {products.map(p => (
                <ProductCard key={p.id} product={p} className={viewMode === 'list' ? 'flex flex-row' : ''} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default ProductListingPage;
