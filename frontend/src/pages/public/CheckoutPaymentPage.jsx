import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheck, FiShield, FiLock, FiCreditCard, FiArrowRight, FiSmile } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import { useToast } from '../../context/ToastContext';

const CheckoutPaymentPage = () => {
  const navigate = useNavigate();
  const { cartSubtotal, clearCart } = useCart();
  const { toast } = useToast();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Apply discount / shipping mock calculation matching previous screen
  const shipping = cartSubtotal > 2000 ? 0 : 150;
  const finalTotal = cartSubtotal + shipping;

  const handlePayment = (method) => {
    setIsProcessing(true);
    toast.info(`Initiating payment via ${method}...`);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setOrderId('ARC-' + Math.floor(100000 + Math.random() * 900000));
      clearCart();
      toast.success('Order placed successfully!');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '2.5rem', background: 'rgba(13,27,53,0.6)', border: '1px solid rgba(30,144,255,0.15)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(52,211,153,0.15)', border: '2.5px solid rgba(52,211,153,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#34d399', fontSize: '32px' }}>
          <FiCheck />
        </div>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.25rem', fontWeight: '800', color: 'white', marginBottom: '8px' }}>Payment Successful!</h1>
        <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '1.5rem' }}>Your order has been placed successfully and is being processed.</p>
        
        <div style={{ background: 'rgba(6,13,24,0.5)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(30,144,255,0.1)', display: 'inline-block', margin: '0 auto 2rem', textAlign: 'center' }}>
          <span style={{ color: '#64748b', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ORDER REFERENCE</span>
          <p style={{ color: '#1e90ff', fontSize: '1.25rem', fontWeight: '800', margin: '4px 0 0 0', fontFamily: 'Outfit, sans-serif' }}>{orderId}</p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <Link to="/products" style={{
            textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', fontWeight: '600', fontSize: '0.875rem'
          }}>
            Continue Shopping
          </Link>
          <Link to="/orders" style={{
            textDecoration: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px',
            background: 'linear-gradient(135deg, #1e90ff, #1565c0)', color: 'white', fontWeight: '600', fontSize: '0.875rem'
          }}>
            View Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      
      {/* Checkout Steps */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(30,144,255,0.1)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1e90ff' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(30,144,255,0.15)', border: '1.5px solid #1e90ff', color: '#1e90ff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}><FiCheck /></div>
          <span style={{ fontSize: '0.8125rem' }}>Address</span>
        </div>
        <div style={{ flex: 1, height: '2px', background: '#1e90ff', margin: '0 1rem' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1e90ff' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(30,144,255,0.15)', border: '1.5px solid #1e90ff', color: '#1e90ff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px' }}><FiCheck /></div>
          <span style={{ fontSize: '0.8125rem' }}>Review</span>
        </div>
        <div style={{ flex: 1, height: '2px', background: '#1e90ff', margin: '0 1rem' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1e90ff' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1e90ff', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', marginBottom: '8px', boxShadow: '0 0 15px rgba(30,144,255,0.4)' }}>3</div>
          <span style={{ fontSize: '0.8125rem', fontWeight: '700' }}>Payment</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        <div style={{ background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.12)', borderRadius: '24px', padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#94a3b8', fontWeight: '600', margin: '0 0 8px 0' }}>Total Amount to Pay</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white', marginBottom: '2.5rem' }} className="text-arc-gradient">
            {formatPrice(finalTotal)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
            <button 
              onClick={() => handlePayment('Razorpay')}
              disabled={isProcessing}
              style={{ 
                width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #1e90ff, #00b4ff)', color: 'white', border: 'none', 
                borderRadius: '12px', fontSize: '1rem', fontWeight: '700', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', 
                cursor: isProcessing ? 'not-allowed' : 'pointer', transition: 'all 0.2s', opacity: isProcessing ? 0.7 : 1,
                boxShadow: '0 4px 20px rgba(30,144,255,0.3)'
              }}>
              {isProcessing ? 'Processing Payment...' : (
                <><FiCreditCard size={18} /> Pay with Razorpay / Card</>
              )}
            </button>

            <button 
              onClick={() => handlePayment('Cash on Delivery')}
              disabled={isProcessing}
              style={{ 
                width: '100%', padding: '1rem', background: 'transparent', color: '#e2e8f0', 
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', fontSize: '0.9375rem', fontWeight: '700', 
                cursor: 'pointer', transition: 'all 0.2s' 
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Cash on Delivery (COD)
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2.5rem', borderTop: '1px solid rgba(30,144,255,0.08)', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.8125rem' }}>
              <FiLock size={14} style={{ color: '#1e90ff' }} /> 100% Secure Encrypted Payment Gateway
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.8125rem' }}>
              <FiShield size={14} style={{ color: '#1e90ff' }} /> Buyer protection guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentPage;
