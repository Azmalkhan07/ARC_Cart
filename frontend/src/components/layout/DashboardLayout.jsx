import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg-base)' }}>
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: 'var(--color-bg-surface)', borderRight: '1px solid var(--color-border-subtle)', padding: 'var(--space-6)' }}>
        <h1 style={{ color: 'var(--color-brand-primary)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-8)' }}>ARC CART</h1>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: 'var(--space-6)' }}>
                <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>Admin</span>
            </li>
            <li style={{ marginBottom: 'var(--space-4)' }}>
              <Link to="/admin/dashboard" style={{ color: 'var(--color-text-base)', fontWeight: '500', textDecoration: 'none' }}>Dashboard</Link>
            </li>
            <li style={{ marginBottom: 'var(--space-4)' }}>
              <Link to="/admin/categories" style={{ color: 'var(--color-text-base)', fontWeight: '500', textDecoration: 'none' }}>Categories</Link>
            </li>
            <li style={{ marginBottom: 'var(--space-4)' }}>
              <Link to="/admin/brands" style={{ color: 'var(--color-text-base)', fontWeight: '500', textDecoration: 'none' }}>Brands</Link>
            </li>
            <li style={{ marginBottom: 'var(--space-4)' }}>
              <Link to="/admin/banners" style={{ color: 'var(--color-text-base)', fontWeight: '500', textDecoration: 'none' }}>Banners</Link>
            </li>
            
            <li style={{ marginBottom: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
                <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 'bold' }}>Seller</span>
            </li>
            <li style={{ marginBottom: 'var(--space-4)' }}>
              <Link to="/seller/dashboard" style={{ color: 'var(--color-text-base)', fontWeight: '500', textDecoration: 'none' }}>Dashboard</Link>
            </li>
            <li style={{ marginBottom: 'var(--space-4)' }}>
              <Link to="/seller/products" style={{ color: 'var(--color-brand-primary)', fontWeight: '600', textDecoration: 'none' }}>My Products</Link>
            </li>
          </ul>
        </nav>
        <div style={{ position: 'absolute', bottom: 'var(--space-6)' }}>
            <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                &larr; Back to Store
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 'var(--space-6)', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
