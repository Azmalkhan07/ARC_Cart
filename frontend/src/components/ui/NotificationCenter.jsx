import React, { useState } from 'react';
import { Bell, X, ShoppingBag, Tag, Info, AlertTriangle } from 'lucide-react';

const typeConfig = {
  ORDER_UPDATE: { icon: ShoppingBag, color: '#2563EB', bg: '#DBEAFE' },
  PROMO:        { icon: Tag,         color: '#7C3AED', bg: '#E0E7FF' },
  SYSTEM:       { icon: Info,        color: '#0891B2', bg: '#CFFAFE' },
  STOCK:        { icon: AlertTriangle, color: '#D97706', bg: '#FEF3C7' },
};

const mockNotifications = [
  { id: 1, title: 'Order Shipped!', message: 'Your order ARC-₹00041 has been shipped and is on its way.', type: 'ORDER_UPDATE', isRead: false, createdAt: '2 min ago', actionUrl: '/orders' },
  { id: 2, title: 'Flash Sale â€” 40% OFF!', message: 'Use code FESTIVE40 on all Electronics. Ends midnight tonight!', type: 'PROMO', isRead: false, createdAt: '1 hr ago', actionUrl: '/products' },
  { id: 3, title: 'Low Stock Alert', message: 'Your saved item "Wireless Earbuds" is almost out of stock.', type: 'STOCK', isRead: false, createdAt: '3 hrs ago', actionUrl: '/wishlist' },
  { id: 4, title: 'Order Delivered', message: 'Order ARC-₹00039 has been delivered. Leave a review!', type: 'ORDER_UPDATE', isRead: true, createdAt: 'Yesterday', actionUrl: '/orders' },
  { id: 5, title: 'Welcome to ARC CART', message: 'Your account is set up and ready to go. Happy shopping!', type: 'SYSTEM', isRead: true, createdAt: '3 days ago', actionUrl: '/' },
];

const NotificationCenter = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const unread = notifications.filter(n => !n.isRead).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', padding: 'var(--space-2)' }}>
        <Bell size={22} />
        {unread > 0 && (
          <span style={{ position: 'absolute', top: '2px', right: '2px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#DC2626', color: 'white', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* Dropdown Drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 40 }} />

          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '380px',
            backgroundColor: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-lg)',
            zIndex: 50, overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 'var(--text-lg)' }}>Notifications</h3>
                {unread > 0 && <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{unread} unread</p>}
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                {unread > 0 && (
                  <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--color-brand-primary)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>
                    Mark all read
                  </button>
                )}
                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex' }}>
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* List */}
            <div style={{ maxHeight: '420px', overflowY: 'auto' }}>
              {notifications.map(n => {
                const cfg = typeConfig[n.type] || typeConfig.SYSTEM;
                const Icon = cfg.icon;
                return (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    style={{
                      display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4) var(--space-5)',
                      borderBottom: '1px solid var(--color-border-subtle)',
                      backgroundColor: n.isRead ? 'transparent' : cfg.bg + '55',
                      cursor: 'pointer', transition: 'background 0.15s'
                    }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', backgroundColor: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <Icon size={18} color={cfg.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-1)' }}>
                        <p style={{ margin: 0, fontWeight: n.isRead ? 500 : 700, fontSize: 'var(--text-sm)' }}>{n.title}</p>
                        {!n.isRead && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2563EB', flexShrink: 0, marginTop: '4px', marginLeft: 'var(--space-2)' }} />}
                      </div>
                      <p style={{ margin: '0 0 var(--space-1)', color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', lineHeight: '1.4' }}>{n.message}</p>
                      <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{n.createdAt}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div style={{ padding: 'var(--space-3) var(--space-5)', borderTop: '1px solid var(--color-border-subtle)', textAlign: 'center' }}>
              <a href="/notifications" style={{ color: 'var(--color-brand-primary)', fontSize: 'var(--text-sm)', fontWeight: 600, textDecoration: 'none' }}>View all notifications</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
