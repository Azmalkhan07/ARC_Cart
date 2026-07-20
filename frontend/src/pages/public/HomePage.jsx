import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShoppingCart, FiZap, FiTrendingUp, FiPackage, FiStar, FiChevronLeft, FiChevronRight, FiMail } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import ProductCard from '../../components/ui/ProductCard';
import { SkeletonCard } from '../../components/ui/Skeleton';
import {
  mockCategories, mockProducts, mockReviews, mockBrands,
  featuredProducts, trendingProducts, flashSaleProducts, newArrivals,
  FLASH_SALE_END,
} from '../../utils/mockData';
import { formatPrice } from '../../utils/formatters';

// ─── Flash Sale Countdown ───────────────────────────────────────────────────
const CountdownTimer = ({ endTime }) => {
  const getTimeLeft = () => {
    const now = Date.now();
    const diff = Math.max(0, endTime - now);
    return {
      h: Math.floor(diff / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {[['h', 'HRS'], ['m', 'MIN'], ['s', 'SEC']].map(([key, label], i) => (
        <React.Fragment key={key}>
          {i > 0 && <span style={{ color: '#ef4444', fontWeight: '700', fontSize: '1.25rem', lineHeight: 1 }}>:</span>}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px', padding: '6px 10px', minWidth: '52px',
              fontFamily: 'Outfit, monospace', fontSize: '1.5rem', fontWeight: '800',
              color: '#f87171', lineHeight: 1,
            }}>
              {pad(time[key])}
            </div>
            <div style={{ fontSize: '9px', color: '#64748b', marginTop: '3px', letterSpacing: '0.1em' }}>{label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

// ─── Section Header ─────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title, subtitle, link, linkText = 'View All' }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
        {icon && <span style={{ color: '#1e90ff', fontSize: '1.25rem' }}>{icon}</span>}
        <h2 style={{
          fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.375rem, 3vw, 1.875rem)',
          fontWeight: '800', margin: 0, color: '#f1f5f9',
          background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          {title}
        </h2>
      </div>
      {subtitle && <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem' }}>{subtitle}</p>}
    </div>
    {link && (
      <Link
        to={link}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          textDecoration: 'none', color: '#1e90ff', fontWeight: '600',
          fontSize: '0.875rem', transition: 'all 0.2s', flexShrink: 0,
          padding: '6px 14px', borderRadius: '20px',
          border: '1px solid rgba(30,144,255,0.25)',
          background: 'rgba(30,144,255,0.08)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,144,255,0.15)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(30,144,255,0.2)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(30,144,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        {linkText} <FiArrowRight size={14} />
      </Link>
    )}
  </div>
);

// ─── Hero Section ────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      title: 'The Future of Smart Shopping',
      subtitle: 'Discover 50,000+ premium products with AI-powered recommendations, lightning-fast delivery, and unbeatable deals.',
      cta: 'Shop Now',
      ctaLink: '/products',
      tag: '🚀 New Arrivals Just Dropped',
      accent: '#1e90ff',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
      badge: 'Up to 70% Off',
    },
    {
      title: 'Premium Electronics at Your Fingertips',
      subtitle: 'From the latest smartphones to cutting-edge laptops — shop top brands with zero compromise on quality.',
      cta: 'Explore Electronics',
      ctaLink: '/products?category=Electronics',
      tag: '⚡ Flash Sale Live Now',
      accent: '#00b4ff',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=800',
      badge: 'Best Deals',
    },
    {
      title: 'Fashion That Speaks Your Language',
      subtitle: 'Curated collections from the world\'s top fashion brands. Style meets technology.',
      cta: 'Shop Fashion',
      ctaLink: '/products?category=Fashion',
      tag: '👗 New Season Collection',
      accent: '#a855f7',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
      badge: '40% Off',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide(prev => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];

  return (
    <section style={{ position: 'relative', minHeight: '600px', overflow: 'hidden' }}>
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg, rgba(6,13,24,0.97) 0%, rgba(6,13,24,0.92) 40%, rgba(6,13,24,0.6) 70%, rgba(6,13,24,0.3) 100%)',
      }} />

      {/* Animated grid lines */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(30,144,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(30,144,255,0.8) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '80px 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', minHeight: '600px' }}>
        {/* Left Content */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tag */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: `rgba(30,144,255,0.12)`, border: `1px solid rgba(30,144,255,0.3)`,
                borderRadius: '20px', padding: '6px 14px', marginBottom: '1.5rem',
                fontSize: '0.8125rem', fontWeight: '600', color: '#60a5fa',
              }}>
                {slide.tag}
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '900', lineHeight: 1.1,
                color: 'white', margin: '0 0 1.25rem 0',
              }}>
                {slide.title.split(' ').slice(0, -2).join(' ')}{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #1e90ff 0%, #00b4ff 50%, #00d4ff 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {slide.title.split(' ').slice(-2).join(' ')}
                </span>
              </h1>

              {/* Subtitle */}
              <p style={{ color: '#94a3b8', fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)', lineHeight: 1.7, margin: '0 0 2.5rem 0', maxWidth: '500px' }}>
                {slide.subtitle}
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Link to={slide.ctaLink} style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: 'linear-gradient(135deg, #1e90ff 0%, #1565c0 100%)',
                      color: 'white', border: 'none', borderRadius: '12px',
                      padding: '0.875rem 2rem', fontSize: '1rem', fontWeight: '700',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                      boxShadow: '0 8px 25px rgba(30,144,255,0.4)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {slide.cta} <FiArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link to="/about" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'transparent', color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px',
                    padding: '0.875rem 1.75rem', fontSize: '0.9375rem', fontWeight: '600',
                    cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                  }}
                    onMouseEnter={e => { e.target.style.color = '#e2e8f0'; e.target.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                    onMouseLeave={e => { e.target.style.color = '#94a3b8'; e.target.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  >
                    Learn More
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem' }}>
                {[{ num: '50K+', label: 'Products' }, { num: '2M+', label: 'Happy Customers' }, { num: '4.9★', label: 'App Rating' }].map(stat => (
                  <div key={stat.label}>
                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: '#1e90ff', lineHeight: 1 }}>{stat.num}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right — Floating Product Card */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'rgba(13,27,53,0.8)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(30,144,255,0.2)', borderRadius: '20px',
              padding: '1.5rem', maxWidth: '320px', width: '100%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(30,144,255,0.1)',
            }}
          >
            <div style={{ position: 'relative', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
              <img src={slides[activeSlide].image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', top: '10px', left: '10px',
                background: 'rgba(239,68,68,0.9)', color: 'white',
                padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700',
              }}>
                {slide.badge}
              </div>
            </div>
            <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '4px' }}>Featured Deal</div>
            <div style={{ color: '#e2e8f0', fontWeight: '700', marginBottom: '8px', fontSize: '1rem' }}>
              {featuredProducts[activeSlide % featuredProducts.length]?.name?.slice(0, 35) || 'Premium Product'}...
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#1e90ff', fontWeight: '800', fontSize: '1.25rem' }}>
                  {formatPrice(featuredProducts[activeSlide % featuredProducts.length]?.sellingPrice || 24990)}
                </span>
                <span style={{ color: '#ef4444', fontSize: '0.75rem', marginLeft: '6px', fontWeight: '600' }}>
                  -{featuredProducts[activeSlide % featuredProducts.length]?.discount || 29}% off
                </span>
              </div>
              <Link to="/products" style={{ background: 'linear-gradient(135deg, #1e90ff, #00b4ff)', color: 'white', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: '600' }}>
                Buy Now
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            style={{
              width: i === activeSlide ? '28px' : '8px', height: '8px',
              borderRadius: '4px', border: 'none', cursor: 'pointer',
              background: i === activeSlide ? '#1e90ff' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>

      {/* Prev/Next */}
      {[
        { dir: -1, icon: <FiChevronLeft size={20} />, style: { left: '1.5rem' } },
        { dir: 1, icon: <FiChevronRight size={20} />, style: { right: '1.5rem' } },
      ].map(({ dir, icon, style }) => (
        <button
          key={dir}
          onClick={() => setActiveSlide(prev => (prev + dir + slides.length) % slides.length)}
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'rgba(30,144,255,0.1)', border: '1px solid rgba(30,144,255,0.25)',
            color: '#1e90ff', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', transition: 'all 0.2s', ...style,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,144,255,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(30,144,255,0.1)'; }}
        >
          {icon}
        </button>
      ))}
    </section>
  );
};

// ─── Categories Section ───────────────────────────────────────────────────────
const CategoriesSection = () => (
  <section style={{ padding: '5rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
    <SectionHeader icon="🗂️" title="Shop by Category" subtitle="Explore our curated collection of categories" link="/products" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
      {mockCategories.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <Link to={`/products?category=${cat.name}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
              background: 'linear-gradient(145deg, #0d1b35 0%, #0a1628 100%)',
              border: '1px solid rgba(30,144,255,0.1)', borderRadius: '16px',
              padding: '1.25rem 1rem', textAlign: 'center', cursor: 'pointer',
              transition: 'all 0.3s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(30,144,255,0.35)';
                e.currentTarget.style.boxShadow = `0 8px 25px rgba(0,0,0,0.3), 0 0 15px rgba(30,144,255,0.1)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(30,144,255,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: `${cat.color}18`, border: `1.5px solid ${cat.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.75rem', margin: '0 auto 0.75rem',
              }}>
                {cat.icon}
              </div>
              <h3 style={{ color: '#e2e8f0', fontSize: '0.8125rem', fontWeight: '600', margin: '0 0 4px 0' }}>{cat.name}</h3>
              <p style={{ color: '#475569', fontSize: '0.7rem', margin: 0 }}>{cat.count.toLocaleString()}+ items</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── Featured Products ───────────────────────────────────────────────────────
const FeaturedSection = ({ loading }) => (
  <section style={{ padding: '0 1.5rem 5rem', maxWidth: '1400px', margin: '0 auto' }}>
    <SectionHeader icon={<FiStar />} title="Featured Products" subtitle="Hand-picked premium products just for you" link="/products" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
      {loading
        ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        : featuredProducts.slice(0, 8).map(p => <ProductCard key={p.id} product={p} />)
      }
    </div>
  </section>
);

// ─── Flash Sale ──────────────────────────────────────────────────────────────
const FlashSaleSection = () => (
  <section style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1b35 50%, #112040 100%)', padding: '4rem 1.5rem', borderTop: '1px solid rgba(239,68,68,0.2)', borderBottom: '1px solid rgba(239,68,68,0.2)' }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.75rem' }}>⚡</span>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: '900', margin: 0, color: '#f87171' }}>Flash Sale</h2>
          </div>
          <span style={{ color: '#64748b', fontSize: '0.875rem' }}>Ends in:</span>
          <CountdownTimer endTime={FLASH_SALE_END} />
        </div>
        <Link to="/products?sale=flash" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#f87171', fontWeight: '600', fontSize: '0.875rem', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)' }}>
          View All <FiArrowRight size={14} />
        </Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
        {flashSaleProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  </section>
);

// ─── Trending Section ────────────────────────────────────────────────────────
const TrendingSection = () => (
  <section style={{ padding: '5rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
    <SectionHeader icon={<FiTrendingUp />} title="Trending Now" subtitle="What everyone's shopping right now" link="/products?trending=true" />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
      {trendingProducts.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  </section>
);

// ─── New Arrivals ────────────────────────────────────────────────────────────
const NewArrivalsSection = () => (
  <section style={{ background: 'linear-gradient(180deg, #060d18 0%, #0a1628 100%)', padding: '5rem 1.5rem', borderTop: '1px solid rgba(30,144,255,0.08)' }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <SectionHeader icon={<HiSparkles />} title="New Arrivals" subtitle="Fresh drops straight to your screen" link="/products?new=true" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
        {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  </section>
);

// ─── Promo Banner ────────────────────────────────────────────────────────────
const PromoBanner = () => (
  <section style={{ padding: '3rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem',
    }}>
      {[
        { icon: '🚀', title: 'Free Express Delivery', sub: 'On orders above ₹999', bg: 'rgba(30,144,255,0.08)', border: 'rgba(30,144,255,0.2)' },
        { icon: '🔒', title: '100% Secure Payments', sub: 'Multiple payment options', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
        { icon: '🔄', title: 'Easy Returns', sub: '30-day hassle-free returns', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
        { icon: '🎧', title: '24/7 Customer Support', sub: 'Always here for you', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.2)' },
      ].map(item => (
        <motion.div
          key={item.title}
          whileHover={{ scale: 1.02 }}
          style={{
            background: item.bg, border: `1px solid ${item.border}`,
            borderRadius: '16px', padding: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}
        >
          <span style={{ fontSize: '2rem' }}>{item.icon}</span>
          <div>
            <h4 style={{ color: '#e2e8f0', fontWeight: '700', margin: '0 0 4px 0', fontSize: '0.9375rem' }}>{item.title}</h4>
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.8125rem' }}>{item.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── Reviews Section ─────────────────────────────────────────────────────────
const ReviewsSection = () => {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveReview(prev => (prev + 1) % mockReviews.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ padding: '5rem 1.5rem', background: 'linear-gradient(135deg, #0a1628 0%, #0d1b35 100%)', borderTop: '1px solid rgba(30,144,255,0.08)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <SectionHeader icon={<FiStar />} title="What Our Customers Say" subtitle="Real reviews from verified buyers" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {mockReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'linear-gradient(145deg, #0d1b35 0%, #0a1628 100%)',
                border: '1px solid rgba(30,144,255,0.12)', borderRadius: '20px',
                padding: '1.75rem', position: 'relative',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <FiStar key={j} size={14} style={{ fill: j < review.rating ? '#fbbf24' : 'none', color: j < review.rating ? '#fbbf24' : '#374151' }} />
                ))}
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9375rem', lineHeight: 1.7, margin: '0 0 1.25rem 0', fontStyle: 'italic' }}>
                "{review.comment}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(30,144,255,0.08)', paddingTop: '1rem' }}>
                <img src={review.avatar} alt={review.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(30,144,255,0.3)' }} />
                <div>
                  <p style={{ color: '#e2e8f0', fontWeight: '700', margin: 0, fontSize: '0.875rem' }}>{review.name}</p>
                  <p style={{ color: '#64748b', margin: 0, fontSize: '0.75rem' }}>{review.location} · {review.date}</p>
                </div>
                {review.verified && (
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', color: '#34d399', fontSize: '0.7rem', fontWeight: '600' }}>
                    <span>✓</span> Verified
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Newsletter Section ──────────────────────────────────────────────────────
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section style={{ padding: '5rem 1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(30,144,255,0.08) 0%, rgba(0,180,255,0.05) 100%)',
        border: '1px solid rgba(30,144,255,0.2)', borderRadius: '28px',
        padding: 'clamp(2.5rem, 5vw, 4rem)', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(30,144,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📬</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '800', color: '#f1f5f9', margin: '0 0 0.75rem 0' }}>
            Stay in the Loop
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', margin: '0 0 2.5rem 0', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            Subscribe for exclusive deals, new arrivals, and insider tips on smart shopping.
          </p>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ color: '#34d399', fontWeight: '700', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                ✓ Thank you for subscribing! Get ready for exclusive deals.
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.75rem', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                  <FiMail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    style={{
                      width: '100%', background: 'rgba(6,13,24,0.8)',
                      border: '1.5px solid rgba(30,144,255,0.25)', borderRadius: '12px',
                      color: '#e2e8f0', padding: '0.875rem 1rem 0.875rem 2.75rem',
                      fontSize: '0.9375rem', outline: 'none', fontFamily: 'Inter, sans-serif',
                    }}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #1e90ff, #1565c0)',
                    color: 'white', border: 'none', borderRadius: '12px',
                    padding: '0.875rem 1.75rem', fontWeight: '700', fontSize: '0.9375rem',
                    cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 4px 20px rgba(30,144,255,0.4)',
                  }}
                >
                  Subscribe
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// ─── Main HomePage ────────────────────────────────────────────────────────────
const HomePage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => { setTimeout(() => setLoading(false), 800); }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <HeroSection />
      <PromoBanner />
      <CategoriesSection />
      <FeaturedSection loading={loading} />
      <FlashSaleSection />
      <TrendingSection />
      <NewArrivalsSection />
      <ReviewsSection />
      <NewsletterSection />
    </motion.div>
  );
};

export default HomePage;
