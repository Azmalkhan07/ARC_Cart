import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiDownload, FiChevronLeft, FiMapPin, FiCreditCard, FiXCircle } from 'react-icons/fi';
import { formatPrice } from '../../utils/formatters';

const OrderDetailPage = () => {
  const { id } = useParams();

  // Dummy Detail Data
  const order = {
    orderNumber: id || 'ARC-8439201',
    date: 'Oct 15, 2026',
    status: 'PROCESSING',
    paymentStatus: 'PAID',
    paymentMethod: 'RAZORPAY',
    address: {
      fullName: 'John Doe', phone: '9876543210', 
      streetAddress: '123 Tech Park, Phase 1', landmark: 'Near Metro Station',
      city: 'Bangalore', state: 'Karnataka', pincode: '560001'
    },
    totals: {
      subtotal: 6398.00,
      tax: 1151.64,
      discount: 826.00,
      shipping: 0,
      final: 6723.64
    },
    items: [
      { id: 1, name: 'Sony WH-1000XM5 Wireless Headphones', variant: 'Silver', price: 24990, quantity: 1, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600' }
    ]
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      <Link to="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', marginBottom: '2rem', fontWeight: '600', fontSize: '0.875rem' }}>
        <FiChevronLeft /> Back to Orders
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: '800', color: 'white', margin: 0 }}>Order #{order.orderNumber}</h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>Placed on {order.date}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '8px 16px', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '0.875rem' }}>
            <FiDownload /> Invoice
          </button>
          {order.status === 'PROCESSING' && (
            <button style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '0.875rem' }}>
              <FiXCircle /> Cancel Order
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }} className="md:grid-cols-[1fr_350px]">
        
        {/* Left Side */}
        <div>
          <div style={{ background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.12)', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(30,144,255,0.08)', background: 'rgba(30,144,255,0.05)' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'white', fontWeight: '700' }}>Items ({order.items.length})</h3>
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {order.items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(30,144,255,0.08)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', background: 'rgba(255,255,255,0.03)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <h4 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: '700', color: 'white' }}>{item.name}</h4>
                      <div style={{ fontWeight: '700', color: '#1e90ff' }}>{formatPrice(item.price * item.quantity)}</div>
                    </div>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.8125rem' }}>{item.variant}</p>
                    <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: '0.8125rem' }}>Qty: {item.quantity} · {formatPrice(item.price)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.12)', borderRadius: '20px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'white', fontWeight: '700' }}>Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b' }}>Subtotal</span>
              <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{formatPrice(order.totals.subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
              <span style={{ color: '#34d399' }}>Discount</span>
              <span style={{ color: '#34d399', fontWeight: '600' }}>-{formatPrice(order.totals.discount)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b' }}>Tax (18%)</span>
              <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{formatPrice(order.totals.tax)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b' }}>Shipping</span>
              <span style={{ color: '#34d399', fontWeight: '700' }}>{order.totals.shipping === 0 ? 'FREE' : formatPrice(order.totals.shipping)}</span>
            </div>
            <div className="divider-arc" style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: '700' }}>
              <span style={{ color: 'white' }}>Total</span>
              <span className="text-arc-gradient">{formatPrice(order.totals.final)}</span>
            </div>
          </div>

          <div style={{ background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.12)', borderRadius: '20px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'white', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><FiMapPin /> Shipping Address</h3>
            <p style={{ margin: '0 0 4px 0', fontWeight: '700', color: 'white' }}>{order.address.fullName}</p>
            <p style={{ margin: '0 0 4px 0', color: '#94a3b8', fontSize: '0.875rem' }}>{order.address.streetAddress}, {order.address.landmark}</p>
            <p style={{ margin: '0 0 12px 0', color: '#94a3b8', fontSize: '0.875rem' }}>{order.address.city}, {order.address.state} - {order.address.pincode}</p>
            <p style={{ margin: 0, fontWeight: '600', color: '#e2e8f0', fontSize: '0.875rem' }}>Phone: {order.address.phone}</p>
          </div>

          <div style={{ background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.12)', borderRadius: '20px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'white', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><FiCreditCard /> Payment Details</h3>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#e2e8f0', fontSize: '0.875rem' }}>Method: {order.paymentMethod}</p>
            <p style={{ margin: 0, color: '#34d399', fontWeight: '700', fontSize: '0.875rem' }}>Status: {order.paymentStatus}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderDetailPage;
