import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTag, FiCheck, FiX, FiArrowRight, FiShoppingBag, FiMapPin } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

const CheckoutReviewPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal } = useCart();
  const { toast } = useToast();
  
  const address = {
    fullName: 'John Doe', phone: '9876543210', 
    streetAddress: '123 Tech Park, Phase 1', landmark: 'Near Metro Station',
    city: 'Bangalore', state: 'Karnataka', pincode: '560001'
  };

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'SMART5' || code === 'ARCCART') {
      setDiscountPercent(15);
      toast.success('Coupon applied! 15% Off');
    } else {
      toast.error('Invalid coupon code. Try "ARCCART"');
    }
  };

  const removeCoupon = () => {
    setDiscountPercent(0);
    setCouponCode('');
  };

  const calculatedDiscount = Math.round(cartSubtotal * (discountPercent / 100));
  const shipping = cartSubtotal > 2000 ? 0 : 150;
  const finalTotal = cartSubtotal - calculatedDiscount + shipping;

  const handleContinue = () => {
    navigate('/checkout/payment');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      
      {/* Checkout Steps */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(30,144,255,0.1)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1e90ff' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(30,144,255,0.15)', border: '1.5px solid #1e90ff', color: '#1e90ff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}><FiCheck /></div>
          <span style={{ fontSize: '0.8125rem' }}>Address</span>
        </div>
        <div style={{ flex: 1, height: '2px', background: '#1e90ff', margin: '0 1rem' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1e90ff' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1e90ff', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px', boxShadow: '0 0 15px rgba(30,144,255,0.4)' }}>2</div>
          <span style={{ fontSize: '0.8125rem', fontWeight: '700' }}>Review</span>
        </div>
        <div style={{ flex: 1, height: '2px', background: 'rgba(30,144,255,0.1)', margin: '0 1rem' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#64748b' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}>3</div>
          <span style={{ fontSize: '0.8125rem' }}>Payment</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }} className="md:grid-cols-[1fr_360px]">
        
        <div>
          {/* Address Summary */}
          <div style={{ background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.1)', borderRadius: '20px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', margin: 0 }}>Delivery Address</h2>
              <Link to="/checkout/address" style={{ color: '#1e90ff', fontWeight: '600', textDecoration: 'none', fontSize: '0.875rem' }}>Change</Link>
            </div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: 'white' }}>{address.fullName} ({address.phone})</h3>
            <p style={{ margin: 0, color: '#94a3b8', display: 'flex', gap: '8px', fontSize: '0.9375rem' }}>
              <FiMapPin style={{ color: '#1e90ff', flexShrink: 0, marginTop: '3px' }} />
              <span>{address.streetAddress}, {address.landmark ? address.landmark + ', ' : ''}{address.city}, {address.state} - {address.pincode}</span>
            </p>
          </div>

          {/* Cart Items Summary */}
          <div style={{ background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.1)', borderRadius: '20px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', margin: 0 }}>Items in Order</h2>
              <Link to="/cart" style={{ color: '#1e90ff', fontWeight: '600', textDecoration: 'none', fontSize: '0.875rem' }}>Edit Cart</Link>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map(item => (
                <div key={item.cartItemId} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(30,144,255,0.08)' }}>
                  <img src={item.images?.[0]?.imageUrl || item.imageUrl} alt={item.name} style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', background: 'rgba(255,255,255,0.03)' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                      <h3 style={{ margin: 0, fontSize: '0.9375rem', fontWeight: '700', color: 'white' }}>{item.name}</h3>
                      <div style={{ fontWeight: '700', color: '#1e90ff', fontSize: '0.9375rem' }}>{formatPrice((item.sellingPrice || item.price) * item.quantity)}</div>
                    </div>
                    <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.8125rem' }}>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside style={{
          background: 'rgba(13,27,53,0.7)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(30,144,255,0.15)', borderRadius: '24px',
          padding: '1.75rem', height: 'fit-content'
        }}>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: '800', color: 'white', marginBottom: '1.5rem' }}>Order Summary</h3>
          
          {/* Coupon Engine */}
          <div style={{ marginBottom: '1.5rem' }}>
            {discountPercent === 0 ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flex: 1, background: 'rgba(6,13,24,0.8)', border: '1.5px solid rgba(30,144,255,0.2)',
                    borderRadius: '10px', color: '#e2e8f0', padding: '8px 12px', fontSize: '0.875rem', outline: 'none'
                  }}
                />
                <button onClick={applyCoupon} style={{ padding: '8px 16px', background: 'rgba(30,144,255,0.15)', border: '1.5px solid rgba(30,144,255,0.3)', color: '#1e90ff', borderRadius: '10px', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}>Apply</button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(52,211,153,0.08)', border: '1.5px solid rgba(52,211,153,0.3)', borderRadius: '12px' }}>
                <div>
                  <div style={{ color: '#34d399', fontWeight: '700', fontSize: '0.875rem' }}>✓ Coupon Applied</div>
                  <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '2px' }}>Saved {formatPrice(calculatedDiscount)}</div>
                </div>
                <button onClick={removeCoupon} style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: '4px' }}><FiX size={16} /></button>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b' }}>Subtotal</span>
              <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{formatPrice(cartSubtotal)}</span>
            </div>
            
            {discountPercent > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#34d399' }}>Discount</span>
                <span style={{ color: '#34d399', fontWeight: '600' }}>-{formatPrice(calculatedDiscount)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <span style={{ color: '#64748b' }}>Shipping</span>
              <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            
            <div className="divider-arc" style={{ margin: '8px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: '700' }}>
              <span style={{ color: 'white' }}>Total</span>
              <span className="text-arc-gradient">{formatPrice(finalTotal)}</span>
            </div>
          </div>
          
          <button 
            onClick={handleContinue}
            style={{ 
              width: '100%', background: 'linear-gradient(135deg, #1e90ff, #1565c0)', 
              color: 'white', border: 'none', padding: '0.875rem', borderRadius: '12px', 
              fontSize: '0.9375rem', fontWeight: '700', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(30,144,255,0.3)'
            }}>
            Continue to Payment <FiArrowRight />
          </button>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutReviewPage;
