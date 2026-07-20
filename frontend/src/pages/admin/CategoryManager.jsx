import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', slug: '', isActive: true });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditId(category.id);
      setFormData({ name: category.name, slug: category.slug, isActive: category.isActive });
    } else {
      setEditId(null);
      setFormData({ name: '', slug: '', isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await categoryService.update(editId, formData);
      } else {
        await categoryService.create(formData);
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category", error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.delete(id);
        fetchCategories();
      } catch(error) {
        console.error("Error deleting category", error);
      }
    }
  };

  return (
    <div style={{ padding: 'var(--space-6)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h2 style={{ margin: 0 }}>Category Management</h2>
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
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div style={{ backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--color-bg-subtle)' }}>
            <tr>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-text-muted)' }}>ID</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-text-muted)' }}>Name</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-text-muted)' }}>Slug</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-text-muted)' }}>Status</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-text-muted)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="5" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>Loading...</td></tr> : 
              categories.map(cat => (
              <tr key={cat.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: 'var(--space-4)' }}>{cat.id}</td>
                <td style={{ padding: 'var(--space-4)', fontWeight: '500' }}>{cat.name}</td>
                <td style={{ padding: 'var(--space-4)' }}>{cat.slug}</td>
                <td style={{ padding: 'var(--space-4)' }}>
                  <span style={{
                    padding: '2px 8px', 
                    borderRadius: 'var(--radius-full)', 
                    backgroundColor: cat.isActive ? '#DCFCE7' : '#FEE2E2',
                    color: cat.isActive ? 'var(--color-success)' : 'var(--color-error)',
                    fontSize: 'var(--text-xs)'
                  }}>
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)' }}>
                  <button onClick={() => handleOpenModal(cat)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-error)' }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'var(--color-bg-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', width: '400px' }}>
            <h3 style={{ marginTop: 0 }}>{editId ? 'Edit Category' : 'New Category'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }}
                  required 
                />
              </div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)' }}>Slug</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  style={{ width: '100%', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)' }}
                  required 
                />
              </div>
              <div style={{ marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <input 
                  type="checkbox" 
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                />
                <label>Active</label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-base)', background: 'transparent' }}>Cancel</button>
                <button type="submit" style={{ padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--color-brand-primary)', color: 'white' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManager;
