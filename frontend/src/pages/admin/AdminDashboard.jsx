import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingBag, TrendingUp, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { adminService, categoryService } from '../../services/apiServices';
import { useAuth } from '../../context/AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [approving, setApproving] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, sellersRes] = await Promise.allSettled([
          adminService.getStats(),
          adminService.getSellers(),
        ]);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
        if (sellersRes.status === 'fulfilled') {
          const data = sellersRes.value.data;
          setSellers(Array.isArray(data) ? data : (data?.content || []));
        }
      } catch {
        setError('Failed to load admin data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApproveSeller = async (id) => {
    setApproving(id);
    try {
      await adminService.approveSeller(id);
      setSellers(prev => prev.map(s => s.id === id ? { ...s, approved: true } : s));
    } catch { setError('Failed to approve seller.'); }
    finally { setApproving(null); }
  };

  const formatPrice = (p) => p != null ? `₹${Number(p).toLocaleString('en-IN')}` : '—';

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Loader size={40} style={{ animation: 'spin 1s linear infinite' }} color="#7c3aed" />
    </div>
  );

  const statCards = [
    { label: 'Total Revenue', value: formatPrice(stats?.totalRevenue), icon: TrendingUp, color: '#7c3aed' },
    { label: 'Total Users', value: stats?.totalUsers ?? '—', icon: Users, color: '#0ea5e9' },
    { label: 'Total Products', value: stats?.totalProducts ?? '—', icon: Package, color: '#10b981' },
    { label: 'Total Orders', value: stats?.totalOrders ?? '—', icon: ShoppingBag, color: '#f59e0b' },
  ];

  const pendingSellers = sellers.filter(s => !s.approved);

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ margin: 0, fontSize: 'var(--text-2xl)' }}>Admin Dashboard</h1>
        <p style={{ margin: '4px 0 0', color: 'var(--color-text-muted)' }}>Welcome, {user?.fullName || user?.email}</p>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#fee2e2', borderRadius: '8px', marginBottom: 'var(--space-4)', color: '#dc2626' }}>
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-5)', marginBottom: 'var(--space-8)' }}>
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} style={{ background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={22} color={color} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{label}</p>
              <p style={{ margin: '4px 0 0', fontSize: 'var(--text-2xl)', fontWeight: '700' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      {stats?.ordersByMonth && (
        <div style={{ background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)', marginBottom: 'var(--space-8)' }}>
          <h3 style={{ margin: '0 0 var(--space-4)' }}>Orders by Month</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.ordersByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-base)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="orders" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Pending Seller Approvals */}
      <div style={{ background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ margin: '0 0 var(--space-4)' }}>
          Pending Seller Approvals
          {pendingSellers.length > 0 && (
            <span style={{ marginLeft: '8px', background: '#ef4444', color: '#fff', borderRadius: '20px', padding: '2px 8px', fontSize: '12px', fontWeight: '700' }}>{pendingSellers.length}</span>
          )}
        </h3>

        {pendingSellers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--color-text-muted)' }}>
            <CheckCircle size={32} style={{ opacity: 0.4, marginBottom: '8px' }} />
            <p style={{ margin: 0 }}>All sellers are approved.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-base)' }}>
                  {['Store Name', 'Email', 'Phone', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--color-text-muted)', fontWeight: '600' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pendingSellers.map(seller => (
                  <tr key={seller.id} style={{ borderBottom: '1px solid var(--color-border-base)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: '600' }}>{seller.storeName || seller.businessName || '—'}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--color-text-muted)' }}>{seller.email || seller.user?.email || '—'}</td>
                    <td style={{ padding: '10px 12px', color: 'var(--color-text-muted)' }}>{seller.phone || '—'}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: '#fef9c3', color: '#a16207' }}>Pending</span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <button
                        disabled={approving === seller.id}
                        onClick={() => handleApproveSeller(seller.id)}
                        style={{ padding: '6px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                      >
                        {approving === seller.id ? 'Approving...' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
