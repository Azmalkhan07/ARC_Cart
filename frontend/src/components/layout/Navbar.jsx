import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiHeart, FiBell, FiUser, FiMenu, FiX, FiSun, FiMoon, FiChevronDown, FiLogOut, FiPackage, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = [
  { label: 'Shop', to: '/products' },
  { label: 'Electronics', to: '/products?category=Electronics' },
  { label: 'Fashion', to: '/products?category=Fashion' },
  { label: 'Gaming', to: '/products?category=Gaming' },
];

const Navbar = () => {
  const { isAuthenticated, userFullName, userEmail, userAvatar, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    navigate('/');
  };

  const initials = userFullName?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(6,13,24,0.95)'
            : 'rgba(6,13,24,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled
            ? '1px solid rgba(30,144,255,0.2)'
            : '1px solid rgba(30,144,255,0.08)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', height: '68px' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #1e90ff 0%, #00b4ff 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', boxShadow: '0 0 20px rgba(30,144,255,0.4)',
              }}>
                🛒
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '1.25rem', lineHeight: 1, background: 'linear-gradient(135deg, #1e90ff, #00b4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ARC CART</div>
                <div style={{ fontSize: '8px', color: '#64748b', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1 }}>Smart Shopping</div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', gap: '0.25rem', flex: '0 0 auto' }} className="hidden md:flex">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  textDecoration: 'none',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: location.pathname === link.to ? '#1e90ff' : '#94a3b8',
                  background: location.pathname === link.to ? 'rgba(30,144,255,0.1)' : 'transparent',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '480px', position: 'relative' }}>
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
              <FiSearch size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products, brands..."
                style={{
                  width: '100%', background: 'rgba(10,22,40,0.8)',
                  border: '1.5px solid rgba(30,144,255,0.2)', borderRadius: '12px',
                  color: '#e2e8f0', padding: '0.5rem 1rem 0.5rem 2.75rem',
                  fontSize: '0.875rem', outline: 'none', transition: 'all 0.3s',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
            </form>
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#94a3b8', transition: 'all 0.2s',
              }}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.button>

            {/* Wishlist */}
            <Link to="/wishlist" style={{ textDecoration: 'none' }}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#94a3b8', transition: 'all 0.2s',
                  position: 'relative',
                }}
                title="Wishlist"
              >
                <FiHeart size={16} />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: 'absolute', top: '-5px', right: '-5px',
                      background: '#ef4444', color: 'white', fontSize: '10px',
                      width: '18px', height: '18px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: '700', lineHeight: 1,
                    }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Cart */}
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#94a3b8', transition: 'all 0.2s',
                  position: 'relative',
                }}
                title="Cart"
              >
                <FiShoppingCart size={16} />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{
                        position: 'absolute', top: '-5px', right: '-5px',
                        background: 'linear-gradient(135deg, #1e90ff, #00b4ff)',
                        color: 'white', fontSize: '10px',
                        width: '18px', height: '18px', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: '700',
                      }}
                    >
                      {cartCount > 99 ? '99+' : cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            {/* Auth */}
            {isAuthenticated ? (
              <div ref={profileRef} style={{ position: 'relative' }}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setProfileOpen(prev => !prev)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(30,144,255,0.1)', border: '1px solid rgba(30,144,255,0.25)',
                    borderRadius: '10px', padding: '4px 10px 4px 4px', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '8px',
                    background: 'linear-gradient(135deg, #1e90ff, #00b4ff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: '700', color: 'white', flexShrink: 0,
                  }}>
                    {userAvatar ? <img src={userAvatar} alt="" style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} /> : initials}
                  </div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: '600', color: '#e2e8f0', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{userFullName}</span>
                  <FiChevronDown size={12} style={{ color: '#64748b', transition: 'transform 0.2s', transform: profileOpen ? 'rotate(180deg)' : 'none' }} />
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                        background: 'rgba(6,13,24,0.98)', backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(30,144,255,0.2)', borderRadius: '16px',
                        minWidth: '220px', padding: '0.5rem', zIndex: 1001,
                        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* User info */}
                      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(30,144,255,0.1)', marginBottom: '0.5rem' }}>
                        <p style={{ color: '#e2e8f0', fontWeight: '600', fontSize: '0.9rem', margin: 0 }}>{userFullName}</p>
                        <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '2px 0 0 0' }}>{userEmail}</p>
                      </div>
                      {[
                        { icon: <FiUser size={14} />, label: 'My Profile', to: '/profile' },
                        { icon: <FiPackage size={14} />, label: 'My Orders', to: '/orders' },
                        { icon: <FiHeart size={14} />, label: 'Wishlist', to: '/wishlist' },
                        { icon: <FiSettings size={14} />, label: 'Settings', to: '/settings' },
                      ].map(item => (
                        <Link
                          key={item.to}
                          to={item.to}
                          onClick={() => setProfileOpen(false)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '0.625rem 1rem', borderRadius: '10px',
                            textDecoration: 'none', color: '#94a3b8',
                            fontSize: '0.875rem', transition: 'all 0.15s',
                          }}
                        >
                          <span style={{ color: '#1e90ff' }}>{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                      <div style={{ borderTop: '1px solid rgba(30,144,255,0.1)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                        <button
                          onClick={handleLogout}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '0.625rem 1rem', borderRadius: '10px', width: '100%',
                            background: 'transparent', border: 'none', color: '#f87171',
                            fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.15s',
                          }}
                        >
                          <FiLogOut size={14} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to="/login" style={{
                  textDecoration: 'none', padding: '0.5rem 1rem',
                  borderRadius: '10px', fontSize: '0.875rem', fontWeight: '600',
                  color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s',
                }}
                >
                  Login
                </Link>
                <Link to="/register" style={{
                  textDecoration: 'none', padding: '0.5rem 1.25rem',
                  borderRadius: '10px', fontSize: '0.875rem', fontWeight: '600',
                  background: 'linear-gradient(135deg, #1e90ff, #1565c0)', color: 'white',
                  transition: 'all 0.2s',
                }}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(prev => !prev)}
              style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#94a3b8',
              }}
              className="flex md:hidden"
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              position: 'fixed', top: '68px', left: 0, right: 0,
              background: 'rgba(6,13,24,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(30,144,255,0.15)',
              zIndex: 999, overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {/* Mobile search */}
              <form onSubmit={handleSearch} style={{ marginBottom: '0.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <FiSearch size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                  <input
                    type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    style={{ width: '100%', background: 'rgba(10,22,40,0.8)', border: '1.5px solid rgba(30,144,255,0.2)', borderRadius: '10px', color: '#e2e8f0', padding: '0.6rem 1rem 0.6rem 2.75rem', fontSize: '0.875rem', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                  />
                </div>
              </form>
              {NAV_LINKS.map(link => (
                <Link key={link.to} to={link.to} style={{ textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '10px', color: '#94a3b8', fontSize: '0.9375rem', fontWeight: '500', display: 'block', transition: 'all 0.2s' }}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ borderTop: '1px solid rgba(30,144,255,0.1)', paddingTop: '0.75rem', marginTop: '0.25rem', display: 'flex', gap: '0.5rem' }}>
                {!isAuthenticated && (
                  <>
                    <Link to="/login" style={{ flex: 1, textDecoration: 'none', textAlign: 'center', padding: '0.75rem', borderRadius: '10px', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)', fontWeight: '600', fontSize: '0.875rem' }}>Login</Link>
                    <Link to="/register" style={{ flex: 1, textDecoration: 'none', textAlign: 'center', padding: '0.75rem', borderRadius: '10px', color: 'white', background: 'linear-gradient(135deg, #1e90ff, #1565c0)', fontWeight: '600', fontSize: '0.875rem' }}>Register</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
