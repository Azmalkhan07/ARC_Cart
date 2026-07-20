import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTwitter, FiInstagram, FiYoutube, FiLinkedin, FiFacebook, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import Navbar from './Navbar';

const Footer = () => (
  <footer style={{ background: 'linear-gradient(180deg, #060d18 0%, #020b18 100%)', borderTop: '1px solid rgba(30,144,255,0.1)', paddingTop: '4rem' }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
      {/* Main Footer Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(30,144,255,0.08)' }}>
        {/* Brand Column */}
        <div style={{ gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #1e90ff 0%, #00b4ff 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px', boxShadow: '0 0 20px rgba(30,144,255,0.3)',
            }}>🛒</div>
            <div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '1.25rem', background: 'linear-gradient(135deg, #1e90ff, #00b4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>ARC CART</div>
              <div style={{ fontSize: '9px', color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase' }}>The Future of Smart Shopping</div>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '240px' }}>
            India's most premium e-commerce platform. Discover, shop, and enjoy with AI-powered smart shopping.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {[
              { icon: <FiMapPin size={13} />, text: 'Bangalore, Karnataka, India' },
              { icon: <FiMail size={13} />, text: 'support@arccart.in' },
              { icon: <FiPhone size={13} />, text: '+91 80 4567 8900' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.8125rem' }}>
                <span style={{ color: '#1e90ff' }}>{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[
              { icon: <FiTwitter size={15} />, href: '#' },
              { icon: <FiInstagram size={15} />, href: '#' },
              { icon: <FiFacebook size={15} />, href: '#' },
              { icon: <FiYoutube size={15} />, href: '#' },
              { icon: <FiLinkedin size={15} />, href: '#' },
            ].map((social, i) => (
              <a key={i} href={social.href} style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(30,144,255,0.08)', border: '1px solid rgba(30,144,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#64748b', textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,144,255,0.15)'; e.currentTarget.style.color = '#1e90ff'; e.currentTarget.style.borderColor = 'rgba(30,144,255,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(30,144,255,0.08)'; e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = 'rgba(30,144,255,0.15)'; }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        {[
          {
            title: 'Shop',
            links: [
              { label: 'All Products', to: '/products' },
              { label: 'Electronics', to: '/products?category=Electronics' },
              { label: 'Fashion', to: '/products?category=Fashion' },
              { label: 'Home & Kitchen', to: '/products?category=Home & Kitchen' },
              { label: 'Sports', to: '/products?category=Sports' },
              { label: 'Flash Sale', to: '/products?sale=flash' },
            ],
          },
          {
            title: 'Account',
            links: [
              { label: 'My Profile', to: '/profile' },
              { label: 'My Orders', to: '/orders' },
              { label: 'Wishlist', to: '/wishlist' },
              { label: 'Cart', to: '/cart' },
              { label: 'Notifications', to: '/notifications' },
              { label: 'Settings', to: '/settings' },
            ],
          },
          {
            title: 'Company',
            links: [
              { label: 'About Us', to: '/about' },
              { label: 'Contact Us', to: '/contact' },
              { label: 'Careers', to: '/about' },
              { label: 'Blog', to: '/about' },
              { label: 'Press', to: '/about' },
            ],
          },
          {
            title: 'Support',
            links: [
              { label: 'Help Center', to: '/contact' },
              { label: 'Return Policy', to: '/contact' },
              { label: 'Shipping Info', to: '/contact' },
              { label: 'Track Order', to: '/orders' },
              { label: 'Privacy Policy', to: '/contact' },
              { label: 'Terms of Service', to: '/contact' },
            ],
          },
        ].map(col => (
          <div key={col.title}>
            <h4 style={{ color: '#e2e8f0', fontWeight: '700', marginBottom: '1.25rem', fontSize: '0.9375rem', letterSpacing: '0.02em' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {col.links.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    style={{ color: '#475569', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => { e.target.style.color = '#1e90ff'; }}
                    onMouseLeave={e => { e.target.style.color = '#475569'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.5rem 0' }}>
        <p style={{ color: '#334155', fontSize: '0.8125rem', margin: 0 }}>
          © {new Date().getFullYear()} ARC CART Technologies Pvt. Ltd. All rights reserved.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#334155', fontSize: '0.8125rem' }}>Made with</span>
          <span style={{ color: '#ef4444' }}>❤️</span>
          <span style={{ color: '#334155', fontSize: '0.8125rem' }}>in India</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {['Privacy', 'Terms', 'Cookies'].map(item => (
            <Link key={item} to="/contact" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.8125rem', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.target.style.color = '#1e90ff'; }}
              onMouseLeave={e => { e.target.style.color = '#334155'; }}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

const PublicLayout = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#060d18' }}>
    <Navbar />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
