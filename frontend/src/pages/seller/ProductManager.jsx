import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Box } from 'lucide-react';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Complex form state for variants
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    basePrice: '',
    sellingPrice: '',
    hasVariants: false,
    variants: []
  });

  const handleOpenModal = () => {
    setFormData({ name: '', sku: '', basePrice: '', sellingPrice: '', hasVariants: false, variants: [] });
    setIsModalOpen(true);
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { sku: '', sellingPrice: '', attributes: { Size: '' } }]
    });
  };

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h2 style={{ margin: 0 }}>Seller Product Catalog</h2>
          <p style={{ color: 'var(--color-text-muted)', margin: 'var(--space-1) 0 0 0' }}>Manage your products and inventory</p>
        </div>
        <button 
          onClick={handleOpenModal}
          style={{
            backgroundColor: 'var(--color-brand-primary)',
            color: 'white',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            cursor: 'pointer'
          }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: 'var(--space-₹0)', textAlign: 'center' }}>
        <Box size={48} color="var(--color-border-strong)" style={{ margin: '0 auto var(--space-4) auto' }} />
        <h3 style={{ margin: '0 0 var(--space-2) 0' }}>No products yet</h3>
        <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>Get started by adding your first product to the catalog.</p>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', width: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: 'var(--space-4)' }}>New Product</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Product Name</label>
                <input type="text" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} placeholder="e.g. Premium Cotton T-Shirt" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Base SKU</label>
                <input type="text" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} placeholder="e.g. TSHIRT-M-WHT" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Base Price (₹)</label>
                <input type="number" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Selling Price (₹)</label>
                <input type="number" style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} />
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', backgroundColor: 'var(--color-bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ margin: 0 }}>Product Variants</h4>
                  <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Does this product come in multiple sizes or colors?</p>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={formData.hasVariants} onChange={(e) => setFormData({...formData, hasVariants: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                  <strong>Enable Variants</strong>
                </label>
              </div>

              {formData.hasVariants && (
                <div style={{ marginTop: 'var(--space-4)' }}>
                  {formData.variants.map((v, i) => (
                    <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                      <input type="text" placeholder="Variant SKU" style={{ flex: 1, padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} />
                      <input type="text" placeholder="Size (e.g. XL)" style={{ flex: 1, padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} />
                      <input type="number" placeholder="Price (₹)" style={{ flex: 1, padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} />
                    </div>
                  ))}
                  <button onClick={addVariant} style={{ marginTop: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)', border: '1px dashed var(--color-brand-primary)', backgroundColor: 'transparent', color: 'var(--color-brand-primary)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                    + Add Option
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--color-brand-primary)', color: 'white', cursor: 'pointer' }}>Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;

