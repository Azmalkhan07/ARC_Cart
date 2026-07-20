import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Download, ChevronDown, ChevronUp } from 'lucide-react';

const statusColor = {
  PENDING:    { bg: '#FEF3C7', text: '#92400E' },
  PROCESSING: { bg: '#DBEAFE', text: '#1E40AF' },
  SHIPPED:    { bg: '#E0E7FF', text: '#3730A3' },
  DELIVERED:  { bg: '#D1FAE5', text: '#065F46' },
  CANCELLED:  { bg: '#FEE2E2', text: '#991B1B' },
};

const orders = [
  {
    orderNumber: 'ARC-₹00001',
    date: '19 Jul 2026',
    status: 'DELIVERED',
    paymentStatus: 'PAID',
    items: [
      { name: 'Premium Cotton Comfort T-Shirt', qty: 2, price: '₹1,798', image: 'https://placehold.co/80x80/F8FAFC/475569?text=T-Shirt' },
      { name: 'Smart Fitness Watch', qty: 1, price: '₹5,499', image: 'https://placehold.co/80x80/F8FAFC/475569?text=Watch' },
    ],
    total: '₹7,297',
  },
  {
    orderNumber: 'ARC-₹00002',
    date: '15 Jul 2026',
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    items: [
      { name: 'Noise Cancelling Earbuds', qty: 1, price: '₹3,499', image: 'https://placehold.co/80x80/F8FAFC/475569?text=Earbuds' },
    ],
    total: '₹3,499',
  },
  {
    orderNumber: 'ARC-₹00003',
    date: '10 Jul 2026',
    status: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    items: [
      { name: 'Ceramic Coffee Mug', qty: 3, price: '₹1,497', image: 'https://placehold.co/80x80/F8FAFC/475569?text=Mug' },
    ],
    total: '₹1,497',
  },
];

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const colors = statusColor[order.status] || statusColor.PENDING;

  return (
    <div style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <span style={{ fontWeight: 'bold', fontSize: 'var(--text-lg)' }}>{order.orderNumber}</span>
          <span style={{ marginLeft: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Placed on {order.date}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', backgroundColor: colors.bg, color: colors.text, fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>{order.status}</span>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', background: 'none', border: 'none', color: 'var(--color-brand-primary)', cursor: 'pointer', fontWeight: '500', fontSize: 'var(--text-sm)' }}>
            <Download size={14} /> Invoice
          </button>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Summary (always visible) */}
      <div style={{ padding: 'var(--space-4) var(--space-6)', display: 'flex', gap: 'var(--space-3)', overflowX: 'auto' }}>
        {order.items.slice(0, 3).map((item, idx) => (
          <img key={idx} src={item.image} alt={item.name} title={item.name} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--color-border-subtle)' }} />
        ))}
        {order.items.length > 3 && (
          <div style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', fontWeight: 'bold' }}>+{order.items.length - 3}</div>
        )}
        <div style={{ marginLeft: 'auto', textAlign: 'right', flexShrink: 0 }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>{order.items.length} item{order.items.length > 1 ? 's' : ''}</div>
          <div style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold' }}>{order.total}</div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--color-border-subtle)', padding: 'var(--space-4) var(--space-6)' }}>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', paddingBottom: 'var(--space-3)', marginBottom: 'var(--space-3)', borderBottom: idx < order.items.length - 1 ? '1px solid var(--color-border-subtle)' : 'none' }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', marginBottom: 'var(--space-1)' }}>{item.name}</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Qty: {item.qty}</div>
              </div>
              <div style={{ fontWeight: 'bold' }}>{item.price}</div>
            </div>
          ))}
          {order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
              <button style={{ padding: 'var(--space-2) var(--space-4)', backgroundColor: 'transparent', color: 'var(--color-error)', border: '1px solid var(--color-error)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: '500' }}>Cancel Order</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const OrdersPage = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
        <Package size={28} color="var(--color-brand-primary)" />
        <h1 style={{ fontSize: 'var(--text-3xl)', margin: 0 }}>My Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--space-₹2)', backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)' }}>
          <Package size={48} color="var(--color-border-strong)" style={{ marginBottom: 'var(--space-4)' }} />
          <h3>No orders yet</h3>
          <Link to="/products" style={{ display: 'inline-block', backgroundColor: 'var(--color-brand-primary)', color: 'white', padding: 'var(--space-3) var(--space-6)', borderRadius: 'var(--radius-md)', textDecoration: 'none' }}>Start Shopping</Link>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <OrderCard key={order.orderNumber} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

