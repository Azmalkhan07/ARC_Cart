import React, { useState } from 'react';
import { FiBell, FiInfo, FiTag, FiShoppingBag, FiCheckCircle } from 'react-icons/fi';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Order Delivered!',
      body: 'Your order #ARC-2024-001 has been successfully delivered. We hope you love your purchase!',
      type: 'order',
      date: '2 hours ago',
      unread: true,
      icon: <FiCheckCircle style={{ color: '#34d399' }} />
    },
    {
      id: 2,
      title: 'Flash Sale Live Now',
      body: 'Get up to 70% off on smartphones and premium electronics. Offer valid for a limited time only!',
      type: 'promo',
      date: '1 day ago',
      unread: false,
      icon: <FiTag style={{ color: '#fbbf24' }} />
    },
    {
      id: 3,
      title: 'Item Restocked',
      body: 'Good news! An item on your wishlist is back in stock. Shop now before it sells out again.',
      type: 'info',
      date: '3 days ago',
      unread: false,
      icon: <FiInfo style={{ color: '#60a5fa' }} />
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: '800', color: 'white', margin: 0 }}>
            Notifications
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
            Stay updated with your order status and exclusive promotions.
          </p>
        </div>
        {notifications.some(n => n.unread) && (
          <button
            onClick={markAllRead}
            style={{
              background: 'transparent', border: '1.5px solid rgba(30,144,255,0.3)', color: '#1e90ff',
              padding: '8px 16px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(30,144,255,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications.map(n => (
          <div
            key={n.id}
            style={{
              background: n.unread ? 'rgba(30,144,255,0.06)' : 'rgba(13,27,53,0.4)',
              border: `1px solid ${n.unread ? '#1e90ff' : 'rgba(30,144,255,0.1)'}`,
              borderRadius: '16px', padding: '1.25rem', display: 'flex', gap: '1rem',
              transition: 'all 0.2s', position: 'relative'
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0
            }}>
              {n.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: '700', color: 'white' }}>{n.title}</h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{n.date}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '6px 0 0 0', lineHeight: 1.5 }}>
                {n.body}
              </p>
            </div>
            
            {n.unread && (
              <span style={{
                position: 'absolute', top: '16px', right: '16px',
                width: '6px', height: '6px', borderRadius: '50%', background: '#1e90ff'
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
