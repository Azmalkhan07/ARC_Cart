import React, { useState, useEffect } from 'react';
import { Package, TrendingUp, ShoppingBag, DollarSign, Loader, AlertCircle } from 'lucide-react';
import { sellerService, orderService } from '../../services/apiServices';
import { useAuth } from '../../context/AuthContext';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const STATUS_COLORS = {
  PENDING: { bg: '#fef9c3', color: '#a16207' },
  PROCESSING: { bg: '#dbeafe', color: '#1d4ed8' },
  SHIPPED: { bg: '#e0f2fe', color: '#0369a1' },
  DELIVERED: { bg: '#dcfce7', color: '#15803d' },
  CANCELLED: { bg: '#fee2e2', color: '#dc2626' },
};

const SellerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingOrder, setUpdatingOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes] = await Promise.allSettled([
          sellerService.getStats(),
          orderService.getSellerOrders(),
        ]);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
        if (ordersRes.status === 'fulfilled') {
          const data = ordersRes.value.data;
          setOrders(Array.isArray(data) ? data : (data?.content || []));
        }
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingOrder(orderId);
    try {
      await orderService.updateStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
    } catch { setError('Failed to update order status.'); }
    finally { setUpdatingOrder(null); }
  };

  const formatPrice = (p) => p != null ? `₹${Number(p).toLocaleString('en-IN')}` : '—';

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <Loader size={40} style={{ animation: 'spin 1s linear infinite' }} color="#7c3aed" />
    </div>
  );

  const statCards = [
    { label: 'Total Revenue', value: formatPrice(stats?.totalRevenue), icon: DollarSign, color: '#7c3aed' },
    { label: 'Total Orders', value: stats?.totalOrders ?? orders.length, icon: ShoppingBag, color: '#0ea5e9' },
    { label: 'Products Listed', value: stats?.totalProducts ?? '—', icon: Package, color: '#10b981' },
    { label: 'Pending Orders', value: stats?.pendingOrders ?? orders.filter(o => o.orderStatus === 'PENDING').length, icon: TrendingUp, color: '#f59e0b' },
  ];

  return (
    <div style={{ padding: 'var(--space-6)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ margin: 0, fontSize: 'var(--text-2xl)' }}>Seller Dashboard</h1>
        <p style={{ margin: '4px 0 0', color: 'var(--color-text-muted)' }}>Welcome back, {user?.fullName || user?.email}</p>
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

      {/* Revenue Chart (if data available) */}
      {stats?.revenueChart && (
        <div style={{ background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)', marginBottom: 'var(--space-8)' }}>
          <h3 style={{ margin: '0 0 var(--space-4)' }}>Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats.revenueChart}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-base)" />
              <XAxis dataKey="label" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} tickFormatter={v => '₹' + (v / 1000) + 'k'} />
              <Tooltip formatter={v => ['₹' + v.toLocaleString(), 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#revenueGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Orders Table */}
      <div style={{ background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ margin: '0 0 var(--space-4)' }}>Recent Orders</h3>
        {orders.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--space-8)' }}>No orders yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-base)' }}>
                  {['Order #', 'Customer', 'Items', 'Total', 'Status', 'Action'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--color-text-muted)', fontWeight: '600' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const sc = STATUS_COLORS[order.orderStatus] || STATUS_COLORS.PENDING;
                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border-base)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: '600' }}>#{order.orderNumber}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--color-text-muted)' }}>{order.customerName || order.user?.fullName || '—'}</td>
                      <td style={{ padding: '10px 12px' }}>{order.items?.length || 0}</td>
                      <td style={{ padding: '10px 12px', fontWeight: '600' }}>{formatPrice(order.finalAmount)}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ ...sc, padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{order.orderStatus}</span>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        {order.orderStatus === 'PENDING' && (
                          <button
                            disabled={updatingOrder === order.id}
                            onClick={() => handleStatusUpdate(order.id, 'PROCESSING')}
                            style={{ padding: '4px 10px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                          >
                            Confirm
                          </button>
                        )}
                        {order.orderStatus === 'PROCESSING' && (
                          <button
                            disabled={updatingOrder === order.id}
                            onClick={() => handleStatusUpdate(order.id, 'SHIPPED')}
                            style={{ padding: '4px 10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                          >
                            Mark Shipped
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
