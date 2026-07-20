import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import api from '../../services/api';

const BannerManager = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', imageUrl: '', targetUrl: '', sortOrder: 0, isActive: true });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      // Mocking for now since backend is not running
      // const response = await api.get('/banners');
      // setBanners(response.data.data);
      setBanners([
        { id: 1, title: 'Summer Sale', imageUrl: 'https://placehold.co/1200x400/2563EB/FFFFFF?text=Summer+Sale', targetUrl: '/category/summer', sortOrder: 1, isActive: true }
      ]);
    } catch (error) {
      console.error("Error fetching banners", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditId(banner.id);
      setFormData({ title: banner.title, imageUrl: banner.imageUrl, targetUrl: banner.targetUrl, sortOrder: banner.sortOrder, isActive: banner.isActive });
    } else {
      setEditId(null);
      setFormData({ title: '', imageUrl: '', targetUrl: '', sortOrder: 0, isActive: true });
    }
    setIsModalOpen(true);
  };

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h2 style={{ margin: 0 }}>Banner Management</h2>
        <button 
          onClick={() => handleOpenModal()}
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
          <Plus size={16} /> Add Banner
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
        {banners.map(banner => (
          <div key={banner.id} style={{ backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
            <div style={{ height: '150px', backgroundColor: 'var(--color-bg-subtle)', position: 'relative' }}>
              <img src={banner.imageUrl} alt={banner.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: 'var(--space-2)' }}>
                 <span style={{
                    padding: '2px 8px', 
                    borderRadius: 'var(--radius-full)', 
                    backgroundColor: banner.isActive ? '#DCFCE7' : '#FEE2E2',
                    color: banner.isActive ? 'var(--color-success)' : 'var(--color-error)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'bold'
                  }}>
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </span>
              </div>
            </div>
            <div style={{ padding: 'var(--space-4)' }}>
              <h3 style={{ margin: '0 0 var(--space-2) 0' }}>{banner.title}</h3>
              <p style={{ margin: '0 0 var(--space-4) 0', color: 'var(--color-brand-primary)', fontSize: 'var(--text-sm)' }}>Target: {banner.targetUrl || 'None'}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: 'var(--space-4)' }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Sort Order: {banner.sortOrder}</span>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <button onClick={() => handleOpenModal(banner)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}><Edit2 size={16} /></button>
                  <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-error)' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', width: '500px' }}>
            <h3 style={{ marginTop: 0 }}>{editId ? 'Edit Banner' : 'New Banner'}</h3>
            <form>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} required />
              </div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Image URL (1200x400 recommended)</label>
                <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} required />
              </div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Target URL (e.g., /category/electronics)</label>
                <input type="text" value={formData.targetUrl} onChange={(e) => setFormData({...formData, targetUrl: e.target.value})} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Sort Order</label>
                  <input type="number" value={formData.sortOrder} onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value)})} style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 'var(--space-4)' }}>
                  <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} style={{ marginRight: 'var(--space-2)' }} />
                  <label>Visible on Storefront</label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--color-brand-primary)', color: 'white', cursor: 'pointer' }}>Save Banner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManager;
