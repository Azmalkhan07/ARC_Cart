import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiShoppingCart, FiMinus, FiPlus, FiStar, FiShare2, FiInfo, FiTruck, FiRotateCcw, FiShield } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { mockProducts } from '../../utils/mockData';
import { formatPrice } from '../../utils/formatters';
import ProductCard from '../../components/ui/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'specs' | 'shipping'

  useEffect(() => {
    setLoading(true);
    // Find the product in mock data
    const p = mockProducts.find(prod => prod.id === parseInt(id));
    if (p) {
      setProduct(p);
      setSelectedImage(0);
      setQty(1);
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    toast.success(`${qty}x ${product.name.slice(0, 25)}... added to cart!`);
  };

  const handleWishlist = () => {
    if (!product) return;
    toggleWishlist(product);
    toast.success(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Product link copied to clipboard!');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', background: '#060d18' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(30,144,255,0.2)', borderTopColor: '#1e90ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1.5rem', background: '#060d18', color: '#e2e8f0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛍️</div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', color: 'white', marginBottom: '1rem' }}>Product Not Found</h2>
        <Link to="/products" style={{ color: '#1e90ff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <FiArrowLeft /> Back to Shop
        </Link>
      </div>
    );
  }

  const discount = product.discount || 0;
  const images = product.images || [];
  const mainImage = images[selectedImage]?.imageUrl || product.imageUrl;

  // Get related products (same category, excluding current product)
  const related = mockProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0' }}>
      {/* Breadcrumbs / Back button */}
      <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#64748b', fontSize: '0.875rem', marginBottom: '2rem', transition: 'color 0.2s' }}
        onMouseEnter={e => e.target.style.color = '#1e90ff'}
        onMouseLeave={e => e.target.style.color = '#64748b'}
      >
        <FiArrowLeft /> Back to Shop
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem' }} className="md:grid-cols-[1fr_1.1fr]">
        
        {/* Left Side: Images */}
        <div>
          {/* Main Display */}
          <div style={{
            background: 'rgba(13,27,53,0.7)', border: '1px solid rgba(30,144,255,0.15)',
            borderRadius: '24px', overflow: 'hidden', aspectRatio: '1/1', display: 'flex',
            alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', position: 'relative'
          }}>
            {mainImage ? (
              <img src={mainImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '5rem' }}>🛍️</span>
            )}
            
            {discount > 0 && (
              <span className="badge-arc badge-arc-red" style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '0.8125rem' }}>
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    width: '76px', height: '76px', borderRadius: '12px', overflow: 'hidden',
                    border: `2.5px solid ${selectedImage === idx ? '#1e90ff' : 'rgba(30,144,255,0.15)'}`,
                    background: 'rgba(13,27,53,0.7)', cursor: 'pointer', flexShrink: 0, padding: 0
                  }}
                >
                  <img src={img.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <span style={{ color: '#1e90ff', fontSize: '0.8125rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {product.category}
            </span>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: '900', color: 'white', lineHeight: 1.2, margin: '8px 0 12px 0' }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar key={i} size={14} style={{ fill: i < Math.floor(product.rating) ? '#fbbf24' : 'none', color: i < Math.floor(product.rating) ? '#fbbf24' : '#475569' }} />
                  ))}
                </div>
                <span style={{ color: '#fbbf24', fontWeight: '700', fontSize: '0.9rem' }}>{product.rating}</span>
                <span style={{ color: '#64748b', fontSize: '0.8125rem' }}>({product.reviewCount?.toLocaleString()} reviews)</span>
              </div>
              <span style={{ color: '#64748b' }}>|</span>
              <span style={{ color: '#34d399', fontSize: '0.875rem', fontWeight: '600' }}>✓ In Stock & Ready to Ship</span>
            </div>
          </div>

          <div className="divider-arc" />

          {/* Pricing */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: '900', color: 'white' }} className="text-arc-gradient">
                {formatPrice(product.sellingPrice)}
              </span>
              {product.basePrice && product.basePrice > product.sellingPrice && (
                <span style={{ fontSize: '1.25rem', color: '#475569', textDecoration: 'line-through' }}>
                  {formatPrice(product.basePrice)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <p style={{ color: '#34d399', fontSize: '0.875rem', fontWeight: '600', margin: '4px 0 0 0' }}>
                You save {formatPrice(product.basePrice - product.sellingPrice)} ({discount}%)
              </p>
            )}
          </div>

          {/* Actions panel */}
          <div style={{ background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.1)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              {/* Quantity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: '600' }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(6,13,24,0.8)', border: '1.5px solid rgba(30,144,255,0.2)', borderRadius: '10px', overflow: 'hidden' }}>
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'transparent', border: 'none', color: '#94a3b8', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <FiMinus />
                  </button>
                  <span style={{ width: '40px', textAlign: 'center', fontWeight: '700', color: 'white' }}>{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleWishlist}
                  style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(30,144,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}
                >
                  {isInWishlist(product.id) ? <HiHeart size={20} className="text-red-400" /> : <FiHeart size={20} className="text-slate-300" />}
                </button>
                <button
                  onClick={handleShare}
                  style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(30,144,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#94a3b8'
                  }}
                >
                  <FiShare2 size={20} />
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  background: 'linear-gradient(135deg, #1e90ff, #1565c0)', color: 'white',
                  border: 'none', borderRadius: '12px', padding: '0.875rem', fontWeight: '700',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 15px rgba(30,144,255,0.3)'
                }}
              >
                <FiShoppingCart /> Add to Cart
              </button>
              <Link to="/checkout/address" onClick={() => addToCart(product, qty)} style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    width: '100%', background: '#34d399', color: '#060d18',
                    border: 'none', borderRadius: '12px', padding: '0.875rem', fontWeight: '700',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    boxShadow: '0 4px 15px rgba(52,211,153,0.3)'
                  }}
                >
                  Buy It Now
                </button>
              </Link>
            </div>
          </div>

          {/* Core Info Tabs */}
          <div>
            <div style={{ display: 'flex', borderBottom: '1.5px solid rgba(30,144,255,0.15)', marginBottom: '1rem' }}>
              {[
                { id: 'description', label: 'Description' },
                { id: 'specs', label: 'Specifications' },
                { id: 'shipping', label: 'Shipping & Returns' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: 'transparent', border: 'none', padding: '10px 16px',
                    color: activeTab === tab.id ? '#1e90ff' : '#64748b',
                    borderBottom: activeTab === tab.id ? '2px solid #1e90ff' : 'none',
                    fontWeight: '700', fontSize: '0.875rem', cursor: 'pointer', marginBottom: '-1.5px'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ minHeight: '120px', fontSize: '0.9375rem', color: '#94a3b8', lineHeight: 1.7 }}>
              {activeTab === 'description' && (
                <p style={{ margin: 0 }}>{product.description}</p>
              )}

              {activeTab === 'specs' && product.specifications && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} style={{ borderBottom: '1px solid rgba(30,144,255,0.08)' }}>
                        <td style={{ padding: '8px 0', fontWeight: '600', color: '#e2e8f0', width: '40%' }}>{key}</td>
                        <td style={{ padding: '8px 0', color: '#94a3b8' }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'shipping' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <FiTruck style={{ color: '#1e90ff', marginTop: '4px' }} />
                    <div>
                      <p style={{ margin: 0, fontWeight: '600', color: '#e2e8f0' }}>Free Express Shipping</p>
                      <p style={{ margin: 0, fontSize: '0.8125rem' }}>Delivered in 2-4 business days across India.</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <FiRotateCcw style={{ color: '#1e90ff', marginTop: '4px' }} />
                    <div>
                      <p style={{ margin: 0, fontWeight: '600', color: '#e2e8f0' }}>30-Day Easy Returns</p>
                      <p style={{ margin: 0, fontSize: '0.8125rem' }}>Hassle-free return pickup from your doorstep.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid rgba(30,144,255,0.1)', paddingTop: '4rem' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: 'white', marginBottom: '2.5rem' }}>
            Related Products
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {related.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
