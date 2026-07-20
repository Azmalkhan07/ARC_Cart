import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatters';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    toast.success('Item moved to cart!');
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: '800', color: 'white', margin: 0 }}>
            My Wishlist
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
            You have {wishlistItems.length} items saved in your wishlist.
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <button
            onClick={clearWishlist}
            style={{
              background: 'transparent', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171',
              padding: '8px 16px', borderRadius: '10px', fontSize: '0.875rem', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlistItems.length === 0 ? (
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
            <FiHeart />
          </div>
          <h3 style={{ color: 'white', fontWeight: '700', fontSize: '1.25rem', margin: '0 0 8px 0' }}>Your Wishlist is Empty</h3>
          <p style={{ color: '#64748b', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Tap the heart icon on any product card to save items you love here.
          </p>
          <Link to="/products" style={{
            display: 'inline-block', background: 'linear-gradient(135deg, #1e90ff, #1565c0)',
            color: 'white', fontWeight: '700', padding: '0.875rem 2rem', borderRadius: '12px',
            textDecoration: 'none', fontSize: '0.9375rem', boxShadow: '0 4px 15px rgba(30,144,255,0.3)'
          }}>
            Browse Products
          </Link>
        </motion.div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.5rem' }}>
          <AnimatePresence>
            {wishlistItems.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: 'linear-gradient(145deg, #0d1b35 0%, #0a1628 100%)',
                  border: '1px solid rgba(30,144,255,0.1)', borderRadius: '16px',
                  overflow: 'hidden', display: 'flex', flexDirection: 'column'
                }}
              >
                <Link to={`/product/${product.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ height: '200px', background: 'rgba(255,255,255,0.03)', position: 'relative' }}>
                    <img src={product.images?.[0]?.imageUrl || product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <span style={{ color: '#1e90ff', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>{product.category}</span>
                    <h3 style={{ color: '#e2e8f0', fontSize: '0.875rem', fontWeight: '600', margin: '4px 0 8px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {product.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ color: 'white', fontWeight: '700', fontSize: '1.125rem' }}>{formatPrice(product.sellingPrice)}</span>
                      {product.basePrice > product.sellingPrice && (
                        <span style={{ color: '#475569', fontSize: '0.8125rem', textDecoration: 'line-through' }}>{formatPrice(product.basePrice)}</span>
                      )}
                    </div>
                  </div>
                </Link>
                
                <div style={{ display: 'flex', gap: '8px', padding: '1rem', borderTop: '1px solid rgba(30,144,255,0.08)', marginTop: 'auto' }}>
                  <button
                    onClick={() => handleMoveToCart(product)}
                    style={{
                      flex: 1, background: 'linear-gradient(135deg, #1e90ff, #1565c0)', color: 'white',
                      border: 'none', borderRadius: '8px', padding: '8px', fontSize: '0.8125rem',
                      fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                  >
                    <FiShoppingCart size={13} /> Add to Cart
                  </button>
                  <button
                    onClick={() => { removeFromWishlist(product.id); toast.success('Removed from wishlist'); }}
                    style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(239,68,68,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f87171', cursor: 'pointer'
                    }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
