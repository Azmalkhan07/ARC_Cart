import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { userFullName, userEmail, userRole, logout } = useAuth();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem', background: '#060d18', color: '#e2e8f0', minHeight: '80vh' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2rem', fontWeight: '800', color: 'white', margin: 0 }}>
          My Profile
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
          Manage your personal details and account settings.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }} className="md:grid-cols-[280px_1fr]">
        {/* Navigation Sidebar */}
        <aside style={{
          background: 'rgba(13,27,53,0.7)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(30,144,255,0.15)', borderRadius: '20px',
          padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
          {[
            { label: 'Profile Information', icon: <FiUser />, active: true, to: '/profile' },
            { label: 'My Orders', icon: <FiPackage />, to: '/orders' },
            { label: 'Wishlist', icon: <FiHeart />, to: '/wishlist' },
            { label: 'Settings', icon: <FiSettings />, to: '/settings' },
          ].map(item => (
            <Link
              key={item.label}
              to={item.to}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 16px', borderRadius: '10px', textDecoration: 'none',
                color: item.active ? '#1e90ff' : '#94a3b8',
                background: item.active ? 'rgba(30,144,255,0.12)' : 'transparent',
                fontWeight: '600', fontSize: '0.875rem', transition: 'all 0.2s'
              }}
            >
              {item.icon} {item.label}
            </Link>
          ))}
          <button
            onClick={logout}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px', borderRadius: '10px', border: 'none',
              background: 'transparent', color: '#f87171',
              fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer',
              textAlign: 'left', marginTop: '1.5rem', width: '100%'
            }}
          >
            <FiLogOut /> Logout Account
          </button>
        </aside>

        {/* Content Area */}
        <main style={{
          background: 'rgba(13,27,53,0.5)', border: '1px solid rgba(30,144,255,0.1)',
          borderRadius: '20px', padding: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '24px',
              background: 'linear-gradient(135deg, #1e90ff, #00b4ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: '800', color: 'white',
              boxShadow: '0 0 20px rgba(30,144,255,0.3)'
            }}>
              {userFullName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: '800', color: 'white', margin: 0 }}>
                {userFullName}
              </h2>
              <span className="badge-arc badge-arc-blue" style={{ marginTop: '6px', display: 'inline-block' }}>
                {userRole || 'Customer'} Member
              </span>
            </div>
          </div>

          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.125rem', fontWeight: '700', color: 'white', marginBottom: '1.25rem' }}>
            Personal Details
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { label: 'Full Name', value: userFullName, icon: <FiUser /> },
              { label: 'Email Address', value: userEmail, icon: <FiMail /> },
              { label: 'Phone Number', value: '+91 98765 43210', icon: <FiPhone /> },
              { label: 'Primary Location', value: 'Bangalore, India', icon: <FiMapPin /> },
            ].map(detail => (
              <div key={detail.label} style={{ background: 'rgba(6,13,24,0.5)', border: '1px solid rgba(30,144,255,0.08)', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '12px' }}>
                <span style={{ color: '#1e90ff', marginTop: '3px' }}>{detail.icon}</span>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{detail.label}</span>
                  <p style={{ color: '#e2e8f0', fontWeight: '600', margin: '4px 0 0 0', fontSize: '0.9375rem' }}>{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
