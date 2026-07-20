import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiChevronRight, FiCheckCircle, FiClock, FiTruck, FiAlertCircle } from 'react-icons/fi';
import { mockOrders } from '../../utils/mockData';
import { formatPrice } from '../../utils/formatters';

const STATUS_ICONS = {
  PENDING: <FiClock />,
  PROCESSING: <FiClock />,
  SHIPPED: <FiTruck />,
  DELIVERED: <FiCheckCircle />,
  CANCELLED: <FiAlertCircle />,
};

const STATUS_BADGES = {
  PENDING: 'badge-arc-gold',
  PROCESSING: 'badge-arc-blue',
  SHIPPED: 'badge-arc-blue',
  DELIVERED: 'badge-arc-green',
  CANCELLED: 'badge-arc-red',
};

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', background: '#060d18' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(30,144,255,0.2)', borderTopColor: '#1e90ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: '800', color: 'white', margin: 0 }}>
          My Orders
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
          Track and view all your past transactions.
        </p>
      </div>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: 'center', padding: '5rem 1.5rem', background: 'rgba(13,27,53,0.3)',
            border: '1px dashed rgba(30,144,255,0.2)', borderRadius: '20px', maxWidth: '480px', margin: '0 auto'
          }}
        >
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(30,144,255,0.08)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: '#1e90ff', fontSize: '24px', margin: '0 auto 1.5rem'
          }}>
            <FiPackage />
          </div>
          <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.25rem', margin: '0 0 8px 0' }}>No Orders Yet</h3>
          <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            You haven't placed any orders yet. Start exploring to purchase your favorite products.
          </p>
          <Link to="/products" style={{
            display: 'inline-block', background: 'linear-gradient(135deg, #1e90ff, #1565c0)',
            color: 'white', fontWeight: '700', padding: '0.875rem 2rem', borderRadius: '12px',
            textDecoration: 'none', fontSize: '0.9375rem', boxShadow: '0 4px 15px rgba(30,144,255,0.3)'
          }}>
            Shop Now
          </Link>
        </motion.div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {orders.map(order => {
            const badgeClass = STATUS_BADGES[order.status] || 'badge-arc-blue';
            const icon = STATUS_ICONS[order.status] || <FiClock />;
            return (
              <div
                key={order.id}
                onClick={() => navigate(`/order/${order.id}`)}
                style={{
                  background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.1)',
                  borderRadius: '20px', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', gap: '1.25rem'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(30,144,255,0.3)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(30,144,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: 'white', fontFamily: 'Outfit, sans-serif' }}>
                      Order #{order.id}
                    </h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8125rem', color: '#64748b' }}>
                      Placed on {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`badge-arc ${badgeClass}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {icon} {order.status}
                    </span>
                    <FiChevronRight style={{ color: '#64748b' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {order.items.map((item, idx) => (
                    <div key={item.id || idx} style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                      <img src={item.images?.[0]?.imageUrl || item.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(30,144,255,0.08)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.8125rem', color: '#64748b' }}>
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)
                  </span>
                  <span style={{ fontWeight: '800', fontSize: '1.125rem', color: 'white' }} className="text-arc-gradient">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
