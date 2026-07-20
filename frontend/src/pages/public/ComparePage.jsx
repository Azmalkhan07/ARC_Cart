import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';

const ComparePage = () => {
  const products = [
    { 
      id: 1, name: 'Samsung 55" QLED 4K TV', price: '₹64,999', brand: 'Samsung', 
      rating: 4.8, type: 'Smart TV', display: '55" QLED 4K', refreshRate: '120Hz', 
      image: 'https://placehold.co/200x200/F8FAFC/475569?text=TV1' 
    },
    { 
      id: 2, name: 'LG 55" OLED 4K TV', price: '₹89,999', brand: 'LG', 
      rating: 4.9, type: 'Smart TV', display: '55" OLED 4K', refreshRate: '120Hz', 
      image: 'https://placehold.co/200x200/F8FAFC/475569?text=TV2' 
    },
    { 
      id: 3, name: 'Sony 55" Bravia 4K', price: '₹72,990', brand: 'Sony', 
      rating: 4.7, type: 'Smart TV', display: '55" LED 4K', refreshRate: '60Hz', 
      image: 'https://placehold.co/200x200/F8FAFC/475569?text=TV3' 
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
      <h1 style={{ fontSize: 'var(--text-3xl)', margin: '0 0 var(--space-8) 0' }}>Compare Products</h1>

      <div style={{ overflowX: 'auto', paddingBottom: 'var(--space-4)' }}>
        <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <thead>
            <tr>
              <th style={{ padding: 'var(--space-4)', borderBottom: '2px solid var(--color-border-subtle)', width: '200px' }}></th>
              {products.map(p => (
                <th key={p.id} style={{ padding: 'var(--space-6)', borderBottom: '2px solid var(--color-border-subtle)', textAlign: 'center', width: '250px' }}>
                  <img src={p.image} alt={p.name} style={{ width: '120px', height: '120px', objectFit: 'cover', marginBottom: 'var(--space-4)' }} />
                  <h3 style={{ margin: '0 0 var(--space-2) 0', fontSize: 'var(--text-lg)' }}>{p.name}</h3>
                  <div style={{ fontSize: 'var(--text-xl)', color: 'var(--color-brand-primary)', marginBottom: 'var(--space-4)' }}>{p.price}</div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center' }}>
                    <button style={{ padding: 'var(--space-2) var(--space-4)', backgroundColor: 'var(--color-brand-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <ShoppingCart size={16} /> Cart
                    </button>
                    <button style={{ padding: 'var(--space-2)', backgroundColor: 'transparent', color: 'var(--color-error)', border: '1px solid var(--color-border-base)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', fontWeight: 'bold', backgroundColor: 'var(--color-bg-subtle)' }}>Brand</td>
              {products.map(p => <td key={p.id} style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>{p.brand}</td>)}
            </tr>
            <tr>
              <td style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', fontWeight: 'bold', backgroundColor: 'var(--color-bg-subtle)' }}>Rating</td>
              {products.map(p => <td key={p.id} style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>â­ {p.rating}</td>)}
            </tr>
            <tr>
              <td style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', fontWeight: 'bold', backgroundColor: 'var(--color-bg-subtle)' }}>Type</td>
              {products.map(p => <td key={p.id} style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>{p.type}</td>)}
            </tr>
            <tr>
              <td style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', fontWeight: 'bold', backgroundColor: 'var(--color-bg-subtle)' }}>Display</td>
              {products.map(p => <td key={p.id} style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>{p.display}</td>)}
            </tr>
            <tr>
              <td style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', fontWeight: 'bold', backgroundColor: 'var(--color-bg-subtle)' }}>Refresh Rate</td>
              {products.map(p => <td key={p.id} style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>{p.refreshRate}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;

