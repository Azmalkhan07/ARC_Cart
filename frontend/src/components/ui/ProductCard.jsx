import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { HiHeart } from 'react-icons/hi';
import { formatPrice } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

const ProductCard = ({ product, className = '' }) => {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const mainImage = product.images?.[0]?.imageUrl || product.imageUrl;
  const hoverImage = product.images?.[1]?.imageUrl;
  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);
  const discount = product.discount || 0;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    addToCart(product, 1);
    toast.success(`${product.name.slice(0, 30)}... added to cart!`);
    setTimeout(() => setIsAddingToCart(false), 600);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        size={11}
        className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}
        style={{ fill: i < Math.floor(rating) ? '#fbbf24' : 'none' }}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`group relative card-arc overflow-hidden ${className}`}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50" style={{ aspectRatio: '1/1' }}>
          {/* Skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 skeleton-arc" />
          )}

          {/* Main Image */}
          {mainImage && (
            <img
              src={mainImage}
              alt={product.name}
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-108 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: 'scale(1)', transition: 'transform 0.5s ease, opacity 0.3s' }}
              onMouseEnter={e => { if (hoverImage) e.target.src = hoverImage; }}
              onMouseLeave={e => { if (hoverImage) e.target.src = mainImage; }}
            />
          )}

          {!mainImage && (
            <div className="w-full h-full flex items-center justify-center text-5xl">
              🛍️
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="badge-arc badge-arc-blue text-[10px] uppercase tracking-wider">New</span>
            )}
            {discount > 0 && (
              <span className="badge-arc badge-arc-red text-[10px] font-bold">-{discount}%</span>
            )}
            {product.isFlashSale && (
              <span className="badge-arc badge-arc-gold text-[10px] uppercase">⚡ Sale</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {/* Wishlist */}
            <motion.button
              onClick={handleWishlist}
              whileTap={{ scale: 0.85 }}
              className="w-8 h-8 rounded-full glass flex items-center justify-center transition-all duration-200 hover:border-red-400/50"
              title="Add to Wishlist"
            >
              <AnimatePresence mode="wait">
                {inWishlist ? (
                  <motion.span key="filled" initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                    <HiHeart size={15} className="text-red-400" />
                  </motion.span>
                ) : (
                  <motion.span key="empty" initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
                    <FiHeart size={14} className="text-slate-300" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Quick View */}
            <Link
              to={`/product/${product.id}`}
              onClick={e => e.stopPropagation()}
              className="w-8 h-8 rounded-full glass flex items-center justify-center transition-all duration-200 hover:border-blue-400/50"
              title="Quick View"
            >
              <FiEye size={14} className="text-slate-300" />
            </Link>
          </div>

          {/* Add to Cart overlay on hover */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                inCart
                  ? 'bg-emerald-500/90 text-white'
                  : 'bg-arc-blue-400/90 text-white hover:bg-arc-blue-400'
              }`}
              style={{ background: inCart ? 'rgba(16,185,129,0.9)' : 'rgba(30,144,255,0.9)', backdropFilter: 'blur(10px)' }}
            >
              <AnimatePresence mode="wait">
                {isAddingToCart ? (
                  <motion.span key="adding" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xs">
                    ✓ Added!
                  </motion.span>
                ) : (
                  <motion.span key="add" className="flex items-center gap-2">
                    <FiShoppingCart size={14} />
                    {inCart ? 'In Cart' : 'Add to Cart'}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-blue-400/70 font-medium uppercase tracking-wider mb-1">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="text-sm font-semibold text-slate-200 leading-snug mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating)}
              </div>
              <span className="text-xs font-semibold text-amber-400">{product.rating}</span>
              <span className="text-xs text-slate-500">
                ({product.reviewCount?.toLocaleString()})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-arc-gradient">
                {formatPrice(product.sellingPrice || product.price)}
              </span>
              {product.basePrice && product.basePrice > (product.sellingPrice || product.price) && (
                <span className="text-xs text-slate-500 line-through">
                  {formatPrice(product.basePrice)}
                </span>
              )}
            </div>
            {discount > 0 && (
              <span className="text-xs font-bold text-emerald-400">{discount}% off</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
