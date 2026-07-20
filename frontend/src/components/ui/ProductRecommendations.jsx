import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Zap } from 'lucide-react';

const ProductCard = ({ product }) => (
  <Link to={/product/ + product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
    <div style={{
      backgroundColor: 'var(--color-bg-surface)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--color-border-subtle)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      <div style={{ height: 180, overflow: 'hidden', backgroundColor: 'var(--color-bg-subtle)' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: 'var(--space-3)' }}>
        <p style={{ margin: '0 0 var(--space-1)', fontSize: 'var(--text-sm)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
          <Star size={12} color="#F59E0B" fill="#F59E0B" />
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{product.rating}</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>({product.reviews})</span>
        </div>
        <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--color-brand-primary)' }}>{product.price}</p>
      </div>
    </div>
  </Link>
);

const ProductRecommendations = ({ title, icon: Icon, products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section style={{ marginTop: 'var(--space-₹2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
        {Icon && <Icon size={22} color="var(--color-brand-primary)" />}
        <h2 style={{ margin: 0, fontSize: 'var(--text-2xl)' }}>{title}</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-4)' }}>
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
};

export default ProductRecommendations;
