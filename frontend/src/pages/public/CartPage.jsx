import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiShoppingBag, FiTag, FiMinus, FiPlus, FiArrowRight, FiPercent } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatters';

const CartPage = () => {
  const { cartItems, cartCount, cartSubtotal, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'SMART5' || code === 'ARCCART') {
      setDiscountPercent(15);
      toast.success('15% Discount coupon applied!');
    } else {
      toast.error('Invalid coupon code. Try code "ARCCART" or "SMART5"');
    }
  };

  const calculatedDiscount = Math.round(cartSubtotal * (discountPercent / 100));
  const shipping = cartSubtotal > 2000 ? 0 : 150;
  const finalTotal = cartSubtotal - calculatedDiscount + shipping;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.25rem', fontWeight: '900', color: 'white', margin: 0 }}>
          Shopping Cart
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
          Review your items and proceed to checkout.
        </p>
      </div>

      {cartItems.length === 0 ? (
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
            <FiShoppingBag />
          </div>
          <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.25rem', margin: '0 0 8px 0' }}>Your Cart is Empty</h3>
          <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products" style={{
            display: 'inline-block', background: 'linear-gradient(135deg, #1e90ff, #1565c0)',
            color: 'white', fontWeight: '700', padding: '0.875rem 2rem', borderRadius: '12px',
            textDecoration: 'none', fontSize: '0.9375rem', boxShadow: '0 4px 15px rgba(30,144,255,0.3)'
          }}>
            Continue Shopping
          </Link>
        </motion.div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }} className="md:grid-cols-[1fr_360px]">
          
          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <AnimatePresence>
              {cartItems.map(item => (
                <motion.div
                  key={item.cartItemId}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  style={{
                    background: 'rgba(13,27,53,0.6)', border: '1px solid rgba(30,144,255,0.12)',
                    borderRadius: '20px', padding: '1.25rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap'
                  }}
                >
                  {/* Image */}
                  <div style={{ width: '96px', height: '96px', borderRadius: '12px', overflow: 'hidden', background: 'rgba(255,255,255,0.03)', flexShrink: 0 }}>
                    <img src={item.images?.[0]?.imageUrl || item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <span style={{ color: '#1e90ff', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                    <h3 style={{ color: 'white', fontSize: '0.9375rem', fontWeight: '700', margin: '4px 0 8px 0', lineClamp: 2 }}>
                      {item.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ color: '#e2e8f0', fontWeight: '700' }}>
                        {formatPrice(item.sellingPrice || item.price)}
                      </span>
                      {item.basePrice > (item.sellingPrice || item.price) && (
                        <span style={{ color: '#475569', fontSize: '0.75rem', textDecoration: 'line-through' }}>
                          {formatPrice(item.basePrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', gap: '12px' }}>
                    <button
                      onClick={() => { removeFromCart(item.cartItemId); toast.success('Item removed from cart'); }}
                      style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', padding: '4px' }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                    
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(6,13,24,0.8)', border: '1.5px solid rgba(30,144,255,0.2)', borderRadius: '10px', overflow: 'hidden' }}>
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <FiMinus size={12} />
                      </button>
                      <span style={{ width: '30px', textAlign: 'center', fontWeight: '700', color: 'white', fontSize: '0.875rem' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout Summary panel */}
          <aside style={{
            background: 'rgba(13,27,53,0.7)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(30,144,255,0.15)', borderRadius: '24px',
            padding: '1.75rem', height: 'fit-content'
          }}>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: '800', color: 'white', marginBottom: '1.5rem' }}>
              Order Summary
            </h3>

            {/* Coupon field */}
            <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <FiTag style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                <input
                  type="text"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  placeholder="Coupon Code"
                  style={{
                    width: '100%', background: 'rgba(6,13,24,0.8)', border: '1.5px solid rgba(30,144,255,0.2)',
                    borderRadius: '10px', color: '#e2e8f0', padding: '8px 8px 8px 32px', fontSize: '0.875rem', outline: 'none'
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'rgba(30,144,255,0.15)', border: '1.5px solid rgba(30,144,255,0.3)',
                  color: '#1e90ff', borderRadius: '10px', padding: '8px 16px', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer'
                }}
              >
                Apply
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b' }}>Subtotal</span>
                <span style={{ color: '#e2e8f0', fontWeight: '600' }}>{formatPrice(cartSubtotal)}</span>
              </div>
              
              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#34d399' }}>Discount ({discountPercent}%)</span>
                  <span style={{ color: '#34d399', fontWeight: '600' }}>-{formatPrice(calculatedDiscount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: '#64748b' }}>Shipping</span>
                <span style={{ color: '#e2e8f0', fontWeight: '600' }}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              
              <div className="divider-arc" style={{ margin: '8px 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: '700' }}>
                <span style={{ color: 'white' }}>Total</span>
                <span className="text-arc-gradient">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Link to="/checkout/address" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  width: '100%', background: 'linear-gradient(135deg, #1e90ff, #1565c0)', color: 'white',
                  border: 'none', borderRadius: '12px', padding: '0.875rem', fontWeight: '700', fontSize: '0.9375rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 15px rgba(30,144,255,0.3)'
                }}
              >
                Proceed to Checkout <FiArrowRight />
              </button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
